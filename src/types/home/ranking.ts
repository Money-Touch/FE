export type RankChangeStatus = 'UP' | 'DOWN' | 'KEEP';

export type TopUser = {
  nickname: string;
  profileImgUrl: string | null;
  wiseCount: number;
  rankChangeStatus: RankChangeStatus;
};

export type MyRank = {
  nickname: string;
  profileImgUrl: string | null;
  ranking: number;
  totalWiseCount: number;
};

export type RankingResponse = {
  top10Users: TopUser[];
  myRank: MyRank;
};
