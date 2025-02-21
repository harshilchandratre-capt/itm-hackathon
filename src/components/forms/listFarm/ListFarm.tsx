import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import useMultipleForm from "@/hooks/useMultipleForm";
import { FarmData } from "@/types";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { FormEvent, useState } from "react";
import AdditionalDetailsForm from "./subForms/AdditionalForm";
import LandRelatedForm from "./subForms/LandRelatedForm";
import LocationRelatedForm from "./subForms/LocationRelatedForm";
import OverviewForm from "./subForms/OverviewForm";
import { toast } from "sonner";
import dbServices from "@/services/dbServices";

const INITIAL_DATA: FarmData = {
  listingId: "",
  isVerified: false,
  title: "",
  media: [],
  area: "",
  areaUnit: "",
  ownership: "",
  description: "",
  farmType: "Non-Organic",
  suitableCrops: [],
  soilType: "",
  location: "",
  address: "",
  city: "",
  state: "",
  pinCode: "",
  landmarks: "",
  duration: "",
  price: 0,
  waterAvailable: false,
  electricityAvailable: false,
  isIrrigated: false,
  boundaryWall: false,
  numOfSidesOpen: 0,
  labourProvided: false,
  labourCost: "",
};

const ListFarm = () => {
  const [data, setData] = useState(INITIAL_DATA);

  const updateField = (fields: Partial<FarmData>) => {
    setData((prev) => ({ ...prev, ...fields }));
  };

  const {
    currentStep,
    currentStepIndex,
    steps,
    isFirstStep,
    isLastStep,
    next,
    prev,
    goTo,
  } = useMultipleForm({
    steps: [
      <OverviewForm key="overview" {...data} updateField={updateField} />,
      <LocationRelatedForm
        key="location"
        {...data}
        updateField={updateField}
      />,
      <LandRelatedForm key="land" {...data} updateField={updateField} />,
      <AdditionalDetailsForm
        key="additional"
        {...data}
        updateField={updateField}
      />,
    ],
  });
  console.log(data);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    isLastStep ? handleFinalSubmit() : next();
  };

  const handleFinalSubmit = () => {
    console.log("Final submitted data:", data);

    try {
      dbServices.addFarmToDb(data);
    } catch (error) {
      toast.error("Error while listing farm. Try again", { duration: 1500 });
    }
  };

  const stepTitles = ["Overview", "Location", "Land", "Additional"];

  return (
    <div className="h-full bg-gray-100 flex flex-col">
      <Card className="flex flex-col flex-1 w-full max-w-full  shadow-none rounded-none">
        <CardHeader className="bg-green-50 border-b p-4 sm:p-6">
          <CardTitle className="text-xl sm:text-2xl font-bold text-green-800 text-center">
            List Your Farm
          </CardTitle>
          <div className="flex justify-center items-center space-x-2 sm:space-x-4 mt-2 overflow-x-auto">
            {stepTitles.map((title, index) => (
              <div
                key={title}
                className={`flex items-center flex-shrink-0 ${
                  index <= currentStepIndex
                    ? "text-green-600 font-semibold"
                    : "text-gray-400"
                }`}
              >
                <span
                  className={`mr-1 sm:mr-2 rounded-full h-5 w-5 sm:h-6 sm:w-6 flex items-center justify-center text-xs sm:text-sm ${
                    index <= currentStepIndex ? "bg-green-100" : "bg-gray-100"
                  }`}
                >
                  {index + 1}
                </span>
                <span className="text-xs sm:text-sm">{title}</span>
              </div>
            ))}
          </div>
        </CardHeader>
        <CardContent className="flex flex-col flex-1 p-4 sm:p-6 overflow-hidden">
          <Progress
            value={((currentStepIndex + 1) / steps.length) * 100}
            className="mb-4 sm:mb-6"
          />

          <form
            onSubmit={handleSubmit}
            className="flex flex-col flex-1 overflow-hidden"
          >
            <div className="flex-1 overflow-y-auto pr-2 mb-4">
              {currentStep}
            </div>

            <div className="flex justify-between items-center mt-4 sm:mt-6">
              {!isFirstStep && (
                <Button
                  variant="outline"
                  onClick={(e) => {
                    e.preventDefault();
                    prev();
                  }}
                  className="flex items-center text-xs sm:text-sm"
                >
                  <ArrowLeft className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                  Back
                </Button>
              )}

              {isLastStep ? (
                <Button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 flex items-center text-xs sm:text-sm ml-auto"
                >
                  <Check className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                  Submit Listing
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="ml-auto flex items-center text-xs sm:text-sm"
                >
                  Next
                  <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ListFarm;
