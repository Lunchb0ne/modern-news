import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { HackerNewsItem } from '@/lib/hn';
import parse from 'html-react-parser';
import { formatRelative } from 'date-fns';
import Link from 'next/link';
import React from 'react';
import TimeToggle from './client/time-toggle';

type PostProps = {
  post: HackerNewsItem;
};

export default function Post({ post }: PostProps) {
  const parsedText = parse(post.text ?? '');
  const containsText = post.text !== undefined;
  const containsLink = post.url !== undefined;
  const domain = containsLink ? new URL(post.url).hostname : '';

  return (
    <>
      <Card className="w-full max-w-md md:max-w-xl my-4">
        <CardContent className="p-4 grid gap-2 text-sm">
          <div className="space-y-0.5">
            {containsLink ? (
              <CardTitle>
                <Link className="font-medium" href={post.url}>
                  {post.title}
                </Link>
              </CardTitle>
            ) : (
              <CardTitle>{post.title}</CardTitle>
            )}
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {'by '}
              <Link className="underline" href="#">
                {post.by}
              </Link>
              {' · '}
              <TimeToggle time={post.time} />
            </p>
          </div>
        </CardContent>
        <CardFooter className="border-t p-4">
          <div className="flex items-center justify-between space-x-2 text-sm my-auto text-gray-500 dark:text-gray-400">
            <ChevronUpIcon className="w-4 h-4" />
            <span className="font-semibold">{post.score}</span>
            <ChevronDownIcon className="w-4 h-4" />
            <span className="separator">|</span>
            {containsLink && (
              <Link className="text-semibold text-opacity-80" href={post.url}>
                {domain}
              </Link>
            )}
            <span className="separator">|</span>
            <MessageCircleIcon className="w-4 h-4" />
            <Link className="underline" href="#">
              {post.descendants} comments
            </Link>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}

function ChevronDownIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function ChevronUpIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m18 15-6-6-6 6" />
    </svg>
  );
}

function MessageCircleIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
    </svg>
  );
}
