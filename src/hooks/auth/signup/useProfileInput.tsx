import { useFormContext, useWatch } from 'react-hook-form';

export const useProfileInput = (name: string) => {
  const { control, setValue } = useFormContext();
  const value: string = useWatch({ control, name }) ?? '';

  const handleDelete = () => setValue(name, '');

  return {
    value,
    handleDelete,
  };
};
