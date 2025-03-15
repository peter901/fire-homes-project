"use client";
import { HeartIcon } from "lucide-react";
import { addFavourite } from "./actions";
import { useAuth } from "@/context/auth";

export default function FavouriteToggleButton({
  propertyId,
}: {
  propertyId: string;
}) {
  const auth = useAuth();
  return (
    <button
      type="button"
      className="absolute top-0 right-0 z-10 p-2"
      onClick={async () => {
        const tokenResult = await auth?.currentUser?.getIdTokenResult();
        if (!tokenResult) {
          return;
        }
        await addFavourite(propertyId, tokenResult.token);
      }}
    >
      <HeartIcon />
    </button>
  );
}
