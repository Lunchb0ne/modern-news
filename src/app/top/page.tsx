import PostComponent from '@/app/_components/post-component';
import { getTopStories } from '@/lib/hn';

export default async function Top() {
  const posts = await getTopStories();

  return (
    <div>
      <h1 className="text-2xl">Top</h1>
      <ul>
        {posts.map((post) => (
          <PostComponent post={post} key={post.id} />
        ))}
      </ul>
    </div>
  );
}
