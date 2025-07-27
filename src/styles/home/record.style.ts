// record.tsx
export const Container = 'flex px-[2.4rem] items-start';

// title
export const Title =
  'relative inline-block h-[2.3rem] mb-[0.6rem] leading-[2.3rem] font-medium text-[1.5rem] text-[var(--color-G1)]';
export const StarImg = 'absolute w-[0.6rem] h-[0.6rem] top-0 right-[-0.5rem]';

// category
export const CategorySection =
  'w-full h-[9.9rem] mt-[1rem] relative overflow-x-hidden';
export const CategoryButtonWrapper =
  'w-full h-[3.6rem] flex gap-[1rem] overflow-x-auto overflow-y-hidden whitespace-nowrap scroll';
export const CategoryButton = (selected: boolean) =>
  `box-border px-[1.5rem] py-[0.7rem] rounded-[2rem] whitespace-nowrap border font-medium text-[1.4rem] leading-[2.2rem] text-center flex-shrink-0 cursor-pointer ${
    selected
      ? 'bg-[var(--color-mainColor1)] text-white border-[var(--color-mainColor1)]'
      : 'bg-white text-[var(--color-G2)] border-[var(--color-G7)]'
  }`;
export const CategoryCheckboxWrapper =
  'flex items-center gap-[0.6rem] mt-[1.4rem]';
export const CheckboxLabel =
  'h-[1.6rem] font-light text-[1.2rem] leading-[1.6rem] cursor-pointer text-[var(--color-G1)]';
export const CheckboxIcon = 'w-[1.6rem] h-[1.6rem] cursor-pointer';

// record
export const RecordSection = 'w-full h-[82.3rem] mt-[4.4rem]';
export const AmountSection = 'w-full h-[7.4rem]';
export const ContentSection = 'w-full h-[7.4rem] mt-[2.4rem]';
export const ImageSection = 'w-full h-[39.4rem] mt-[2.4rem]';
export const MemoSection = 'w-full h-[20.9rem] mt-[2.4rem]';
export const SubmitButton = (active: boolean) =>
  `w-full h-[5rem] rounded-[1rem] font-medium text-[1.8rem] mt-[4.2rem] mb-[7.4rem] text-white ${
    active
      ? 'bg-[var(--color-mainColor1)] cursor-pointer'
      : 'bg-[var(--color-G6)] cursor-default'
  }`;

// amount
export const AmountInputWrapper =
  'w-full h-[4.5rem] border border-[var(--color-G7)] rounded-[0.5rem] flex items-center px-[1.5rem] py-[1.1rem] box-border';
export const AmountInput =
  'flex-1 h-[2.2rem] border-none font-light text-[1.4rem] text-[var(--color-G1)] bg-transparent font-Pretendard placeholder:text-[var(--color-G5)] focus:outline-none';
export const Won =
  'w-[1.3rem] font-medium text-[1.4rem] text-[var(--color-G1)]';
export const ClearIcon =
  'w-[2rem] h-[2rem] object-contain cursor-pointer ml-[0.4rem]';

// content
export const ContentInputWrapper = (error: boolean): string =>
  `relative w-full h-[4.5rem] border rounded-[0.5rem] flex items-center px-[1.3rem] box-border ${
    error ? 'border-[var(--color-M1)]' : 'border-[var(--color-G7)]'
  }`;
export const ContentInput =
  'flex-1 h-[2.2rem] border-none font-light text-[1.4rem] leading-[2.2rem] text-[var(--color-G1)] bg-transparent font-Pretendard placeholder:text-[var(--color-G5)] focus:outline-none';
export const ErrorMessage =
  'mt-[0.3rem] font-light text-[1.1rem] text-[var(--color-M1)]';

// image
export const ImageInputWrapper = (disabled: boolean): string =>
  `relative w-full h-[36.5rem] border border-[var(--color-G7)] rounded-[0.5rem] flex items-center box-border ${
    disabled ? 'bg-transparent' : 'bg-[var(--color-G7)]'
  }`;
export const ImageLabel =
  'w-full h-full cursor-pointer flex justify-center items-center';
export const CameraIcon = 'w-[3rem] h-[3rem] text-[var(--color-G6)]';
export const ImagePreview = 'w-full h-full object-cover';
export const ImageInput = 'hidden';

// memo
export const MemoTextareaWrapper = (error: boolean): string =>
  `relative w-full border rounded-[0.5rem] p-[1.5rem] box-border ${
    error
      ? 'border-[var(--color-M1)] bg-[#fff0f0]'
      : 'border-[var(--color-G7)] bg-transparent'
  }`;
export const MemoTextarea = (error: boolean, disabled: boolean): string =>
  `w-full h-[18rem] border rounded-[0.5rem] p-[1.2rem_1.5rem] box-border font-light text-[1.4rem] leading-[2.2rem] text-[var(--color-G1)] font-Pretendard resize-none ${
    error ? 'border-[var(--color-M1)]' : 'border-[var(--color-G7)]'
  } ${disabled ? 'bg-transparent' : 'bg-[var(--color-G7)]'} focus:outline-none focus:border-${
    error ? 'var(--color-M1)' : 'var(--color-G7)'
  }`;
