import type { OnboardingItem } from '../../../types/auth/test/onboarding';

export const useOnboarding = (
  onboardingList: OnboardingItem[],
  setOnboardingList: React.Dispatch<React.SetStateAction<OnboardingItem[]>>,
) => {
  const handleSelect = (id: number, value: string) => {
    setOnboardingList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: value } : item)),
    );
  };

  const isComplete = onboardingList.every((item) => item.checked !== null);

  return {
    handleSelect,
    isComplete,
  };
};
