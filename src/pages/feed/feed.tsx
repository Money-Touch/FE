import React, { useEffect, useRef, useCallback, useState } from 'react';
import { useFeedPosts } from '../../hooks/feed/useFeedPosts';
import { SearchBox } from '../../components/feed/SearchBox';
import { SortDropdown } from '../../components/feed/SortDropdown';
import { PostItem } from '../../components/feed/PostItem';
import { SkeletonPost } from '../../components/feed/SkeletonPost';
import NoResult from '../../assets/images/feed/NO_RESULT.png';
import * as S from '../../styles/feed/feed.style';

import type { SortType } from '../../types/feed/feed';

const Feed: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortType>('POPULAR');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useFeedPosts(sortBy);

  const allPosts = data?.pages.flatMap((page) => page.feedList) ?? [];

  const filtered = allPosts.filter((post) =>
    post.user?.nickname?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const [showSkeleton, setShowSkeleton] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => setShowSkeleton(false), 1000);
    return () => clearTimeout(timeout);
  }, []);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 1.0,
    });
    const current = observerRef.current;
    if (current) observer.observe(current);
    return () => {
      if (current) observer.unobserve(current);
      observer.disconnect();
    };
  }, [handleObserver, sortBy]);

  return (
    <div className="flex flex-col px-[2.4rem] pb-[5rem]">
      <SearchBox
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onSearch={() => {
          console.log('검색:', searchTerm);
        }}
      />
      <SortDropdown
        sortBy={sortBy}
        onSortChange={setSortBy}
        isOpen={isDropdownOpen}
        onToggle={() => setIsDropdownOpen((prev) => !prev)}
      />

      <div className="flex flex-col gap-[1.6rem] mt-[1.2rem]">
        {showSkeleton ? (
          <SkeletonPost />
        ) : filtered.length > 0 ? (
          filtered.map((post) => (
            <PostItem key={post.consumptionRecordId} post={post} />
          ))
        ) : (
          !isLoading && (
            <div className={S.NoResultContainer}>
              <img
                src={NoResult}
                alt="검색 결과 없음"
                className="w-[16rem] h-[16rem] object-contain"
              />
              <span className="text-[1.4rem] text-[var(--color-G4)]">
                검색 결과가 없어요.
              </span>
            </div>
          )
        )}

        <div ref={observerRef} />

        {!showSkeleton && isFetchingNextPage && <SkeletonPost />}
      </div>
    </div>
  );
};

export default Feed;
