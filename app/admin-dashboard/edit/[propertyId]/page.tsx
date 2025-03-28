import { Breadcrumbs } from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPropertyById } from "@/data/properties";
import EditPropertyFrom from "./EditPropertyFrom";

export default async function EditProperty({
  params,
}: {
  params: Promise<{ propertyId: string }>;
}) {
  const property = await getPropertyById((await params).propertyId);

  return (
    <div>
      <Breadcrumbs
        items={[
          {
            href: "/admin-dashboard",
            label: "Dashboard",
          },
          {
            label: "Edit Property",
          },
        ]}
      />

      <Card className="mt-5">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Edit Property</CardTitle>
        </CardHeader>
        <CardContent>
          <EditPropertyFrom
            id={property.id}
            address1={property.address1}
            address2={property.address2}
            city={property.city}
            price={property.price}
            postcode={property.postcode}
            description={property.description}
            bedrooms={property.bedrooms}
            bathrooms={property.bathrooms}
            status={property.status}
            images={property.images || []}
          />
        </CardContent>
      </Card>
    </div>
  );
}
