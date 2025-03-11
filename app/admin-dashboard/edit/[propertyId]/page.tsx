import { Breadcrumbs } from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPropertyById } from "@/data/properties";
import NewPropertyForm from "../../new/NewPropertyForm";

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
          <NewPropertyForm />
        </CardContent>
      </Card>
    </div>
  );
}
