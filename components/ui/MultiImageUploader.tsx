"use client";

import type React from "react";
import { useRef } from "react";
import { Button } from "./button";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import Image from "next/image";

export type ImageUpload = {
  id: string;
  url: string;
  file?: File;
};

export default function MultiImageUploader({
  images = [],
  onImagesChange,
}: {
  images?: ImageUpload[];
  onImagesChange: (images: ImageUpload[]) => void;
}) {
  const uploadInputRef = useRef<HTMLInputElement | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    const newImages = files.map((file, index) => {
      return {
        id: `${Date.now()}-${index}-${file.name}`,
        url: URL.createObjectURL(file),
        file,
      };
    });

    onImagesChange([...images, ...newImages]);
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
      <Button
        className="w-full"
        variant="outline"
        type="button"
        onClick={() => uploadInputRef?.current?.click()}
      >
        Upload images
      </Button>
      <DragDropContext onDragEnd={() => {}}>
        <Droppable droppableId="property-images" direction="vertical">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {images.map((image, index) => (
                <Draggable key={image.id} draggableId={image.id} index={index}>
                  {(provided) => (
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      className="relative p-2"
                    >
                      <div className="bg-gray-100 rounded-lg flex items-center">
                        <div className="size-16">
                          <Image
                            src={image.url}
                            alt=""
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
