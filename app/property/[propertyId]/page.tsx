import { Button } from "@/components/ui/button";
import PropertyStatusBadge from "@/components/ui/property-badge";
import { getPropertyById } from "@/data/properties";
import { ArrowLeftIcon, BathIcon, BedIcon } from "lucide-react";
import numeral from "numeral";
import ReactMarkDown from "react-markdown";

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ propertyId: string }>;
}) {
  const property = await getPropertyById((await params).propertyId);

  const addressLines = [
    property.address1,
    property.address2,
    property.city,
    property.postcode,
  ].filter((addressLines) => addressLines);

  return (
    <div className="grid grid-cols-[1fr_500px]">
      <div>
        <div className="property-descrition max-w-screen-md mx-auto py-10 px-4">
          <Button>
            <ArrowLeftIcon /> Back
          </Button>
          <ReactMarkDown>{property.description}</ReactMarkDown>
        </div>
      </div>
      <div className="bg-sky-200 h-screen p-10 sticky top-0 grid ">
        <div className="flex flex-col gap-10 w-full">
          <PropertyStatusBadge status={property.status} className="mr-auto text-base" />
          <h1 className="text-4xl font-semibold">
            {addressLines.map((addressLine, i)=>(
              <div key={addressLine}>
                {addressLine}
                {i < addressLines.length -1 && ","}
              </div>
            ))}
          </h1>
          <h2 className="text-3xl font-light">
            Ugx {numeral(property.price).format("0,0")}
          </h2>
          <div className="flex gap-10">
            <div className="flex gap-2">
              <BedIcon /> {property.bedrooms} Bedrooms
            </div>
            <div className="flex gap-2">
              <BathIcon /> {property.bathrooms} Bathrooms
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
