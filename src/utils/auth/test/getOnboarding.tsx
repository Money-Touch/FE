import type { OnboardingItem } from '../../../types/auth/test/onboarding';

export const getOnboarding = (list: OnboardingItem[]) => {
  return {
    answers: list
      .filter((item) => item.checked !== null)
      .map((item) => ({
        id: item.id,
        answer: item.checked as string,
      })),
  };
};
