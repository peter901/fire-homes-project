"use client";
import PropertyForm from "@/components/ui/PropertyForm";
import type { infer as zodInfer } from "zod";
import type { propertyDataSchema } from "@/validation/propertySchema";


export default function NewPropertyForm() {
    const handleSubmit = async (data: zodInfer<typeof propertyDataSchema>) =>{}
  return (
    <div>
      <PropertyForm handleSubmit={handleSubmit} />
    </div>
  );
}
