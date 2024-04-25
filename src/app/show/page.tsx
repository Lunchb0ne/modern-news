import HackerNews from '@/lib/hn';

export default async function Show() {
  const posts = await HackerNews.getShowStories();
  return (
    <div>
      <h1>Show</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}
