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