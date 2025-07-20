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
  content?: string;
  category?: string;
  comments?: number;
}

export type SortBy = 'popular' | 'latest';

export interface PostStates {
  [key: number]: {
    liked: boolean;
    disliked: boolean;
  };
}