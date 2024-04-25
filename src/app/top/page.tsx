import HackerNews from '@/lib/hn';

export default async function Top() {
  const posts = await HackerNews.getTopStories();
  return (
    <div>
      <h1>Top</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}
