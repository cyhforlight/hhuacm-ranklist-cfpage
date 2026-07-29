import type { CodeforcesStats, RankUser } from '../types';

const EMPTY_MARK = '—';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function toOptionalString(value: unknown): string | null {
  if (typeof value !== 'string') return null;

  const trimmed = value.trim();
  if (!trimmed || trimmed === EMPTY_MARK) return null;

  return trimmed;
}

function toOptionalNumber(value: unknown): number | null {
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : null;
  }

  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (!trimmed || trimmed === EMPTY_MARK) return null;

    const parsed = Number(trimmed);
    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
}

function normalizeCodeforcesStats(value: unknown): CodeforcesStats | null {
  if (!isRecord(value)) return null;

  const rating = toOptionalNumber(value.rating);
  const maxRating = toOptionalNumber(value.maxrating);
  const acceptedProblemCount = toOptionalNumber(value.acceptedProblemCount);
  const acceptedProblemCountInMonth = toOptionalNumber(value.acceptedProblemCountinMonth);
  const lastOnlineTimeSeconds = toOptionalNumber(value.lastOnlineTimeSeconds);

  if (
    rating === null &&
    maxRating === null &&
    acceptedProblemCount === null &&
    acceptedProblemCountInMonth === null &&
    lastOnlineTimeSeconds === null
  ) {
    return null;
  }

  return {
    rating,
    maxRating,
    acceptedProblemCount,
    acceptedProblemCountInMonth,
    lastOnlineTimeSeconds,
  };
}

function normalizeRankUser(value: unknown): RankUser | null {
  if (!isRecord(value)) return null;

  const cfHandle = toOptionalString(value.CFHandle);
  const name = toOptionalString(value.name) ?? cfHandle;

  if (!name) return null;

  return {
    name,
    grade: toOptionalString(value.grade),
    major: toOptionalString(value.major),
    cfHandle,
    codeforces: normalizeCodeforcesStats(value.CFinfo),
  };
}

export function normalizeRankUsers(value: unknown): RankUser[] {
  if (!Array.isArray(value)) return [];

  return value.map(normalizeRankUser).filter((user): user is RankUser => user !== null);
}
