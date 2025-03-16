import { Breadcrumbs } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import PropertyStatusBadge from "@/components/ui/property-badge";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getUserFavourites } from "@/data/favourites";
import { getPropertyById } from "@/data/properties";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import RemoveFavouriteButton from "./RemoveFavouriteButton";

export default async function Favourites({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const searchParamsValue = await searchParams;
  const page = searchParamsValue?.page
    ? Number.parseInt(searchParamsValue.page)
    : 1;
  const pageSize = 2;
  const favourties = await getUserFavourites();
  const allFavourites = Object.keys(favourties);
  const totalPages = Math.ceil(allFavourites.length / pageSize);

  const paginatedFavourites = allFavourites.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const properties = await Promise.all(
    paginatedFavourites.map(getPropertyById)
  );

  return (
    <div>
      <Breadcrumbs
        items={[{ href: "account", label: "Account" }, { label: "Favourites" }]}
      />

      <h1 className="text-4xl font-bold mt-6">My Favourites</h1>
      {!properties.length && (
        <h2 className="text-center text-zinc-400 text-3xl font-bold mt-14">
          You have no favourited properties
        </h2>
      )}
      {properties.length > 0 && (
        <Table className="mt-5">
          <TableHeader>
            <TableRow>
              <TableHead>Address</TableHead>
              <TableHead>Listing Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {properties.map((property) => {
              const address = [
                property.address1,
                property.address2,
                property.city,
                property.postcode,
              ]
                .filter((addressLine) => !!addressLine)
                .join(", ");

              return (
                <TableRow key={property.id}>
                  <TableCell>{address}</TableCell>
                  <TableCell>{property.price}</TableCell>
                  <TableCell>
                    <PropertyStatusBadge status={property.status} />
                  </TableCell>
                  <TableCell className="flex gap-1 justify-end">
                    <Button asChild variant="outline">
                      <Link href={`/property/${property.id}`}>
                        <EyeIcon />
                      </Link>
                    </Button>
                    <RemoveFavouriteButton propertyId={property.id} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <Button
                    disabled={page === i + 1}
                    key={`page-button-${page}-${i}-${new Date().getTime()}`}
                    asChild={page !== i + 1}
                    variant="outline"
                    className="mx-1"
                  >
                    <Link href={`/account/favourites?page=${i + 1}`}>
                      {i + 1}
                    </Link>
                  </Button>
                ))}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      )}
    </div>
  );
}
