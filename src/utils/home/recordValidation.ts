import type { UserRecord } from '../../types/home/record';

export function validateForm(
  formData: UserRecord,
  contentError: boolean,
  isMemoInvalid: boolean,
): boolean {
  return (
    formData.categoryName !== '' &&
    formData.amount > 0 &&
    formData.content.length > 0 &&
    formData.content.length <= 20 &&
    !contentError &&
    (formData.isPublic ||
      (formData.imageUrl !== '' &&
        formData.memo.length > 0 &&
        formData.memo.length <= 1000 &&
        !isMemoInvalid))
  );
}
