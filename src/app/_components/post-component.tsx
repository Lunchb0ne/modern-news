import { Card, CardContent, CardDescription, CardFooter, CardTitle } from '@/components/ui/card';
import { HackerNewsItem } from '@/lib/hn';
import { ArrowDownIcon, ArrowUpIcon, QuoteIcon } from '@radix-ui/react-icons';
import parse from 'html-react-parser';
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
      <Card className="my-4 w-full max-w-md md:max-w-xl">
        <CardContent className="grid gap-2 p-4 text-sm">
          <div className="space-y-0.5">
            {containsLink ? (
              <CardTitle>
                <Link href={post.url}>{post.title}</Link>
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
          {containsText && <CardDescription>{parsedText}</CardDescription>}
        </CardContent>
        <CardFooter className="border-t p-4">
          <div className="my-auto flex items-center justify-between space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <ArrowUpIcon className="h-4 w-4" />
            <span className="font-semibold text-primary">{post.score}</span>
            <ArrowDownIcon className="h-4 w-4" />
            <span className="separator">|</span>
            {containsLink && (
              <Link className="text-semibold text-opacity-80" href={post.url}>
                {domain}
              </Link>
            )}
            <span className="separator">|</span>
            <QuoteIcon className="h-4 w-4" />
            <Link className="decoration-primary/80 hover:underline" href="#">
              {post.descendants} comments
            </Link>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
