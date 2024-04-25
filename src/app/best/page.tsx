import HackerNews from '@/lib/hn';

export default async function Best() {
  const posts = await HackerNews.getBestStories();
  return (
    <div>
      <h1>Best</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}
