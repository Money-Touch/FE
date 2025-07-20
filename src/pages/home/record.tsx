import * as S from '../../styles/home/record.style';
import { useState, useMemo } from 'react';

import Header from '../../components/header/header';
import Title from '../../components/home/record/title';
import CategorySelector from '../../components/home/record/categorySelector';
import CategoryCheck from '../../components/home/record/categoryCheck';
import AmountInput from '../../components/home/record/amountInput';
import ContentInput from '../../components/home/record/contentInput';
import ImageInput from '../../components/home/record/imageInput';
import MemoInput from '../../components/home/record/memoInput';
import SubmitButton from '../../components/home/record/submitButton';

import type { UserRecord } from '../../types/home/record';
import { getReorderedCategories } from '../../utils/home/category';
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
    <S.Container className="pageContainer">
      <Header title="소비 기록" />
      <S.CategorySection>
        <Title>카테고리 선택</Title>
        <CategorySelector
          selectedCategory={formData.categoryName}
          categories={reorderedCategories}
          onSelectCategory={(category) =>
            setFormData((prev) => ({ ...prev, categoryName: category }))
          }
        />
        <CategoryCheck
          isChecked={formData.isPublic}
          onToggle={() =>
            setFormData((prev) => ({ ...prev, isPublic: !prev.isPublic }))
          }
        />
      </S.CategorySection>

      <S.RecordSection>
        <S.AmountSection>
          <Title>비용</Title>
          <AmountInput
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
        </S.AmountSection>
        <S.ContentSection>
          <Title>항목명</Title>
          <ContentInput
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
          {contentError && (
            <S.ErrorMessage>최대 20자까지만 입력할 수 있어요.</S.ErrorMessage>
          )}
        </S.ContentSection>
        <S.ImageSection>
          <Title>사진</Title>
          <ImageInput
            imageUrl={formData.imageUrl}
            isDisabled={!formData.isPublic}
            onChange={handleImageChange}
          />
        </S.ImageSection>
        <S.MemoSection>
          <Title>메모</Title>
          <MemoInput
            value={formData.memo}
            isError={isMemoInvalid}
            isDisabled={!formData.isPublic}
            onChange={handleMemoChange}
            onBlur={handleMemoBlur}
          />
          {isMemoInvalid && (
            <S.ErrorMessage>최대 1000자까지만 입력할 수 있어요.</S.ErrorMessage>
          )}
        </S.MemoSection>
      </S.RecordSection>
      <SubmitButton
        isActive={isFormValid}
        onClick={() => {
          if (!isFormValid) return;
          alert('소비 기록 저장 완료');
        }}
      />
    </S.Container>
  );
}

export default record;
