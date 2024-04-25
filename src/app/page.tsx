import HackerNews from '@/lib/hn';
import Post from '@/app/components/Post';

export default async function New() {
  const posts = await HackerNews.getNewStories();

  return (
    <div>
      <h1>New</h1>
      <ul>
        {posts.map((post) => (
          <Post post={post} key={post.id} />
        ))}
      </ul>
    </div>
  );
}
