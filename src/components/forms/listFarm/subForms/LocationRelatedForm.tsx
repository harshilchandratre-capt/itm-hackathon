import { CityList } from "@/components/shared/CityList";
import { StateList } from "@/components/shared/StateList";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FarmData } from "@/types";
import { useEffect, useState } from "react";
import ListFarmWrapper from "../ListFarmWrapper";

interface LocationRelatedFormProps {
  location: string;
  address: string;
  city: string;
  state: string;
  pinCode: string;
  landmarks?: string;
  duration: string;
  updateField: (fields: Partial<FarmData>) => void;
}

const LocationRelatedForm = ({
  address,
  city,
  duration,
  location,
  pinCode,
  state,
  landmarks,
  updateField,
}: LocationRelatedFormProps) => {
  const [stateCode, setStateCode] = useState("");
  const [cityCode, setCityCode] = useState("");

  useEffect(() => {
    updateField({ state: stateCode });
    updateField({ city: cityCode });
  }, [stateCode, cityCode]);

  return (
    <ListFarmWrapper title="Location Related Details">
      <Label>
        Location
        <Input
          value={location}
          onChange={(e) => updateField({ location: e.target.value })}
        />
      </Label>
      <Label>
        Address
        <Input
          value={address}
          onChange={(e) => updateField({ address: e.target.value })}
        />
      </Label>
      <div className="grid md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label>State</Label>
          <StateList setStateCode={setStateCode} style="max-sm:w-full " />
        </div>
        <div className="flex  flex-col gap-2">
          <Label>City</Label>
          <CityList
            setCityCode={setCityCode}
            stateCode={stateCode}
            style="max-sm:w-full"
          />
        </div>
      </div>
      <Label>
        Pin Code
        <Input
          value={pinCode}
          onChange={(e) => updateField({ pinCode: e.target.value })}
        />
      </Label>
      <Label>
        Landmarks
        <Input
          value={landmarks}
          onChange={(e) => updateField({ landmarks: e.target.value })}
        />
      </Label>
      <Label>
        Duration
        <Input
          value={duration}
          onChange={(e) => updateField({ duration: e.target.value })}
        />
      </Label>
    </ListFarmWrapper>
  );
};

export default LocationRelatedForm;
