"use server";

import { auth, firestore } from "@/firebase/server";
import { propertyDataSchema } from "@/validation/propertySchema";

export const createProperty = async (
  data: {
    address1: string;
    address2?: string;
    city: string;
    postcode: string;
    description: string;
    price: number;
    bedrooms: number;
    bathrooms: number;
    status: "for-sale" | "draft" | "withdrawn" | "sold";
  },
  authToken: string
) => {
  const { ...propertyData } = data;
  const verifiedToken = await auth.verifyIdToken(authToken);

  if (!verifiedToken.admin) {
    return {
      error: true,
      message: "Unauthorized",
    };
  }

  const validation = propertyDataSchema.safeParse(propertyData);

  if (!validation.success) {
    return {
      error: true,
      message: validation.error.issues[0]?.message ?? "An error occurred",
    };
  }

  const property = await firestore
    .collection("properties")
    .add({ ...propertyData, created: new Date(), updated: new Date() });

  return {
    propertyId: property.id,
  };
};
