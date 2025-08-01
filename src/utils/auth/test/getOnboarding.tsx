import type { OnboardingItem } from '../../../types/auth/test/onboarding';

export const getOnboarding = (
  list: OnboardingItem[],
): Record<string, string> => {
  const result: Record<string, string> = {};

  list.forEach((item) => {
    if (item.selected && item.label) {
      if (item.label === 'gender') {
        result[item.label] = item.selected === '남성' ? 'MALE' : 'FEMALE';
      } else {
        result[item.label] = item.selected;
      }
    }
  });

  return result;
};
