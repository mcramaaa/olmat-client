"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useLayout } from "@/hooks/zustand/layout";

interface FileUploadDropzoneProps {
  id: string;
  value: File | null;
  preview?: string | null;
  onChange: (file: File | null) => void;
  accept?: string;
  maxSize?: number; // in MB
  className?: string;
  previewClassName?: string;
  placeholder?: {
    title: string;
    description: string;
  };
  showPreview?: boolean;
  isImage?: boolean;
}

export default function FileUpload({
  id,
  value,
  preview,
  onChange,
  accept = "*/*",
  maxSize = 5, // Default 5MB
  className = "",
  previewClassName = "",
  placeholder = {
    title: "Drag & drop or click to upload",
    description: `Upload a file. Max size ${maxSize}KB.`,
  },
  showPreview = true,
  isImage = true,
}: FileUploadDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [fullPreview, setFullPreview] = useState<string | null>(null);
  const { setError } = useLayout();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      validateAndProcessFile(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      validateAndProcessFile(file);
    }
  };

  const validateAndProcessFile = (file: File) => {
    // Check file size
    if (file.size > maxSize * 1024) {
      setError(true, "Maximal ukuran file 200 KB yaa!");
      return;
    }

    // Check file type if accept is specified
    if (accept !== "*/*") {
      const fileType = file.type;
      const acceptTypes = accept.split(",").map((type) => type.trim());

      // Check if file type matches any of the accepted types
      const isAccepted = acceptTypes.some((type) => {
        if (type.includes("/*")) {
          // Handle wildcards like "image/*"
          const typePrefix = type.split("/")[0];
          return fileType.startsWith(`${typePrefix}/`);
        }
        return type === fileType;
      });

      if (!isAccepted) {
        alert("File type not accepted.");
        return;
      }
    }

    onChange(file);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handlePreviewClick = (e: React.MouseEvent) => {
    if (isImage && preview) {
      e.stopPropagation();
      setFullPreview(preview);
    }
  };

  return (
    <>
      <div
        className={`border-2 border-dashed rounded-md p-4 text-center cursor-pointer transition-colors ${
          isDragging
            ? "border-primary bg-primary/5"
            : value
            ? "border-primary"
            : "border-muted"
        } ${className}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() =>
          value && isImage && preview
            ? setFullPreview(preview)
            : inputRef.current?.click()
        }
      >
        {value && showPreview ? (
          <div className="relative">
            {isImage && preview ? (
              <div className="relative mx-auto h-32 w-full max-w-[200px]">
                <Image
                  src={preview || "/placeholder.svg"}
                  alt="Preview"
                  fill
                  sizes="(max-width: 768px) 100vw, 200px"
                  className={`object-contain cursor-pointer ${previewClassName}`}
                  onClick={handlePreviewClick}
                />
              </div>
            ) : (
              <div className="flex items-center justify-center w-full h-20">
                <div className="p-3 rounded-md bg-muted/50">
                  <svg
                    className="w-8 h-8 text-muted-foreground"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
              </div>
            )}
            <p className="mt-2 text-sm">{value.name}</p>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="absolute p-0 rounded-full -top-2 -right-2 h-7 w-7"
              onClick={handleRemove}
            >
              <Trash2 className="w-4 h-4" />
              <span className="sr-only">Remove file</span>
            </Button>
          </div>
        ) : (
          <div className="py-4">
            <p className="text-sm font-medium">{placeholder.title}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {placeholder.description}
            </p>
          </div>
        )}
        <input
          ref={inputRef}
          id={id}
          type="file"
          accept={accept}
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {/* Full Image Preview Dialog */}
      <Dialog
        open={!!fullPreview}
        onOpenChange={(open) => !open && setFullPreview(null)}
      >
        <DialogTitle></DialogTitle>
        <DialogContent className="max-w-3xl">
          <div className="relative flex items-center justify-center w-full h-full">
            {fullPreview && (
              <div className="relative w-full h-[70vh]">
                <Image
                  src={fullPreview || "/placeholder.svg"}
                  alt="Full size preview"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                  className="object-contain"
                />
              </div>
            )}
          </div>
        </DialogContent>
        <DialogDescription></DialogDescription>
      </Dialog>
    </>
  );
}
