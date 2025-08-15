import * as S from '../../styles/home/record.style';
import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/header';
import CategorySection from '../../components/home/record/categorySection';
import AmountSection from '../../components/home/record/amountSection';
import ContentSection from '../../components/home/record/contentSection';
import ImageSection from '../../components/home/record/imageSection';
import MemoSection from '../../components/home/record/memoSection';
import SubmitButton from '../../components/home/record/submitButton';
import type { UserRecord } from '../../types/home/record';
import { validateForm } from '../../utils/home/recordValidation';
import { useSubmitRecord } from '../../hooks/home/record/useSubmitRecord';
import { useCategories } from '../../hooks/home/record/useCategories';

function record() {
  const navigate = useNavigate();
  const { data: categories = [], isLoading, error } = useCategories();
  const [formData, setFormData] = useState<UserRecord>({
    categoryName: '',
    isPublic: true,
    amount: 0,
    content: '',
    imageUrl: '',
    memo: '',
  });
  const [isAmountTouched, setIsAmountTouched] = useState(false);
  const [contentError, setContentError] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isMemoInvalid, setIsMemoInvalid] = useState(false);
  const resetForm = () => {
    setFormData({
      categoryName: '',
      isPublic: true,
      amount: 0,
      content: '',
      imageUrl: '',
      memo: '',
    });
    setFile(null);
    setIsAmountTouched(false);
    setContentError(false);
    setIsMemoInvalid(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, imageUrl }));
    }
  };

  const handleMemoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const invalid = value.length > 1000;
    setIsMemoInvalid(invalid);
    setFormData((prev) => ({ ...prev, memo: value }));
  };

  const handleMemoBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, memo: value }));
  };

  const isFormValid = useMemo(() => {
    return validateForm(formData, contentError, isMemoInvalid);
  }, [formData, contentError, isMemoInvalid]);

  const { mutate: submitRecord } = useSubmitRecord(resetForm);

  const handleSubmit = () => {
    if (!isFormValid) return;
    console.log('data:', { formData, file });

    submitRecord(
      { formData, file },
      {
        onSuccess: () => {
          if (formData.isPublic) {
            navigate('/feed');
          } else {
            navigate('/home');
          }
        },
      },
    );
  };

  return (
    <>
      {isLoading && null}
      {error && null}
      {!isLoading && !error && (
        <div className={`pageContainer ${S.Container} !pt-[8.4rem] `}>
          <Header title="소비 기록" />
          <CategorySection
            selectedCategory={formData.categoryName}
            categories={categories}
            isChecked={!formData.isPublic}
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
              isDisabled={formData.isPublic}
              onChange={handleImageChange}
            />
            <MemoSection
              value={formData.memo}
              isError={isMemoInvalid}
              isDisabled={formData.isPublic}
              onChange={handleMemoChange}
              onBlur={handleMemoBlur}
            />
          </div>

          <SubmitButton isActive={isFormValid} onClick={handleSubmit} />
        </div>
      )}
    </>
  );
}

export default record;
