export interface Author {
  name: string;
  profileImage?: string;
}

export interface Post {
  id: number;
  author: Author;
  image?: string;
  likes: number;
  dislikes: number;
  timestamp: Date;

  category?: string;

  companyName?: string;
  price?: number;
  content?: string;

  comments?: Comment[];
}

export type ReactionType = 'WISE' | 'WASTE' | null;

export type SortType = 'RECENT' | 'POPULAR';

export interface User {
  userId: number;
  nickname: string;
  profileImgUrl: string;
}

export interface FeedPost {
  consumptionRecordId: number;
  user: {
    userId: number;
    nickname: string;
    profileImgUrl: string;
  };
  imageUrls: string[];
  createdAt: string;
  wiseCount: number;
  wasteCount: number;
  viewCount: number;
  myReaction: 'WISE' | 'WASTE' | null;
}

export interface FeedListResultDTO {
  feedList: FeedPost[];
  isFirst: boolean;
  hasNext: boolean;
  nextCursorId: number;
  nextCursorViewCount: number;
  feedListSize: number;
}

export interface FeedRequestParams {
  sortType: 'RECENT' | 'POPULAR';
  cursorId?: number | null;
  cursorViewCount?: number | null;
}

export interface ApiResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
}

export interface Comment {
  id: number;
  author: Author;
  content: string;
  timestamp: Date;
  replies?: Comment[];
}

export type SortBy = 'popular' | 'latest';

export interface PostStates {
  [key: number]: {
    liked: boolean;
    disliked: boolean;
  };
}
