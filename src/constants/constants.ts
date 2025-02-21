import { FarmType, Unit } from "@/types";

export const brandName: string = "BRAND NAME";
export const tagLine: string = "AN EYE CATHCING TAGLINE NEEDED!";

export const navbarItems = [
  {
    title: "Home",
    route: "/",
  },
  {
    title: "About",
    route: "/about",
  },
  {
    title: "Our Services",
    route: "/our-services",
  },
  {
    title: "Contact Us",
    route: "/contact-us",
  },
];

export const units: Unit[] = [
  { name: "Square Feet", value: "sq.ft" },
  { name: "Square Yard", value: "sq.yd" },
  { name: "Square Meter", value: "sq.mt" },
  { name: "Gaz", value: "gaz" },
  { name: "Marla", value: "marla" },
  { name: "Acre", value: "acre" },
  { name: "Bigha", value: "bigha" },
];

export const farmTypes: FarmType[] = [
  { name: "Organic", value: "Organic" },
  { name: "Non-Organic", value: "Non-Organic" },
];
