import { Button } from "@/components/ui/button";
import { getPropertyById } from "@/data/properties";
import { ArrowLeftIcon } from "lucide-react";
import ReactMarkDown from "react-markdown";

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ propertyId: string }>;
}) {
  const property = await getPropertyById((await params).propertyId);

  return (
    <div className="grid grid-cols-[1fr_400px]">
      <div>
        <div className="property-descrition max-w-screen-md mx-auto py-10 px-4">
          <Button>
            <ArrowLeftIcon /> Back
          </Button>
          <ReactMarkDown>{property.description}</ReactMarkDown>
        </div>
      </div>
      <div className="bg-sky-200 h-screen sticky">property details</div>
    </div>
  );
}
