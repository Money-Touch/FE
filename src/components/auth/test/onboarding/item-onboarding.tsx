import type { OnboardingItem } from '../../../../types/auth/test/onboarding';
import * as T from '../../../../styles/auth/test/test.style';
import ListSelect from './list-select';

interface ItemOnboardingProps {
  item: OnboardingItem;
  onSelect: (id: number, value: string) => void;
}

const ItemOnboarding = ({ item, onSelect }: ItemOnboardingProps) => {
  return (
    <div className={T.ItemOnboardingContainer}>
      <p className={T.ItemOnboardingP}>{item.title}</p>
      <ListSelect
        id={item.id}
        selectList={item.list}
        checked={item.checked}
        onSelect={onSelect}
      />
    </div>
  );
};

export default ItemOnboarding;
