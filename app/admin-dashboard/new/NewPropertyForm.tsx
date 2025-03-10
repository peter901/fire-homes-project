"use client";
import PropertyForm from "@/components/ui/PropertyForm";
import type { infer as zodInfer } from "zod";
import type { propertyDataSchema } from "@/validation/propertySchema";
import { PlusCircleIcon } from "lucide-react";
import { useAuth } from "@/context/auth";
import { saveNewProperty } from "./actions";
import { toast } from "sonner";

export default function NewPropertyForm() {
  const auth = useAuth();

  const handleSubmit = async (data: zodInfer<typeof propertyDataSchema>) => {
    const token = await auth?.currentUser?.getIdToken();

    if (!token) {
      return;
    }
    const response = await saveNewProperty({ ...data, token });

    if (!response.error) {
      toast("Success!", { description: "New Property Created" });
    }

    console.log(response);
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
