export interface UserRanking {
  id: number;
  name: string;
  wiseCount: number;
  previousRank: number;
  currentRank: number;
  profileImage?: string;
}
