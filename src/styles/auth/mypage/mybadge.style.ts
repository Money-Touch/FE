import styled from 'styled-components';
import colors from '../../common/colors';

export const Container = styled.div`
  display:flex;
  flex-direction: column;
`;

//title
export const TopContainer = styled.div`
  display:flex;
  flex-direction: column;
  margin: 0 2.4rem;
`;

export const TitleContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 0.6rem;
`;

export const Title = styled.div`
  font-size: 1.6rem;
  line-height: 2.4rem;
  letter-spacing: -2%;
`;

export const EditImage = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  img {
    width: 2rem;
    height: 2rem;
  }
`;

//represent badge
export const RepresentBadgeImageWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  aspect-ratio: 397 / 298;
`;

export const RepresentBadgeImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

//Divider
export const Divider = styled.div`
  height: 0.7rem;
  background-color: ${colors.G8};
  margin-top: 1.2rem;
  margin-bottom: 2rem;
`;

//My Badge
export const MyBadgeContainer = styled.div<{ isEditMode: boolean }>`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem 1rem;
  padding: 0 5.1rem;
  opacity: ${({ isEditMode }) => (isEditMode ? 1 : 0.4)};
  pointer-events: ${({ isEditMode }) => (isEditMode ? 'auto' : 'none')};
  margin-bottom: 1.2rem;
`;

export const BadgeItem = styled.div<{ isSelected: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

export const BadgeName = styled.div`
  margin-top: 1rem;
  font-size: 1.2rem;
  line-height: 1.6rem;
  color: ${colors.G1};
  text-align: center;
`;

// 선택 푸터
export const SelectFooter = styled.div`
  width: 100%;
  max-width: 425px;
  height: 130px;
  background: white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  display: flex;
  justify-content: space-between;
  padding: 1.5rem 2.4rem 0 2.4rem;
  box-shadow: 0px 0px 2px 0px #00000029;
  gap: 2.3rem;
`;

export const CancelButton = styled.button`
  flex: 1;
  height: 4.7rem;
  background: ${colors.G7};
  border: none;
  border-radius: 0.5rem;
  font-size: 1.4rem;
  color: ${colors.G4};
`;

export const SelectButton = styled.button`
  flex: 1;
  height: 4.7rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1.4rem;
  color: ${({ disabled }) => (disabled ? colors.G4 : colors.white)};
  background: ${({ disabled }) => (disabled ? colors.G7 : colors.mainColor1)};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
  transition: opacity 0.2s ease;
`;


interface BadgeImageWrapperProps {
  isSelected: boolean;
}

export const BadgeImageWrapper = styled.div<BadgeImageWrapperProps>`
  width: 7.6rem;
  height: 7.6rem;
  background-color: ${(props) => props.isSelected ? '#E6E6E6' : 'transparent'};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 5.8rem;
    height: 6.6rem;
    object-fit: contain;
  }
`;