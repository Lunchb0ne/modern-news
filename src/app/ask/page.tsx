import HackerNews from '@/lib/hn';
import Post from '@/app/components/Post';

export default async function Show() {
  const posts = await HackerNews.getAskStories();

  return (
    <div>
      <h1>Ask</h1>
      <ul>
        {posts.map((post) => (
          <Post post={post} key={post.id} />
        ))}
      </ul>
    </div>
  );
}
