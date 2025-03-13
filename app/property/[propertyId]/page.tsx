import { getPropertyById } from "@/data/properties";
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
        <ReactMarkDown>{property.description}</ReactMarkDown>
      </div>
      <div className="bg-sky-200 h-screen sticky">property details</div>
    </div>
  );
}
