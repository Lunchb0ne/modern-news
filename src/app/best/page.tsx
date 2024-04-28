import PostComponent from '@/app/_components/post-component';
import { getBestStories } from '@/lib/hn';

export default async function Show() {
  const posts = await getBestStories();

  return (
    <div>
      <h1 className="text-2xl">Best</h1>
      <ul>
        {posts.map((post) => (
          <PostComponent post={post} key={post.id} />
        ))}
      </ul>
    </div>
  );
}
