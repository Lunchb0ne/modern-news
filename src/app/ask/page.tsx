import PostComponent from '@/app/_components/post-component';
import { getAskStories } from '@/lib/hn';

export default async function Show() {
  const posts = await getAskStories();

  return (
    <div>
      <h1 className="text-2xl">Ask</h1>
      <ul>
        {posts.map((post) => (
          <PostComponent post={post} key={post.id} />
        ))}
      </ul>
    </div>
  );
}
