'use server';

import { unstable_noStore as noStore } from 'next/cache';

const apiUrl = 'https://hacker-news.firebaseio.com/v0/';

/** Unique ID of a Hacker News item, positive integer */
export type HackerNewsItemId = number;
/** Unique ID of a Hacker News user, alphanumeric */
export type HackerNewsUserId = string;
/** Hacker News category */
export type HackerNewsStoryType = 'top' | 'new' | 'best' | 'ask' | 'show' | 'job';
/** Possible type of a Hacker News item */
export type HackerNewsItemType = 'job' | 'story' | 'comment' | 'poll' | 'pollopt';

/**
 * A Hacker news item
 */
export interface HackerNewsItem {
  /** The item's unique id. */
  id: HackerNewsItemId;
  /** true if the item is deleted. */
  deleted: boolean;
  /** The type of item. One of "job", "story", "comment", "poll", or "pollopt". */
  type: HackerNewsItemType;
  /** The username of the item's author. */
  by: HackerNewsUserId;
  /** Creation date of the item, in Unix Time. */
  time: number;
  /** The comment, story or poll text. HTML. */
  text: string;
  /** true if the item is dead. */
  dead: boolean;
  /** The comment's parent: either another comment or the relevant story. */
  parent: HackerNewsItemId | undefined;
  /** The pollopt's associated poll. */
  poll: HackerNewsItemId | undefined;
  /** The IDs of the item's comments, in ranked display order. */
  kids: HackerNewsItemId[];
  /** The URL of the story. */
  url: string;
  /** The story's score, or the votes for a pollopt. */
  score: number;
  /** The title of the story, poll or job. HTML. */
  title: string;
  /** A list of related pollopts, in display order. */
  parts: HackerNewsItemId[];
  /** In the case of stories or polls, the total comment count. */
  descendants: number | undefined;
}

/**
 * Hacker news user data
 */
export interface HackerNewsUser {
  /** The user's unique username. Case-sensitive. Required. */
  id: HackerNewsUserId;
  /** Delay in minutes between a comment's creation and its visibility to other users. */
  delay: number;
  /** Creation date of the user, in Unix Time. */
  created: number;
  /** The user's karma. */
  karma: number;
  /** The user's optional self-description. HTML. */
  about: string;
  /** List of the user's stories, polls and comments. */
  submitted: number;
}
/**
 * Get item by item ID
 * @param item Promise which resolves with the ID of item. If item doesn't exist, it resolves with null.
 */
async function getItem(item: HackerNewsItemId): Promise<HackerNewsItem | null> {
  noStore();
  return fetch(`${apiUrl}/item/${item}.json`)
    .then((res) => res.json())
    .then((resjson) => resjson as HackerNewsItem);
}

/**
 * Get user by user ID
 * @param item Promise which resolves with the user object. If user doesn't exist, it resolves with null.
 */
async function getUser(userId: HackerNewsUserId): Promise<HackerNewsUser | null> {
  noStore();
  return fetch(`${apiUrl}/user/${userId}.json`)
    .then((res) => res.json())
    .then((resjson) => resjson as HackerNewsUser);
}

/**
 * Get ID of the latest item posted on HN
 * @returns Promise which resolves with the ID of the latest item posted on HN
 */
async function getMaxItemId(): Promise<HackerNewsItemId> {
  noStore();
  const res = await fetch(`${apiUrl}/maxitem.json`);
  const resjson = await res.json();
  return resjson as HackerNewsItemId;
}

/**
 * Get the latest item posted on HN
 * @returns Promise which resolves with the latest item posted on HN
 */
async function getMaxItem(): Promise<HackerNewsItem> {
  /** Assume that this item exists */
  return getMaxItemId().then((itemId) => getItem(itemId) as unknown as HackerNewsItem);
}

/**
 * Get IDs of new stories
 * @returns Promise which resolves with an array of IDs up to 500 new stories
 */
function getNewStoryIDs(): Promise<HackerNewsItemId[]> {
  return getStoryIds('new');
}

/**
 * Get stories
 * @param offset offset, with 0 being the newest story
 * @param amount Default: 10, amount of stories to return from offset on.
 * @returns Promise which resolves with an array of {@link HackerNewsItem}
 */
function getNewStories(offset: number = 0, amount: number = 10): Promise<HackerNewsItem[]> {
  return getStories('new', offset, amount);
}

/**
 * Get IDs of top stories
 * @returns Promise which resolves with an array of IDs up to 500 top stories
 */
function getTopStoryIDs(): Promise<HackerNewsItemId[]> {
  return getStoryIds('top');
}

/**
 * Get stories
 * @param offset offset, with 0 being the newest story
 * @param amount Default: 10, amount of stories to return from offset on.
 * @returns Promise which resolves with an array of {@link HackerNewsItem}
 */
function getTopStories(offset: number = 0, amount: number = 10): Promise<HackerNewsItem[]> {
  return getStories('top', offset, amount);
}

/**
 * Get IDs of best stories
 * @returns Promise which resolves with an array of IDs up to 500 best stories
 */
function getBestStoryIDs(): Promise<HackerNewsItemId[]> {
  return getStoryIds('best');
}

/**
 * Get stories
 * @param offset offset, with 0 being the newest story
 * @param amount Default: 10, amount of stories to return from offset on.
 * @returns Promise which resolves with an array of {@link HackerNewsItem}
 */
function getBestStories(offset: number = 0, amount: number = 10): Promise<HackerNewsItem[]> {
  return getStories('best', offset, amount);
}

/**
 * Get IDs of "Ask HN" stories
 * @returns Promise which resolves with an array of IDs up to 200 newest Ask HN stories
 */
function getAskStoryIds(): Promise<HackerNewsItemId[]> {
  return getStoryIds('ask');
}

/**
 * Get stories
 * @param offset offset, with 0 being the newest story
 * @param amount Default: 10, amount of stories to return from offset on.
 * @returns Promise which resolves with an array of {@link HackerNewsItem}
 */
function getAskStories(offset: number = 0, amount: number = 10): Promise<HackerNewsItem[]> {
  return getStories('ask', offset, amount);
}

/**
 * Get IDs of "Show HN" stories
 * @returns Promise which resolves with an array of IDs up to 200 newest Show HN stories
 */
function getShowStoryIds(): Promise<HackerNewsItemId[]> {
  return getStoryIds('show');
}

/**
 * Get stories
 * @param offset offset, with 0 being the newest story
 * @param amount Default: 10, amount of stories to return from offset on.
 * @returns Promise which resolves with an array of {@link HackerNewsItem}
 */
function getShowStories(offset: number = 0, amount: number = 10): Promise<HackerNewsItem[]> {
  return getStories('show', offset, amount);
}

/**
 * Get IDs of "Job" stories
 * @returns Promise which resolves with an array of IDs up to 200 newest Job stories
 */
function getJobStoryIds(): Promise<HackerNewsItemId[]> {
  return getStoryIds('job');
}

/**
 * Get stories
 * @param offset offset, with 0 being the newest story
 * @param amount Default: 10, amount of stories to return from offset on.
 * @returns Promise which resolves with an array of {@link HackerNewsItem}
 */
function getJobStories(offset: number = 0, amount: number = 10): Promise<HackerNewsItem[]> {
  return getStories('job', offset, amount);
}

/**
 * Get IDs of recently updated items and stories
 * @returns object with 2 arrays, one with updared story IDs, one with updated user IDs
 */
async function getUpdates(): Promise<{
  items: HackerNewsItemId[];
  profiles: HackerNewsUserId[];
}> {
  noStore();
  const res = await fetch(`${apiUrl}/updates.json`);
  const resjson = await res.json();
  return resjson as { items: HackerNewsItemId[]; profiles: HackerNewsUserId[] };
}

/**
 * Get IDs of HN stories
 * @param type Any of "top" | "new" | "best" | "ask" | "show" | "job"
 * @returns Promise which resolves with an array of IDs
 */
async function getStoryIds(type: HackerNewsStoryType): Promise<HackerNewsItemId[]> {
  noStore();
  return fetch(`${apiUrl}/${type}stories.json`)
    .then((res) => res.json())
    .then((resjson) => resjson as HackerNewsItemId[]);
}

/**
 * Get stories for a given category, includes options for pagination
 * If offset higher than the amount of retrievable stories, an empty array will be returned
 * @param type Any of "top" | "new" | "best" | "ask" | "show" | "job"
 * @param offset Offset, with 0 being the newest story
 * @param amount Amount of stories to retrieve
 */
async function getStories(type: HackerNewsStoryType, offset: number = 0, amount: number): Promise<HackerNewsItem[]> {
  let storyIds = await getStoryIds(type);
  if (amount)
    storyIds = storyIds.slice(Math.min(offset, storyIds.length - 1), Math.min(offset + amount, storyIds.length - 1));
  return await Promise.all(storyIds.map((storyId) => getItem(storyId) as unknown as HackerNewsItem));
}

export { getAskStories, getBestStories, getNewStories, getJobStories, getShowStories, getTopStories };
