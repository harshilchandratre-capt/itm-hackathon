import { compressImages } from "@/lib/utils";
import storageServices from "@/services/storageServices";
import { X } from "lucide-react";
import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { toast } from "sonner"; // Assuming you're using Sonner for notifications
import { Button } from "../ui/button";

interface Props {
  setImageUrls: Dispatch<SetStateAction<string[]>>;
}

const InputImageAndPreview: React.FC<Props> = ({ setImageUrls }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [imagesForPreview, setImagesForPreview] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;

    if (!files || files.length === 0) {
      toast.error("No files selected");
      return;
    }

    try {
      setIsProcessing(true);

      // Convert FileList to Array
      const fileArray = Array.from(files);

      // Validate file types and sizes
      const invalidFiles = fileArray.filter((file) => {
        if (!file.type.startsWith("image/")) {
          toast.error(
            `Invalid file type: ${file.name}. Please select image files only.`
          );
          return true;
        }
        if (file.size > 10 * 1024 * 1024) {
          // 10MB limit
          toast.error(`File too large: ${file.name}. Max file size is 10MB.`);

          return true;
        }
        return false;
      });

      if (invalidFiles.length > 0) {
        return;
      }

      // Compress images and convert back to File
      const compressedFiles = await compressImages(fileArray);
      const compressedFileObjects = compressedFiles.map(
        (blob, index) =>
          new File([blob], fileArray[index].name, {
            type: fileArray[index].type,
            lastModified: Date.now(),
          })
      );

      // Create object URLs for compressed images
      const newImageUrls = compressedFileObjects.map((file) =>
        URL.createObjectURL(file)
      );

      console.log("Original files:", fileArray);
      console.log("Compressed files:", compressedFileObjects);

      // Update images state
      setImageFiles((prev) => [...prev, ...compressedFileObjects]);
      setImagesForPreview((prevImages) => [...prevImages, ...newImageUrls]);

      toast.success(
        `Successfully added ${compressedFileObjects.length} image(s)`,
        { style: { color: "#12723D" } }
      );
    } catch (error) {
      console.error("Error processing images:", error);
      toast.error("Failed to process images. Please try again.");
    } finally {
      setIsProcessing(false);

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };
  const removeImage = (imageToRemove: string) => {
    // Find the index of the image to remove
    const indexToRemove = imagesForPreview.indexOf(imageToRemove);

    // Revoke object URL to prevent memory leaks
    URL.revokeObjectURL(imageToRemove);

    // Remove the image from preview URLs
    setImagesForPreview((prevImages) =>
      prevImages.filter((image) => image !== imageToRemove)
    );

    // Remove the corresponding file from imageFiles
    if (indexToRemove !== -1) {
      setImageFiles((prevFiles) =>
        prevFiles.filter((_, index) => index !== indexToRemove)
      );
    }
  };

  const handleUpload = async () => {
    if (imageFiles.length === 0) {
      toast.error("No images to upload");
      return;
    }

    try {
      setIsProcessing(true);
      const uploadedUrls = await storageServices.uploadFiles(imageFiles);

      // Update parent component's image URLs if needed
      setImageUrls((prevUrls) => [...prevUrls, ...uploadedUrls]);

      // Clear local state after successful upload
      // setImagesForPreview([]);
      setImageFiles([]);

      toast.success(`Successfully uploaded ${uploadedUrls.length} image(s)`);
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Failed to upload images. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        multiple
        accept="image/*"
        className="hidden"
      />
      <Button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        disabled={isProcessing}
        className="bg-primaryColor1 text-white rounded text-sm disabled:opacity-50"
      >
        {imagesForPreview.length === 0 ? "Select Images" : "Add More"}
      </Button>

      {imagesForPreview.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          {imagesForPreview.map((imageUrl, index) => (
            <div key={index} className="relative">
              <img
                src={imageUrl}
                alt={`Preview ${index + 1}`}
                className="size-[100px] object-cover rounded"
              />
              <Button
                type="button"
                size="icon"
                onClick={() => removeImage(imageUrl)}
                className="absolute top-1 right-1 bg-primaryColor1"
              >
                <X />
              </Button>
            </div>
          ))}
        </div>
      )}

      {imagesForPreview.length > 0 && (
        <Button
          type="button"
          onClick={handleUpload}
          disabled={isProcessing}
          className="bg-primaryColor1 text-white rounded text-sm disabled:opacity-50"
        >
          {isProcessing ? "Uploading..." : "Upload"}
        </Button>
      )}
    </div>
  );
};

export default InputImageAndPreview;
