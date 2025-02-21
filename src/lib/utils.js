import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function convertToPlainNumber(phoneNumber) {
  return parseInt(phoneNumber.replace(/^\+\d{1,3}/, ""), 10);
}

export const availabilityStatus = {
  AVAILABLE: "available",
  SOLD: "sold",
  PROCESSING: "processing",
};

export const quantityUnits = {
  KILOGRAM: "kg",
  LITRES: "ltr",
};
