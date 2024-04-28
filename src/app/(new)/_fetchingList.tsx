'use client';
import { getNewStories, type HackerNewsItem } from '@/lib/hn';
import PostComponent from '@/app/_components/post-component';

import { useState } from 'react';

const AMOUNT = 20;
type FetchingListProps = {
  items: Array<HackerNewsItem>;
};

export default function FetchingList({ items }: FetchingListProps) {
  const [offset, setOffset] = useState(0);
  const [posts, setPosts] = useState<Array<HackerNewsItem>>(items);

  const fetchMorePosts = async () => {
    const newPosts = await getNewStories(offset + AMOUNT, AMOUNT);
    setOffset(offset + AMOUNT);
    setPosts([...posts, ...newPosts]);
  };

  return (
    <div>
      {posts.map((post) => (
        <PostComponent post={post} key={post.id} />
      ))}
      <button onClick={fetchMorePosts}>Load more</button>
    </div>
  );
}
