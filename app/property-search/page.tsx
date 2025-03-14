import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FiltersForm from "./FiltersForm";
import { Suspense } from "react";
import { getProperties } from "@/data/properties";

export default async function PropertySearch({
  searchParams,
}: {
  searchParams: Promise<{
    minPrice: string;
    maxPrice: string;
    minBedrooms: string;
    page: string;
  }>;
}) {
  const searchParamValues = await searchParams;

  const parsedPage = Number.parseInt(searchParamValues.page);
  const parsedMinPrice = Number.parseInt(searchParamValues.minPrice);
  const parsedMinBedrooms = Number.parseInt(searchParamValues.minBedrooms);
  const parsedMaxPrice = Number.parseInt(searchParamValues.maxPrice);

  const page = Number.isNaN(parsedPage) ? 1 : parsedPage;
  const minPrice = Number.isNaN(parsedMinPrice) ? null : parsedMinPrice;
  const minBedrooms = Number.isNaN(parsedMinBedrooms)
    ? null
    : parsedMinBedrooms;
  const maxPrice = Number.isNaN(parsedMaxPrice) ? null : parsedMaxPrice;

  const properties = await getProperties({
    filters: {
      minPrice,
      maxPrice,
      minBedrooms,
      status: ["for-sale"],
    },
    pagination: {
      page,
    },
  });

  return (
    <div className="max-w-screen-lg mx-auto">
      <h1 className="text-4xl font-bold p-5">Property Search</h1>

      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense>
            <FiltersForm />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
