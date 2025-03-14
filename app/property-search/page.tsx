import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FiltersForm from "./FiltersForm";
import { Suspense } from "react";
import { getProperties } from "@/data/properties";
import Image from "next/image";
import imageUrlFormatter from "@/lib/imageUrlFormatter";
import { BathIcon, BedIcon, HomeIcon } from "lucide-react";
import numeral from "numeral";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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

  const { data, totalPages } = await getProperties({
    filters: {
      minPrice,
      maxPrice,
      minBedrooms,
      status: ["for-sale"],
    },
    pagination: {
      page,
      pageSize: 3,
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
      <div className="grid grid-cols-3 mt-5 gap-4">
        {data.map((property) => {
          const addressLines = [
            property.address1,
            property.address2,
            property.city,
            property.postcode,
          ]
            .filter((addressLines) => addressLines)
            .join(", ");

          return (
            <Card key={property.id} className="overflow-hidden">
              <CardContent className="px-0 pb-0">
                <div className="h-40 relative bg-sky-50 text-zinc-400 flex flex-col justify-center items-center">
                  {property.images?.[0] && (
                    <Image
                      fill
                      className="object-cover"
                      src={imageUrlFormatter(property.images[0])}
                      alt=""
                    />
                  )}
                  {property.images?.[0] && (
                    <>
                      <HomeIcon />
                      <small>No image</small>
                    </>
                  )}
                </div>
                <div className="flex flex-col gap-5 p-5">
                  <p>{addressLines}</p>
                  <div className="flex gap-5">
                    <div className="flex gap-2">
                      <BedIcon /> {property.bedrooms}
                    </div>
                    <div className="flex gap-2">
                      <BathIcon /> {property.bathrooms}
                    </div>
                  </div>
                  <p className="text-2xl">
                    UGX. {numeral(property.price).format("0,0")}
                  </p>
                  <Button asChild>
                    <Link href={`/property/${property.id}`}>View Property</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <div className="flex gap-2 items-center justify-center">
        {Array.from({ length: totalPages }).map((_, i) => {
          const pageKey = `page-${i + 1}`;

          const newSearchParams = new URLSearchParams();

          if (searchParamValues?.minPrice) {
            newSearchParams.set("minPrice", searchParamValues.minPrice);
          }

          if (searchParamValues?.maxPrice) {
            newSearchParams.set("maxPrice", searchParamValues.maxPrice);
          }

          if (searchParamValues?.minBedrooms) {
            newSearchParams.set("minBedrooms", searchParamValues.minBedrooms);
          }

          newSearchParams.set("page", `${i + 1}`);

          return (
            <Button
              asChild={page !== i + 1}
              key={pageKey}
              disabled={page === i + 1}
              variant="outline"
              className="mx-1 mt-5 mb-40"
            >
              <Link href={`/property-search?${newSearchParams.toString()}`}>{i + 1}</Link>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
