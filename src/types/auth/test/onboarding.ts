export interface OnboardingItem {
  id: number;
  title: string;
  label: string;
  list: string[];
  selected?: string;
}

export interface SubmitPayload {
  age: string;
  gender: string;
  job: string;
  isIncome: string;
}
