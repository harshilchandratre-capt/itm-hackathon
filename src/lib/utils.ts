import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import imageCompression from "browser-image-compression";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getAuthErrorByCode = ({
  errorCode,
}: {
  errorCode: number;
}): string => {
  switch (errorCode) {
    case 400:
      return "Request Timed out. Try again!";
    case 401:
      return "Incorrect OTP! Try again!";
    default:
      return "Something went wrong. Try again!";
  }
};

export const compressImages = async (images: File[]): Promise<File[]> => {
  try {
    // Use Promise.all to compress images concurrently and wait for all to complete
    const compressedImages = await Promise.all(
      images.map(async (file) => {
        return await imageCompression(file, {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        });
      })
    );

    console.log("from compressed imagwes", compressedImages);
    return compressedImages;
  } catch (error) {
    console.error("Image compression error:", error);
    throw error;
  }
};
