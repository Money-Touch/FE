import type { OnboardingItem } from '../../../../types/auth/test/onboarding';
import * as T from '../../../../styles/auth/test/test';
import ListSelect from './list-select';

interface ItemOnboardingProps {
  item: OnboardingItem;
  onSelect: (id: number, value: string) => void;
}

const ItemOnboarding = ({ item, onSelect }: ItemOnboardingProps) => {
  return (
    <T.ItemOnboardingContainer>
      <T.ItemOnboardingP>{item.title}</T.ItemOnboardingP>
      <ListSelect
        id={item.id}
        selectList={item.list}
        checked={item.checked}
        onSelect={onSelect}
      />
    </T.ItemOnboardingContainer>
  );
};

export default ItemOnboarding;
