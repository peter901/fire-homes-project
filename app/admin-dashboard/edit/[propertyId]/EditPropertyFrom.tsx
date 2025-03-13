"use client";

import PropertyForm from "@/components/ui/PropertyForm";
import type { Property } from "@/types/property";
import type { propertySchema } from "@/validation/propertySchema";
import { SaveIcon } from "lucide-react";
import type { infer as zodInfer } from "zod";
import { useAuth } from "@/context/auth";
import { useRouter } from "next/navigation";
import { updateProperty } from "./actions";
import { toast } from "sonner";
import { deleteObject, ref, uploadBytesResumable } from "firebase/storage";
import type { UploadTask } from "firebase/storage";
import { storage } from "@/firebase/client";
import { savePropertiesImage } from "../../new/actions";

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
  images = [],
}: Property) {
  const auth = useAuth();
  const router = useRouter();

  const handleSubmit = async (data: zodInfer<typeof propertySchema>) => {
    const authToken = await auth?.currentUser?.getIdToken();

    if (!authToken) {
      return;
    }

    const { images: newImages, ...rest } = data;

    const response = await updateProperty({ ...rest, id }, authToken);

    if (response?.error) {
      toast("Error!", { description: response.message });
      return;
    }

    const storageTasks: (UploadTask | Promise<void>)[] = [];

    const imagesToDelete = images.filter(
      (image) => !newImages.find((newImage) => image === newImage.url)
    );

    for (const image of imagesToDelete) {
      storageTasks.push(deleteObject(ref(storage, image)));
    }

    const paths: string[] = [];

    newImages.forEach((image, index) => {
      if (image.file) {
        const path = `properties/${id}/${Date.now()}-${index}-${
          image.file.name
        }`;
        paths.push(path);
        const storageRef = ref(storage, path);
        storageTasks.push(uploadBytesResumable(storageRef, image.file));
      } else {
        paths.push(image.url);
      }
    });

    await Promise.all(storageTasks);

    await savePropertiesImage({ propertyId: id, images: paths }, authToken);

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
          images: images.map((image) => ({
            id: image,
            url: image,
          })),
        }}
      />
    </div>
  );
}
