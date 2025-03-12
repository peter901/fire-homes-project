"use client";

import React, { useRef } from "react";
import { Button } from "./button";

export type ImageUpload = {
  id: string;
  url: string;
  file?: File;
};

export default function MultiImageUploader({
  images,
  onImagesChange,
}: {
  images?: ImageUpload[];
  onImagesChange: (images: ImageUpload[]) => void;
}) {
  const uploadInputRef = useRef<HTMLInputElement | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    console.log(files);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 ">
      <input
        className="hidden"
        ref={uploadInputRef}
        onChange={handleInputChange}
        type="file"
        multiple
        accept="image/*"
      />
      <Button type="button" onClick={() => uploadInputRef?.current?.click()}>
        Upload images
      </Button>
    </div>
  );
}
