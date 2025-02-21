import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import ListFarmWrapper from "../ListFarmWrapper";
import { FarmData } from "@/types";

interface AdditionalFormProps {
  waterAvailable?: boolean;
  electricityAvailable?: boolean;
  isIrrigated?: boolean;
  boundaryWall?: boolean;
  numOfSidesOpen?: number;
  labourProvided?: boolean;
  labourCost?: string;
  updateField: (fields: Partial<FarmData>) => void;
  // resetForm: (index: number) => void;
}

const AdditionalDetailsForm = ({
  waterAvailable,
  electricityAvailable,
  isIrrigated,
  boundaryWall,
  numOfSidesOpen,
  labourProvided,
  updateField,
}: // resetForm,
AdditionalFormProps) => {
  const [isLabourProvided, setIsLabourProvided] = useState(labourProvided);
  return (
    <ListFarmWrapper title="Additional Details">
      <div className="flex items-center space-x-2">
        <Switch
          defaultChecked={waterAvailable}
          onCheckedChange={(e) => {
            updateField({ waterAvailable: e });
          }}
        />
        <Label>Water Available</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          defaultChecked={electricityAvailable}
          onCheckedChange={(e) => {
            updateField({ electricityAvailable: e });
          }}
        />
        <Label>Electricity Available</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          defaultChecked={isIrrigated}
          onCheckedChange={(e) => {
            updateField({ isIrrigated: e });
          }}
        />
        <Label>Is Irrigated</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          defaultChecked={boundaryWall}
          onCheckedChange={(e) => {
            updateField({ boundaryWall: e });
          }}
        />
        <Label>Boundary Wall</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          defaultChecked={isLabourProvided}
          onCheckedChange={(e) => {
            updateField({ waterAvailable: e });
            setIsLabourProvided(e);
          }}
        />
        <Label>Labour Provided</Label>
      </div>
      {isLabourProvided && (
        <div>
          <Label>Additional Labour Cost</Label>
          <Input
            onChange={(e) => updateField({ labourCost: e.target.value })}
          />
        </div>
      )}

      <div>
        <Label>Number Of Side open</Label>
        <Input
          value={numOfSidesOpen}
          onChange={(e) =>
            updateField({ numOfSidesOpen: Number(e.target.value) })
          }
        />
      </div>
    </ListFarmWrapper>
  );
};

export default AdditionalDetailsForm;
