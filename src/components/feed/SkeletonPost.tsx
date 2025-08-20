import React from 'react';
import * as S from '../../styles/feed/feed.style';

export const SkeletonPost: React.FC = () => {
  return (
    <div className={S.PostCard}>
      <div className={S.PostHeader}>
        <div className={`${S.SkeletonBox} w-[3rem] h-[3rem] rounded-full`} />
        <div className={S.skeletonBoxContainer}>
          <div
            className={`${S.SkeletonBox} w-[12rem] h-[1.6rem] rounded-full`}
          />
        </div>
      </div>

      <div className={S.PostImageContainer}>
        <div className={S.ImageSkeleton} />
      </div>

      <div className={S.PostActions}>
        <div className={`${S.SkeletonBox} w-[6.4rem] h-[3rem] rounded-full`} />
        <div className={`${S.SkeletonBox} w-[6.4rem] h-[3rem] rounded-full`} />
      </div>
    </div>
  );
};
