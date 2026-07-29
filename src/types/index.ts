export type SortOrder = 'asc' | 'desc';

export type SortableCodeforcesField =
  | 'rating'
  | 'maxRating'
  | 'acceptedProblemCount'
  | 'acceptedProblemCountInMonth'
  | 'lastOnlineTimeSeconds';

export interface CodeforcesStats {
  rating: number | null;
  maxRating: number | null;
  acceptedProblemCount: number | null;
  acceptedProblemCountInMonth: number | null;
  lastOnlineTimeSeconds: number | null;
}

export interface RankUser {
  name: string;
  grade: string | null;
  major: string | null;
  cfHandle: string | null;
  codeforces: CodeforcesStats | null;
}
