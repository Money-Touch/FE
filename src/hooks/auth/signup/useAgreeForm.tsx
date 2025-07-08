import type { AgreeItem } from '../../../types/auth/signup/agree';

export const useAgreeForm = (
  agreeList: AgreeItem[],
  setAgreeList: React.Dispatch<React.SetStateAction<AgreeItem[]>>,
) => {
  const allChecked = agreeList.every((item) => item.checked);

  const requiredChecked = agreeList
    .filter((item) => item.name.includes('(필수)'))
    .every((item) => item.checked);

  const toggleAll = () => {
    const newValue = !allChecked;
    setAgreeList((prev) =>
      prev.map((item) => ({ ...item, checked: newValue })),
    );
  };

  const toggleItem = (id: number) => {
    setAgreeList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item,
      ),
    );
  };

  return {
    agreeList,
    allChecked,
    requiredChecked,
    toggleAll,
    toggleItem,
  };
};
