import HackerNews from '@/lib/hn';

export default async function Ask() {
  const posts = await HackerNews.getAskStories();
  return (
    <div>
      <h1>Ask</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}
