'use client';
import { formatDate, formatDistanceToNow, formatRelative } from 'date-fns';
import React from 'react';

// Toggles the time to a relative time on clicking the time
export default function TimeToggle(props: { time: number } & React.ComponentPropsWithoutRef<'time'>) {
  const postDate = new Date(props.time * 1000);
  const [isRelative, setIsRelative] = React.useState(true);

  return (
    <time onClick={() => setIsRelative(!isRelative)} {...props} className="hover:cursor-pointer">
      {isRelative ? `${formatDistanceToNow(postDate)} ago` : formatDate(postDate, 'Pp')}
    </time>
  );
}
