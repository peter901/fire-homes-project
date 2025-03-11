"use client";

import PropertyForm from "@/components/ui/PropertyForm";
import type { Property } from "@/types/property";
import type { propertyDataSchema } from "@/validation/propertySchema";
import { SaveIcon } from "lucide-react";
import type { infer as zodInfer } from "zod";
import { useAuth } from "@/context/auth";
import { useRouter } from "next/navigation";
import { updateProperty } from "./actions";
import { toast } from "sonner";

export default function EditPropertyFrom({
  id,
  address1,
  address2,
  city,
  bedrooms,
  bathrooms,
  description,
  postcode,
  price,
  status,
}: Property) {
    const auth = useAuth();
    const router = useRouter();

  const handleSubmit = async (data: zodInfer<typeof propertyDataSchema>) => {
    const authToken = await auth?.currentUser?.getIdToken();

    if (!authToken) {
      return;
    }
    await updateProperty({...data, id}, authToken);

    toast("Success!", { description: "Property Edited" });
    
    router.push("/admin-dashboard");
  };

  return (
    <div>
      <PropertyForm
        handleSubmit={handleSubmit}
        submitButtonLabel={
          <>
            <SaveIcon /> Save Property
          </>
        }
        defaultValues={{
          address1,
          address2,
          city,
          bedrooms,
          bathrooms,
          description,
          postcode,
          price,
          status,
        }}
      />
    </div>
  );
}
