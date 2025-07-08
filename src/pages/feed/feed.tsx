import React, { useState, useEffect, useMemo } from 'react';
import { SearchBox } from '../../components/feed/SearchBox';
import { SortDropdown } from '../../components/feed/SortDropdown';
import { PostItem } from '../../components/feed/PostItem';
import { SkeletonPost } from '../../components/feed/SkeletonPost';
import { Container, PostList, EmptyState } from '../../styles/feed/feed';

export interface Author {
  name: string;
  profileImage?: string;
}

export interface Post {
  id: number;
  author: Author;
  image?: string;
  likes: number;
  dislikes: number;
  timestamp: Date;
  content?: string;
}

export type SortBy = 'popular' | 'latest';

const Feed: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortBy>('popular');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: {
        name: '홍길동'
      },
      likes: 24,
      dislikes: 2,
      timestamp: new Date('2024-07-03T10:00:00'),
      content: "123456"
    },
    {
      id: 2,
      author: {
        name: '김철수'
      },
      likes: 31,
      dislikes: 1,
      timestamp: new Date('2024-07-03T08:15:00'),
      content: "abcdefg"
    },
  ]);

  const [postStates, setPostStates] = useState<{
    [key: number]: { liked: boolean; disliked: boolean };
  }>({});

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredAndSortedPosts = useMemo(() => {
    const filtered = posts.filter(post =>
      post.author.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortBy === 'popular') {
      filtered.sort((a, b) => (b.likes - b.dislikes) - (a.likes - a.dislikes));
    } else {
      filtered.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    }

    return filtered;
  }, [posts, searchTerm, sortBy]);

  const handleLike = (id: number) => {
    setPostStates(prev => {
      const current = prev[id] || { liked: false, disliked: false };
      const wasLiked = current.liked;

      const updatedPost = posts.find(p => p.id === id);
      if (!updatedPost) return prev;

      const newPosts = posts.map(p => {
        if (p.id !== id) return p;
        return {
          ...p,
          likes: wasLiked ? p.likes - 1 : p.likes + 1,
          dislikes: current.disliked && !wasLiked ? p.dislikes - 1 : p.dislikes
        };
      });

      setPosts(newPosts);
      return {
        ...prev,
        [id]: { liked: !wasLiked, disliked: wasLiked ? current.disliked : false },
      };
    });
  };

  const handleDislike = (id: number) => {
    setPostStates(prev => {
      const current = prev[id] || { liked: false, disliked: false };
      const wasDisliked = current.disliked;

      const updatedPost = posts.find(p => p.id === id);
      if (!updatedPost) return prev;

      const newPosts = posts.map(p => {
        if (p.id !== id) return p;
        return {
          ...p,
          dislikes: wasDisliked ? p.dislikes - 1 : p.dislikes + 1,
          likes: current.liked && !wasDisliked ? p.likes - 1 : p.likes
        };
      });

      setPosts(newPosts);
      return {
        ...prev,
        [id]: { liked: wasDisliked ? current.liked : false, disliked: !wasDisliked },
      };
    });
  };

  const handleSearch = () => {
    console.log('검색 실행:', searchTerm);
  };

  return (
    <Container>
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

      <PostList>
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <SkeletonPost key={i} />)
          : filteredAndSortedPosts.map(post => (
              <PostItem
                key={post.id}
                post={post}
                onLike={() => handleLike(post.id)}
                onDislike={() => handleDislike(post.id)}
              />
            ))}
      </PostList>

      {!loading && filteredAndSortedPosts.length === 0 && (
        <EmptyState>검색 결과가 없어요.</EmptyState>
      )}
    </Container>
  );
};

export default Feed;
