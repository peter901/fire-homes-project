import { Breadcrumbs } from "@/components/ui/breadcrumb";

export default function AdminDashboard(){
    return (
        <div>
            <Breadcrumbs items={
                [{label: "Dashboard"}]
            }/>
        </div>
    )
}