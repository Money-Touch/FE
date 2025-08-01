import React, { useState, useEffect, useMemo } from 'react';
import { SearchBox } from '../../components/feed/SearchBox';
import { SortDropdown } from '../../components/feed/SortDropdown';
import { PostItem } from '../../components/feed/PostItem';
import { SkeletonPost } from '../../components/feed/SkeletonPost';
import NoResult from '../../assets/images/feed/NO_RESULT.png';

import type { Post, SortBy, PostStates } from '../../types/feed/feed';
import { handleLike, handleDislike } from '../../utils/feed/reaction';
import { Posts } from '../../mocks/feed/feed';
import * as S from '../../styles/feed/feed.style';

const Feed: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortBy>('popular');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [posts, setPosts] = useState<Post[]>(Posts);
  const [postStates, setPostStates] = useState<PostStates>({});

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredAndSortedPosts = useMemo(() => {
    const filtered = posts.filter((post) =>
      post.author.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    if (sortBy === 'popular') {
      filtered.sort((a, b) => b.likes - b.dislikes - (a.likes - a.dislikes));
    } else {
      filtered.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    }

    return filtered;
  }, [posts, searchTerm, sortBy]);

  const handleSearch = () => {
    console.log('검색 실행:', searchTerm);
  };

  return (
    <div className="flex flex-col px-[2.4rem] pb-[5rem]">
      <SearchBox
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onSearch={handleSearch}
      />

      <SortDropdown
        sortBy={sortBy}
        onSortChange={setSortBy}
        isOpen={isDropdownOpen}
        onToggle={() => setIsDropdownOpen(!isDropdownOpen)}
      />

      <div className="flex flex-col gap-[1.6rem] mt-[1.2rem]">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <SkeletonPost key={i} />)
          : filteredAndSortedPosts.map((post) => (
              <PostItem
                key={post.id}
                post={post}
                onLike={() =>
                  handleLike(
                    post.id,
                    posts,
                    postStates,
                    setPosts,
                    setPostStates,
                  )
                }
                onDislike={() =>
                  handleDislike(
                    post.id,
                    posts,
                    postStates,
                    setPosts,
                    setPostStates,
                  )
                }
                liked={postStates[post.id]?.liked}
                disliked={postStates[post.id]?.disliked}
              />
            ))}
      </div>

      {!loading && filteredAndSortedPosts.length === 0 && (
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
      )}
    </div>
  );
};

export default Feed;
