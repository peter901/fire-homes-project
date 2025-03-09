"use client";

import { propertyDataSchema } from "@/validation/propertySchema";
import { useForm } from "react-hook-form";
import type { infer as zodInfer } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "./form";
import { Select } from "./select";

type Props = {
  handleSubmit: (data: zodInfer<typeof propertyDataSchema>) => void;
};

export default function PropertyForm({ handleSubmit }: Props) {
  const form = useForm<zodInfer<typeof propertyDataSchema>>({
    resolver: zodResolver(propertyDataSchema),
    defaultValues: {
      address1: "",
      address2: "",
      city: "",
      postcode: "",
      price: 0,
      bedrooms: 0,
      status: "draft",
      description: "",
    },
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="grid grid-cols-2">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value} >

                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
}
