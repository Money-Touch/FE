export interface UserRoutine {
  id: number;
  title: string;
  icon: string;
  startDate: string;
  views: number;
}

export interface UserRoutineDetail extends UserRoutine {
  hashtags: string[];
  thumbnail: string;
  author: string;
  authorProfileImg: string;
}

export type RoutineBudget = {
  label: string;
  amount: number;
};

export interface FullRoutineDetail extends UserRoutineDetail {
  totalBudget: number;
  budgetList: RoutineBudget[];
  isReflected: boolean;
}
