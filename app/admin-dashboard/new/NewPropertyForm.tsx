"use client";
import PropertyForm from "@/components/ui/PropertyForm";
import type { infer as zodInfer } from "zod";
import type { propertyDataSchema } from "@/validation/propertySchema";
import { PlusCircleIcon } from "lucide-react";

export default function NewPropertyForm() {
  const handleSubmit = async (data: zodInfer<typeof propertyDataSchema>) => {
    console.log(data)
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
