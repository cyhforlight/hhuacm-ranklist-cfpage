export type SortOrder = 'asc' | 'desc';

export type SortableCodeforcesField =
  | 'rating'
  | 'maxrating'
  | 'acceptedProblemCount'
  | 'acceptedProblemCountinMonth'
  | 'lastOnlineTimeSeconds';

export interface CodeforcesInfo {
  handle: string;
  rating: number | null;
  maxrating: number | null;
  acceptedProblemCount: number | null;
  acceptedProblemCountinMonth: number | null;
  lastOnlineTimeSeconds: number | null;
}

export interface RankUser {
  name: string;
  grade: string | null;
  major: string | null;
  CFHandle: string | null;
  CFinfo: CodeforcesInfo | null;
}
