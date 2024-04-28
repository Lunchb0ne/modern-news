import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default async function Component() {
  return Array.from({ length: 10 }).map((_, index) => (
    <Card key={index} className="my-4 w-full max-w-md md:max-w-xl">
      <CardContent className="grid gap-2 p-4 text-sm">
        <div className="space-y-0.5">
          <Skeleton className="h-4 w-[200px]" />
          <div className="flex items-center space-x-2">
            <Skeleton className="h-3 w-[100px]" />
            <Skeleton className="h-3 w-[80px]" />
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <Skeleton className="h-3 w-[100px]" />
        </div>
      </CardContent>
      <CardFooter className="border-t p-4">
        <div className="flex items-center space-x-2 text-sm">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-8" />
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-[50px]" />
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-[50px]" />
        </div>
      </CardFooter>
    </Card>
  ));
}
