import { getNewStories } from '@/lib/hn';
import FetchingList from './_fetchingList';

const AMOUNT = 20;

export default async function New() {
  return (
    <div>
      <h1 className="text-2xl">New</h1>
      <FetchingList items={await getNewStories(0, AMOUNT)} />
    </div>
  );
}
