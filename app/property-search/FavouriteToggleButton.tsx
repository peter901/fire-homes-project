"use client";
import { HeartIcon } from "lucide-react";
import { addFavourite, removeFavourite } from "./actions";
import { useAuth } from "@/context/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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
          router.push("/login");
          return;
        }
        if (isFavourite) {
          await removeFavourite(propertyId, tokenResult.token);
          toast("Removed", { description: "Item removed from favourite" });
        } else {
          await addFavourite(propertyId, tokenResult.token);
          toast("Added", { description: "Item added to favourites" });
        }
        router.refresh();
      }}
    >
      <HeartIcon className="text-black" fill={isFavourite ? "red" : "white"} />
    </button>
  );
}
