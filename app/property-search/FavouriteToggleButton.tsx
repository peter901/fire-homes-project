"use client";
import { HeartIcon } from "lucide-react";
import { addFavourite } from "./actions";
import { useAuth } from "@/context/auth";
import { useRouter } from "next/navigation";

export default function FavouriteToggleButton({
  propertyId,
  isFavourite,
}: {
  propertyId: string;
  isFavourite: boolean;
}) {
  const auth = useAuth();
  const router = useRouter();
  return (
    <button
      type="button"
      className="absolute top-0 right-0 z-10 p-2 bg-white rounded-bl-lg"
      onClick={async () => {
        const tokenResult = await auth?.currentUser?.getIdTokenResult();
        if (!tokenResult) {
          return;
        }
        await addFavourite(propertyId, tokenResult.token);
        router.refresh();
      }}
    >
      <HeartIcon className="text-black" fill={isFavourite ? "blue" : "white"} />
    </button>
  );
}
