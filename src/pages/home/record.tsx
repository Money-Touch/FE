import * as S from '../../styles/home/record.style';
import { useState, useMemo } from 'react';
import Header from '../../components/header/header';
import CategorySection from '../../components/home/record/categorySection';
import AmountSection from '../../components/home/record/amountSection';
import ContentSection from '../../components/home/record/contentSection';
import ImageSection from '../../components/home/record/imageSection';
import MemoSection from '../../components/home/record/memoSection';
import SubmitButton from '../../components/home/record/submitButton';
import type { UserRecord } from '../../types/home/record';
import { getReorderedCategories } from '../../utils/home/getReorderedCategories';
import { validateForm } from '../../utils/home/recordValidation';

function record() {
  const [formData, setFormData] = useState<UserRecord>({
    categoryName: '',
    isPublic: false,
    amount: 0,
    content: '',
    imageUrl: '',
    memo: '',
  });
  const [isAmountTouched, setIsAmountTouched] = useState(false);
  const [contentError, setContentError] = useState(false);
  const [isMemoInvalid, setIsMemoInvalid] = useState(false);

  const reorderedCategories = getReorderedCategories();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, imageUrl }));
    }
  };

  const handleMemoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const invalid = value.length > 1000;
    setIsMemoInvalid(invalid);
    setFormData((prev) => ({
      ...prev,
      memo: value,
    }));
  };

  const handleMemoBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      memo: value,
    }));
  };

  const isFormValid = useMemo(() => {
    return validateForm(formData, contentError, isMemoInvalid);
  }, [formData, contentError, isMemoInvalid]);

  return (
    <div className={`pageContainer ${S.Container}`}>
      <Header title="소비 기록" />
      <CategorySection
        selectedCategory={formData.categoryName}
        categories={reorderedCategories}
        isChecked={formData.isPublic}
        onSelectCategory={(category) =>
          setFormData((prev) => ({ ...prev, categoryName: category }))
        }
        onToggle={() =>
          setFormData((prev) => ({ ...prev, isPublic: !prev.isPublic }))
        }
      />

      <div className={S.RecordSection}>
        <AmountSection
          amount={formData.amount}
          isTouched={isAmountTouched}
          onChange={(value) => {
            setIsAmountTouched(true);
            setFormData((prev) => ({ ...prev, amount: value }));
          }}
          onClear={() => {
            setIsAmountTouched(true);
            setFormData((prev) => ({ ...prev, amount: 0 }));
          }}
        />
        <ContentSection
          value={formData.content}
          error={contentError}
          onChange={(value) => {
            setContentError(value.length > 20);
            setFormData((prev) => ({ ...prev, content: value }));
          }}
          onClear={() => {
            setContentError(false);
            setFormData((prev) => ({ ...prev, content: '' }));
          }}
        />
        <ImageSection
          imageUrl={formData.imageUrl}
          isDisabled={!formData.isPublic}
          onChange={handleImageChange}
        />
        <MemoSection
          value={formData.memo}
          isError={isMemoInvalid}
          isDisabled={!formData.isPublic}
          onChange={handleMemoChange}
          onBlur={handleMemoBlur}
        />
      </div>

      <SubmitButton
        isActive={isFormValid}
        onClick={() => {
          if (!isFormValid) return;
          alert('소비 기록 저장 완료');
        }}
      />
    </div>
  );
}

export default record;
