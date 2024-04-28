'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function LinkBar() {
  const currentPath = usePathname();
  return (
    <>
      <Link
        href="/top"
        className={cn(currentPath === '/top' ? '' : 'text-muted-foreground', 'transition-colors hover:text-foreground')}
      >
        Top
      </Link>
      <Link
        href="/ask"
        className={cn(currentPath === '/ask' ? '' : 'text-muted-foreground', 'transition-colors hover:text-foreground')}
      >
        Ask
      </Link>
      <Link
        href="/show"
        className={cn(
          currentPath === '/show' ? '' : 'text-muted-foreground',
          'transition-colors hover:text-foreground'
        )}
      >
        Show
      </Link>
      <Link
        href="/best"
        className={cn(
          currentPath === '/best' ? '' : 'text-muted-foreground',
          'transition-colors hover:text-foreground'
        )}
      >
        Best
      </Link>
      <Link
        href="/"
        className={cn(
          currentPath === '/' ? 'text-foreground' : 'text-muted-foreground',
          'transition-colors hover:text-foreground'
        )}
      >
        New
      </Link>
    </>
  );
}
