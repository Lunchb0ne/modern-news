import HackerNews from '@/lib/hn';

export default async function New() {
  const posts = await HackerNews.getNewStories();
  return (
    <div>
      <h1>New</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}
