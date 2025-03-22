import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PropertySearchSkeleton() {
  return (
    <div className="max-w-screen-lg mx-auto">
      <h1 className="text-4xl font-bold p-5">Property Search</h1>

      {/* Filters Skeleton */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 animate-pulse">
            <div className="h-4 bg-gray-300 rounded w-1/2" />
            <div className="h-4 bg-gray-300 rounded w-3/4" />
            <div className="h-4 bg-gray-300 rounded w-2/3" />
          </div>
        </CardContent>
      </Card>

      {/* Properties Skeleton Grid */}
      <div className="grid grid-cols-3 mt-5 gap-4">
        {Array.from({ length: 6 }).map(() => (
          <Card key={crypto.randomUUID()} className="overflow-hidden animate-pulse">
            <CardContent className="px-0 pb-0">
              <div className="h-40 bg-gray-200 flex justify-center items-center">
                <div className="w-16 h-16 bg-gray-300 rounded-full" />
              </div>
              <div className="flex flex-col gap-4 p-5">
                <div className="h-4 bg-gray-300 rounded w-3/4" />
                <div className="flex gap-5">
                  <div className="h-4 bg-gray-300 rounded w-12" />
                  <div className="h-4 bg-gray-300 rounded w-12" />
                </div>
                <div className="h-6 bg-gray-300 rounded w-1/2" />
                <div className="h-10 bg-gray-300 rounded w-full" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination Skeleton */}
      <div className="flex gap-2 items-center justify-center py-10 animate-pulse">
        {Array.from({ length: 3 }).map(() => (
          <div key={crypto.randomUUID()} className="h-10 w-10 bg-gray-300 rounded" />
        ))}
      </div>
    </div>
  );
}