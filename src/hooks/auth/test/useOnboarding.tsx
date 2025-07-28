import type { OnboardingItem } from '../../../types/auth/test/onboarding';

export const useOnboarding = (
  onboardingList: OnboardingItem[],
  setOnboardingList: React.Dispatch<React.SetStateAction<OnboardingItem[]>>,
) => {
  const handleSelect = (id: number, value: string) => {
    setOnboardingList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, selected: value } : item,
      ),
    );
  };

  const isComplete = onboardingList.every(
    (item) => item.selected !== undefined,
  );

  return {
    handleSelect,
    isComplete,
  };
};
