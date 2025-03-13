"use client";
import PropertyForm from "@/components/ui/PropertyForm";
import type { infer as zodInfer } from "zod";
import type { propertySchema } from "@/validation/propertySchema";
import { PlusCircleIcon } from "lucide-react";
import { useAuth } from "@/context/auth";
import { saveNewProperty } from "./actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function NewPropertyForm() {
  const auth = useAuth();
  const router = useRouter();

  const handleSubmit = async (data: zodInfer<typeof propertySchema>) => {
    const authToken = await auth?.currentUser?.getIdToken();

    if (!authToken) {
      return;
    }
    const response = await saveNewProperty({ ...data}, authToken );

    if (response.error) {
      toast("Error!", { description: response.message });
      return;
    }

    if (!response.error) {
      toast("Success!", { description: "New Property Created" });
    }

    router.push("/admin-dashboard");
  };
  return (
    <div>
      <PropertyForm
        handleSubmit={handleSubmit}
        submitButtonLabel={
          <>
            <PlusCircleIcon /> Create Property
          </>
        }
      />
    </div>
  );
}
