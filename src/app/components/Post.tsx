import { HackerNewsItem } from '@/lib/hn';
import Link from 'next/link';

interface Post {
  post: HackerNewsItem;
}

export default async function Post({ post }: Post) {
  const hasLink = post.url !== undefined;

  return (
    <div>
      <li>
        {hasLink ? (
          <Link href={post.url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
            {post.title}
          </Link>
        ) : (
          <span>{post.title}</span>
        )}
      </li>
    </div>
  );
}
