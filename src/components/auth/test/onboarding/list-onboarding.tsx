import ItemOnboarding from './item-onboarding';
import type { OnboardingItem } from '../../../../types/auth/test/onboarding';
import * as T from '../../../../styles/auth/test/test.style';

interface ListOnboardingProps {
  onboardingList: OnboardingItem[];
  onSelect: (id: number, value: string) => void;
}

const ListOnboarding = ({ onboardingList, onSelect }: ListOnboardingProps) => {
  return (
    <T.ListOnboardingContainer>
      {onboardingList.map((item) => (
        <ItemOnboarding key={item.id} item={item} onSelect={onSelect} />
      ))}
    </T.ListOnboardingContainer>
  );
};

export default ListOnboarding;
