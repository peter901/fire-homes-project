"use client";
import PropertyForm from "@/components/ui/PropertyForm";
import type { infer as zodInfer } from "zod";
import type { propertySchema } from "@/validation/propertySchema";
import { PlusCircleIcon } from "lucide-react";
import { useAuth } from "@/context/auth";
import { createProperty } from "./actions";
import { savePropertiesImage } from "../actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ref, uploadBytesResumable } from "firebase/storage";
import type { UploadTask } from "firebase/storage";
import { storage } from "@/firebase/client";

export default function NewPropertyForm() {
  const auth = useAuth();
  const router = useRouter();

  const handleSubmit = async (data: zodInfer<typeof propertySchema>) => {
    const authToken = await auth?.currentUser?.getIdToken();

    if (!authToken) {
      return;
    }

    const { images, ...rest } = data;
    const response = await createProperty(rest, authToken);

    if (response.error || !response.propertyId) {
      toast("Error!", { description: response.message });
      return;
    }

    const uploadTasks: UploadTask[] = [];
    const paths: string[] = [];

    images.forEach((image, index) => {
      if (image.file) {
        const path = `properties/${
          response.propertyId
        }/${Date.now()}-${index}-${image.file.name}`;
        paths.push(path);
        const storageRef = ref(storage, path);
        uploadTasks.push(uploadBytesResumable(storageRef, image.file));
      }
    });

    await Promise.all(uploadTasks);

    await savePropertiesImage(
      { propertyId: response.propertyId, images: paths },
      authToken
    );

    toast("Success!", { description: "New Property Created" });

    router.push("/admin-dashboard");
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
