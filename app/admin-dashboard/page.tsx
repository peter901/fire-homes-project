import { Breadcrumbs } from "@/components/ui/breadcrumb";

export default function AdminDashboard(){
    return (
        <div>
            <Breadcrumbs items={
                [{label: "Dashboard"}]
            }/>

            <h1 className="text-4xl font-bold mt-6">Admin Dashboard</h1>
        </div>
    )
}