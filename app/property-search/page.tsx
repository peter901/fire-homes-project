import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PropertySearch() {
  return (
    <div className="max-w-screen-lg mx-auto">
      <h1 className="text-4xl font-bold p-5">Property Search</h1>

      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
            Filters
        </CardContent>
      </Card>
    </div>
  );
}
