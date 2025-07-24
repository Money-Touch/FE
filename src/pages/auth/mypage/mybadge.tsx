import { useState, useRef, useEffect } from 'react';
import * as S from '../../../styles/auth/mypage/mybadge.style';

import Header from '../../../components/header/header';
import Footer from '../../../components/footer/footer';
import PencilIcon from '../../../assets/images/auth/badge/Pencil.png';

import { badgeList } from '../../../mocks/auth/badge/badgeList';

import Nobadge from '../../../assets/images/auth/badge/Represent/NoBadge.png';

const Mybadge = () => {
  const [representBadgeId, setRepresentBadgeId] = useState<string | null>(null);
  const [selectedBadgeId, setSelectedBadgeId] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const handleBadgeClick = (badgeId: string) => {
    if (!isEditMode) return;
    setSelectedBadgeId(badgeId === selectedBadgeId ? null : badgeId);
  };

  const handleCancel = () => setSelectedBadgeId(null);

  const handleSelect = () => {
    if (selectedBadgeId) {
      setRepresentBadgeId(selectedBadgeId);
    }
    setSelectedBadgeId(null);
    setIsEditMode(false);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
      setIsEditMode(false);
      setSelectedBadgeId(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const representBadge = badgeList.find(b => b.id === representBadgeId);

  return (
    <>
      <S.Container ref={wrapperRef}>
        <S.TopContainer>
        <Header title="MY 배지" />
        <S.TitleContainer>
          <S.Title>대표 배지</S.Title>
          <S.EditImage onClick={() => setIsEditMode(true)}>
            <img src={PencilIcon} alt="수정" />
          </S.EditImage>
        </S.TitleContainer>

        <S.RepresentBadgeImageWrapper>
          <S.RepresentBadgeImage
            src={representBadge?.represent || Nobadge}
            alt={representBadge ? '대표 배지' : '대표 배지 없음'}
          />
        </S.RepresentBadgeImageWrapper>
        </S.TopContainer>

        <S.Divider />

        <S.MyBadgeContainer isEditMode={isEditMode}>
          {badgeList.map((badge) => (
            <S.BadgeItem
              key={badge.id}
              onClick={() => handleBadgeClick(badge.id)}
              isSelected={selectedBadgeId === badge.id}
            >
              <S.BadgeImageWrapper isSelected={selectedBadgeId === badge.id}>
                <img src={badge.image} alt={badge.name} />
              </S.BadgeImageWrapper>
              <S.BadgeName>{badge.name}</S.BadgeName>
            </S.BadgeItem>
          ))}
        </S.MyBadgeContainer>

        {isEditMode ? (
          <S.SelectFooter>
            <S.CancelButton onClick={handleCancel}>취소</S.CancelButton>
            <S.SelectButton
              onClick={handleSelect}
              disabled={!selectedBadgeId}
            >
              선택
            </S.SelectButton>
          </S.SelectFooter>
        ) : (
          <Footer />
        )}
      </S.Container>
    </>
  );
};

export default Mybadge;
