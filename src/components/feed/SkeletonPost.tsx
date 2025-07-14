import React from 'react';
import * as S from '../../styles/feed/feed.style';

export const SkeletonPost: React.FC = () => {
  return (
    <S.PostCard>
      <S.PostHeader>
        <S.SkeletonBox width="30px" height="30px" circle />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <S.SkeletonBox width="120px" height="16px" />
        </div>
      </S.PostHeader>

      <S.PostImageContainer>
        <S.ImageSkeleton />
      </S.PostImageContainer>

      <S.PostActions>
        <S.SkeletonBox width="64px" height="32px" />
        <S.SkeletonBox width="64px" height="32px" />
      </S.PostActions>
    </S.PostCard>
  );
};
