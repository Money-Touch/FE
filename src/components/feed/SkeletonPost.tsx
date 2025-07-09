import React from 'react';
import {
  PostCard,
  PostHeader,
  PostImageContainer,
  PostActions,
  SkeletonBox,
  ImageSkeleton,
} from '../../styles/feed/feed';

export const SkeletonPost: React.FC = () => {
  return (
    <PostCard>
      <PostHeader>
        <SkeletonBox width="30px" height="30px" circle />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <SkeletonBox width="120px" height="16px" />
        </div>
      </PostHeader>

      <PostImageContainer>
        <ImageSkeleton />
      </PostImageContainer>

      <PostActions>
        <SkeletonBox width="64px" height="32px" />
        <SkeletonBox width="64px" height="32px" />
      </PostActions>
    </PostCard>
  );
};
