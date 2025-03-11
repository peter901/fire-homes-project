"use client";

import PropertyForm from "@/components/ui/PropertyForm";
import type { Property } from "@/types/property";
import type { propertyDataSchema } from "@/validation/propertySchema";
import type { infer as zodInfer } from "zod";

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
  const handleSubmit = async (data: zodInfer<typeof propertyDataSchema>) => {};

  return (
    <div>
      <PropertyForm
        handleSubmit={handleSubmit}
        submitButtonLabel="Edit Property"
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
