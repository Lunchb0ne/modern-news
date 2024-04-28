import { getShowStories } from '@/lib/hn';
import PostComponent from '@/app/_components/post-component';

export default async function Show() {
  const posts = await getShowStories();

  return (
    <div>
      <h1 className="text-2xl">Show</h1>
      <ul>
        {posts.map((post) => (
          <PostComponent post={post} key={post.id} />
        ))}
      </ul>
    </div>
  );
}
