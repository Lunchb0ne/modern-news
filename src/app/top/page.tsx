import HackerNews from '@/lib/hn';
import Post from '@/app/components/Post';

export default async function Top() {
  const posts = await HackerNews.getTopStories();

  return (
    <div>
      <h1>Top</h1>
      <ul>
        {posts.map((post) => (
          <Post post={post} key={post.id} />
        ))}
      </ul>
    </div>
  );
}
