// Codeforces user information type
export interface CFInfo {
  handle: string;
  rating: number | null;
  maxrating: number | null;
  lastOnlineTimeSeconds: number;
  acceptedProblemCount: number;
  acceptedProblemCountinMonth: number;
}

// User type
export interface User {
  name: string;
  grade: string | null;
  major: string | null;
  CFHandle: string | null;
  CFinfo: CFInfo | null;
} 