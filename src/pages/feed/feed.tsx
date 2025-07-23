import React, { useState, useEffect, useMemo } from 'react';
import { SearchBox } from '../../components/feed/SearchBox';
import { SortDropdown } from '../../components/feed/SortDropdown';
import { PostItem } from '../../components/feed/PostItem';
import { SkeletonPost } from '../../components/feed/SkeletonPost';
import * as S from '../../styles/feed/feed.style';
import NoResult from '../../assets/images/feed/NO_RESULT.png';

import type { Post, SortBy, PostStates } from '../../types/feed/feed';
import { handleLike, handleDislike } from '../../utils/feed/reaction';

const Feed: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortBy>('popular');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: { name: '홍길동' },
      likes: 24,
      dislikes: 2,
      timestamp: new Date('2024-07-03T10:00:00'),
      content: '123456',
    },
    {
      id: 2,
      author: { name: '김철수' },
      likes: 31,
      dislikes: 1,
      timestamp: new Date('2024-07-03T08:15:00'),
      content: 'abcdefg',
    },
  ]);

  const [postStates, setPostStates] = useState<PostStates>({});

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredAndSortedPosts = useMemo(() => {
    const filtered = posts.filter((post) =>
      post.author.name.toLowerCase().includes(searchTerm.toLowerCase())
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
    <S.Container>
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

      <S.PostList>
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <SkeletonPost key={i} />)
          : filteredAndSortedPosts.map((post) => (
              <PostItem
                key={post.id}
                post={post}
                onLike={() =>
                  handleLike(post.id, posts, postStates, setPosts, setPostStates)
                }
                onDislike={() =>
                  handleDislike(post.id, posts, postStates, setPosts, setPostStates)
                }
                liked={postStates[post.id]?.liked}
                disliked={postStates[post.id]?.disliked}
              />
            ))}
      </S.PostList>

      {!loading && filteredAndSortedPosts.length === 0 && (
        <S.NoResultContainer>
          <S.NoResultImage src={NoResult} alt="검색 결과 없음" />
          <S.NoResultText>검색 결과가 없어요.</S.NoResultText>
        </S.NoResultContainer>
      )}
    </S.Container>
  );
};

export default Feed;
