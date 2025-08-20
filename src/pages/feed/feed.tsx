import React, { useEffect, useRef, useCallback, useState } from 'react';
import { useNavigationType } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useFeedPosts } from '../../hooks/feed/useFeedPosts';
import { SearchBox } from '../../components/feed/SearchBox';
import { SortDropdown } from '../../components/feed/SortDropdown';
import PostItem from '../../components/feed/PostItem';
import { SkeletonPost } from '../../components/feed/SkeletonPost';
import NoResult from '../../assets/images/feed/NO_RESULT.png';
import * as S from '../../styles/feed/feed.style';
import type { SortType, FeedItem } from '../../types/feed/feed';

const Feed: React.FC = () => {
  const [sortBy, setSortBy] = useState<SortType>('POPULAR');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<FeedItem[]>([]);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const preSearchScrollY = useRef<number>(0);
  const [resetToken, setResetToken] = useState(0);
  const navType = useNavigationType();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (navType !== 'POP') {
      const shouldClearCache =
        window.location.href ===
          window.location.origin + window.location.pathname ||
        document.referrer === '';

      if (shouldClearCache) {
        queryClient.removeQueries({ queryKey: ['feed'], exact: false });
      }
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [navType, queryClient]);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useFeedPosts(sortBy);

  const allPosts = data?.pages.flatMap((page) => page.feedList) ?? [];

  const [showSkeleton, setShowSkeleton] = useState(true);
  useEffect(() => {
    if (data && !isLoading) {
      const timeout = setTimeout(() => setShowSkeleton(false), 1000);
      return () => clearTimeout(timeout);
    }
  }, [data, isLoading]);

  useEffect(() => {
    setShowSkeleton(true);
  }, [sortBy]);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (
        target.isIntersecting &&
        hasNextPage &&
        !isFetchingNextPage &&
        !isSearchMode &&
        !showSkeleton
      ) {
        fetchNextPage();
      }
    },
    [
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
      isSearchMode,
      showSkeleton,
    ],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '0px 0px 100px 0px',
      threshold: 0,
    });
    const el = observerRef.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
      observer.disconnect();
    };
  }, [handleObserver, sortBy]);

  const handleSearchStart = (keyword: string) => {
    preSearchScrollY.current = window.scrollY;
    setIsSearchMode(true);
    setIsDropdownOpen(false);
    console.log('검색어: ', keyword);
  };

  const handleSearchResults = (results: FeedItem[]) => {
    setSearchResults(results);
  };

  const handleBackFromSearch = () => {
    setIsSearchMode(false);
    setSearchResults([]);
    setResetToken((t) => t + 1);
    requestAnimationFrame(() => {
      window.scrollTo(0, preSearchScrollY.current || 0);
    });
  };

  const displayPosts = isSearchMode ? searchResults : allPosts;

  return (
    <div className={S.Container}>
      <SearchBox
        onSearchStart={handleSearchStart}
        onSearchResults={handleSearchResults}
        isSearchMode={isSearchMode}
        onBack={handleBackFromSearch}
        resetToken={resetToken}
      />

      {!isSearchMode && (
        <SortDropdown
          sortBy={sortBy}
          onSortChange={setSortBy}
          isOpen={isDropdownOpen}
          onToggle={() => setIsDropdownOpen((prev) => !prev)}
        />
      )}

      <div className={S.PostContainer}>
        {showSkeleton ? (
          <SkeletonPost />
        ) : displayPosts.length > 0 ? (
          displayPosts.map((post) => (
            <PostItem key={post.consumptionRecordId} post={post} />
          ))
        ) : (
          !isLoading &&
          !isSearchMode && (
            <div className={S.NoResultContainer}>
              <img src={NoResult} alt="게시글 없음" className={S.noPostImg} />
              <span className={S.noPostText}>게시글이 없어요.</span>
            </div>
          )
        )}

        <div ref={observerRef} style={{ height: 1 }} aria-hidden />

        {!showSkeleton && isFetchingNextPage && !isSearchMode && (
          <SkeletonPost />
        )}
      </div>
    </div>
  );
};

export default Feed;
