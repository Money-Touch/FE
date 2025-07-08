import { useFormContext, useWatch } from 'react-hook-form';
import { useState } from 'react';

export const useSettingInput = (name: string, type?: string) => {
  const { control, setValue } = useFormContext();
  const value = useWatch({ control, name });
  const [showPassword, setShowPassword] = useState(false);

  const isEmpty = !value || value.trim?.() === '';
  const togglePassword = () => setShowPassword((prev) => !prev);
  const handleDelete = () => setValue(name, '');

  const inputType =
    type === 'password' ? (showPassword ? 'text' : 'password') : type;

  return {
    value,
    isEmpty,
    showPassword,
    togglePassword,
    handleDelete,
    inputType,
  };
};
