import { useState, useRef, useEffect } from 'react';
import * as S from '../../../styles/auth/mypage/mybadge.style';

import Header from '../../../components/header/header';
import Footer from '../../../components/footer/footer';
import PencilIcon from '../../../assets/images/auth/badge/Pencil.png';

import FairyRepresent from '../../../assets/images/auth/badge/Represent/Fairy.png';
import LoverRepresent from '../../../assets/images/auth/badge/Represent/Lover.png';
import MasterRepresent from '../../../assets/images/auth/badge/Represent/Master.png';
import BossRepresent from '../../../assets/images/auth/badge/Represent/Boss.png';
import MayThirdRepresent from '../../../assets/images/auth/badge/Represent/May_third.png';
import JuneSecondRepresent from '../../../assets/images/auth/badge/Represent/June_second.png';
import JulyFirstRepresent from '../../../assets/images/auth/badge/Represent/July_first.png';

import FairyBadge from '../../../assets/images/auth/badge/MyBadge/Fairy.png';
import LoverBadge from '../../../assets/images/auth/badge/MyBadge/Lover.png';
import MasterBadge from '../../../assets/images/auth/badge/MyBadge/Master.png';
import BossBadge from '../../../assets/images/auth/badge/MyBadge/Boss.png';
import MaythirdBadge from '../../../assets/images/auth/badge/MyBadge/May_third.png';
import JuneSecondBadge from '../../../assets/images/auth/badge/MyBadge/June_second.png';
import JulyFirstBadge from '../../../assets/images/auth/badge/MyBadge/July_first.png';

import Nobadge from '../../../assets/images/auth/badge/Represent/Nobadge.png';

const badgeList = [
  { id: 'fairy', name: '알뜰 요정', image: FairyBadge, represent: FairyRepresent },
  { id: 'lover', name: '절약 러버', image: LoverBadge, represent: LoverRepresent },
  { id: 'master', name: '절제 마스터', image: MasterBadge, represent: MasterRepresent },
  { id: 'boss', name: '똑똑 소비 대장', image: BossBadge, represent: BossRepresent },
  { id: 'may_third', name: '5월의 3등', image: MaythirdBadge, represent: MayThirdRepresent },
  { id: 'june_second', name: '6월의 2등', image: JuneSecondBadge, represent: JuneSecondRepresent },
  { id: 'july_first', name: '7월의 1등', image: JulyFirstBadge, represent: JulyFirstRepresent },
];

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
