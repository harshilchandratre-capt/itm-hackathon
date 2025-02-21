import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FarmData } from "@/types";
import { useEffect, useState } from "react";
import ListFarmWrapper from "../ListFarmWrapper";
import CustomCombobox from "@/components/shared/CustomCombobox";
import { farmTypes } from "@/constants/constants";

interface LandRelatedFormProps {
  farmType: string;
  suitableCrops: string[];
  soilType: string;
  updateField: (fields: Partial<FarmData>) => void;
}

const LandRelatedForm = ({
  farmType,
  soilType,
  suitableCrops,
  updateField,
}: LandRelatedFormProps) => {
  const [farmTypeValue, setFarmTypeValue] = useState<string>("");

  useEffect(() => {
    updateField({ farmType: farmTypeValue });
  }, [farmTypeValue]);

  return (
    <ListFarmWrapper title="Land Related Details">
      <Label>
        Farm Type
        {/* <Input
          value={farmType}
          //TODO change it into organic non organic
          onChange={() => updateField({ farmType: "Organic" })}
        /> */}
        <CustomCombobox
          title="Select Farm Type"
          setCurrentValue={setFarmTypeValue}
          values={farmTypes}
        />
      </Label>
      <Label>
        Suitable Crops
        <Input
          value={suitableCrops}
          //TODO GIVE OPTION TO ADD CROPS
          onChange={() => updateField({ suitableCrops: [] })}
        />
      </Label>
      <Label>
        Soil Type
        <Input
          value={soilType}
          onChange={(e) => updateField({ soilType: e.target.value })}
        />
      </Label>
    </ListFarmWrapper>
  );
};

export default LandRelatedForm;
