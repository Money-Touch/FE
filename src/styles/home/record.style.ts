import colors from '../../styles/common/colors';
import styled from 'styled-components';

// record.tsx
export const Container = styled.div`
  display: flex;
  padding: 0 2.4rem;
  align-items: flex-start;
`;

// title
export const Title = styled.div`
  position: relative;
  display: inline-block;
  height: 2.3rem;
  margin-bottom: 0.6rem;
  line-height: 2.3rem;
  font-weight: 500;
  font-size: 1.5rem;
  color: ${colors.G1};
`;

export const StarImg = styled.img`
  position: absolute;
  width: 0.6rem;
  height: 0.6rem;
`;

// category
export const CategorySection = styled.div`
  width: 100%;
  height: 9.9rem;
  margin-top: 1rem;
  gap: 1.4rem;
  position: relative;
  overflow-x: hidden;
`;

export const CategoryButtonWrapper = styled.div`
  width: 100%;
  height: 3.6rem;
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const CategoryButton = styled.button<{ $selected: boolean }>`
  box-sizing: border-box;
  padding: 0.7rem 1.5rem;
  border-radius: 2rem;
  white-space: nowrap;
  border: 0.1rem solid
    ${({ $selected }) => ($selected ? colors.mainColor1 : colors.G7)};
  background-color: ${({ $selected }) =>
    $selected ? colors.mainColor1 : colors.white};
  color: ${({ $selected }) => ($selected ? colors.white : colors.G2)};
  font-weight: 500;
  font-size: 1.4rem;
  line-height: 2.2rem;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  flex-shrink: 0;
`;

export const CategoryCheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-top: 1.4rem;

  label {
    height: 1.6rem;
    font-weight: 300;
    font-size: 1.2rem;
    line-height: 1.6rem;
    cursor: pointer;
    color: ${colors.G1};
  }
`;

export const CheckboxIcon = styled.img`
  width: 1.6rem;
  height: 1.6rem;
  cursor: pointer;
`;

// record
export const RecordSection = styled.div`
  width: 100%;
  height: 82.3rem;
  margin-top: 4.4rem;
  gap: 2.4rem;
`;

export const AmountSection = styled.div`
  width: 100%;
  height: 7.4rem;
  gap: 0.6rem;
`;

export const ContentSection = styled.div`
  width: 100%;
  height: 7.4rem;
  margin-top: 2.4rem;
  gap: 0.6rem;
`;

export const ImageSection = styled.div`
  width: 100%;
  height: 39.4rem;
  margin-top: 2.4rem;
  gap: 0.6rem;
`;

export const MemoSection = styled.div`
  width: 100%;
  height: 20.9rem;
  margin-top: 2.4rem;
  gap: 0.6rem;
  padding: 0;
`;

export const SubmitButton = styled.button<{ $active: boolean }>`
  width: 100%;
  height: 5rem;
  border-radius: 1rem;
  background-color: ${({ $active }) =>
    $active ? colors.mainColor1 : colors.G6};
  cursor: ${({ $active }) => ($active ? 'pointer' : 'default')};
  margin-top: 4.2rem;
  font-weight: 500;
  font-size: 1.8rem;
  color: ${colors.white};
`;

// amount
export const AmountInputWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 4.5rem;
  border: 0.1rem solid ${colors.G7};
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  padding: 0 5.6rem 0 1.3rem;
  box-sizing: border-box;
`;

export const AmountInput = styled.input`
  flex: 1;
  height: 100%;
  border: none;
  font-weight: 300;
  font-size: 1.4rem;
  line-height: 2.2rem;
  color: ${colors.G1};
  background-color: transparent;
  font-family: 'Pretendard';

  &::placeholder {
    color: ${colors.G5};
  }

  &:focus {
    outline: none;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const Won = styled.span`
  position: absolute;
  right: 3.9rem;
  font-weight: 500;
  font-size: 1.4rem;
  color: ${colors.G1};
`;

export const ClearIcon = styled.img`
  position: absolute;
  right: 1.5rem;
  width: 2rem;
  height: 2rem;
  cursor: pointer;
`;

// content
export const ContentInputWrapper = styled.div<{ $error: boolean }>`
  position: relative;
  width: 100%;
  height: 4.5rem;
  border: 0.1rem solid ${({ $error }) => ($error ? colors.M1 : colors.G7)};
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  padding: 0 5.6rem 0 1.3rem;
  box-sizing: border-box;
`;

export const ContentInput = styled.input`
  flex: 1;
  height: 100%;
  border: none;
  font-weight: 300;
  font-size: 1.4rem;
  line-height: 2.2rem;
  color: ${colors.G1};
  background-color: transparent;
  font-family: 'Pretendard';

  &::placeholder {
    color: ${colors.G5};
  }

  &:focus {
    outline: none;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const ErrorMessage = styled.div`
  margin-top: 0.3rem;
  font-weight: 300;
  font-size: 1.1rem;
  color: ${colors.M1};
`;

// image
export const ImageInputWrapper = styled.div<{ $disabled?: boolean }>`
  position: relative;
  width: 100%;
  height: 36.5rem;
  border: 0.1rem solid ${colors.G7};
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  background-color: ${({ $disabled }) =>
    $disabled ? 'transparent' : colors.G7};
`;

export const ImageLabel = styled.label`
  width: 100%;
  height: 100%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CameraIcon = styled.img`
  width: 3rem;
  height: 3rem;
  color: ${colors.G6};
`;

export const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const ImageInput = styled.input`
  display: none;
`;

// memo
export const MemoTextareaWrapper = styled.div<{ $error: boolean }>`
  position: relative;
  width: 100%;
  border: 0.1rem solid ${({ $error }) => ($error ? colors.M1 : colors.G7)};
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-sizing: border-box;
  background-color: ${({ $error }) => ($error ? '#fff0f0' : 'transparent')};
`;

export const MemoTextarea = styled.textarea<{
  $error: boolean;
  $disabled?: boolean;
}>`
  width: 100%;
  height: 18rem;
  border: 0.1rem solid ${({ $error }) => ($error ? colors.M1 : colors.G7)};
  border-radius: 0.5rem;
  padding: 1.5rem 1.5rem 0 1.5rem;
  margin: 0;
  display: block;
  box-sizing: border-box;
  font-weight: 300;
  font-size: 1.4rem;
  line-height: 2.2rem;
  color: ${colors.G1};
  background-color: ${({ $disabled }) =>
    $disabled ? 'transparent' : colors.G7};
  resize: none;
  font-family: 'Pretendard';

  &::placeholder {
    color: ${colors.G5};
  }

  &:focus {
    outline: none;
    border-color: ${({ $error }) => ($error ? colors.M1 : colors.G7)};
  }
`;
