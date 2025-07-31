export interface UserRoutine {
  id: number;
  title: string;
  icon: string;
  startDate: string;
  views: number;
}

export interface UserRoutineDetail {
  routineId: number;
  createDate: string;
  routineName: string;
  nickname: string;
  routineImgUrl: string;
  profileImgUrl: string;
  hashtags: string[];
  new: boolean;
}

export interface RoutineResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    routineList: UserRoutineDetail[];
    routineListSize: number;
    isFirst: boolean;
    isLast: boolean;
    hasNext: boolean;
    nextCursorId: number | null;
  };
}

export interface RoutineSearchResult {
  routineList: UserRoutineDetail[];
  routineListSize: number;
  isFirst: boolean;
  isLast: boolean;
  hasNext: boolean;
  nextCursorId: number | null;
}

export interface RoutineSearchResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: RoutineSearchResult;
}

export interface RoutineDetail extends UserRoutine {
  thumbnail: string;
  author: string;
  authorProfileImg: string;
}

export type RoutineBudget = {
  label: string;
  amount: number;
};

export interface FullRoutineDetail extends RoutineDetail {
  totalBudget: number;
  budgetList: RoutineBudget[];
  isReflected: boolean;
  hashtags: string[];
}
