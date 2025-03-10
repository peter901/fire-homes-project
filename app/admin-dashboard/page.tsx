import { Breadcrumbs } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { getProperties } from "@/data/properties";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  const data = await getProperties();

  return (
    <div>
      <Breadcrumbs items={[{ label: "Dashboard" }]} />

      <h1 className="text-4xl font-bold mt-6">Admin Dashboard</h1>

      <Button asChild className="inline-flex pl-2 gap-2 mt-4">
        <Link href="/admin-dashboard/new">
          <PlusCircle /> New Property
        </Link>
      </Button>
    </div>
  );
}
