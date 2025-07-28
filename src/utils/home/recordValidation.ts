import type { UserRecord } from '../../types/home/record';

export function validateForm(
  formData: UserRecord,
  contentError: boolean,
  isMemoInvalid: boolean,
): boolean {
  const basicValid =
    formData.categoryName !== '' &&
    formData.amount > 0 &&
    formData.content.length > 0 &&
    formData.content.length <= 20 &&
    !contentError;

  if (!basicValid) return false;

  if (formData.isPublic) {
    return (
      formData.imageUrl !== '' &&
      formData.memo.length > 0 &&
      formData.memo.length <= 1000 &&
      !isMemoInvalid
    );
  }

  return true;
}
