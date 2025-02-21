import { CityList } from "@/components/shared/CityList";
import { StateList } from "@/components/shared/StateList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { userContext } from "@/context/userContext";
import { convertToPlainNumber } from "@/lib/utils";
import { userServices } from "@/services/userServices";
import React, { useContext, useState } from "react";

const CreateProfile = () => {
  const [stateCode, setStateCode] = useState("HR");
  const [stateName, SetstateName] = useState("");
  const [cityName, setcityName] = useState("Ambala");
  const [name, setname] = useState("Armaan");
  const [age, setAge] = useState("25");
  const [error, setError] = useState("");
  const [isLoding, setIsLoding] = useState(false);

  const { user } = useContext(userContext);

  const handleSubmit = async () => {
    setIsLoding(true);
    //name validation
    if (name.length < 1) {
      setError("Name is required");
      setIsLoding(false);
      return;
    }
    //age validation
    if (age == "") {
      setError("age is required");
      setIsLoding(false);
      return;
    }

    //state and city validation
    if (stateName == null || cityName == null) {
      setError("Please select state and city");
      setIsLoding(false);
      return;
    }

    console.log(parseInt(user.phone));
    const data = {
      phone: convertToPlainNumber(user.phone),
      state: stateName,
      city: cityName,
      name: name,
      age: parseInt(age),
    };

    await userServices.addUserIntoDb({ data });

    setIsLoding(false);
  };

  return (
    <div className="h-screen w-full bg-red-400">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          value={name}
          onChange={(e) => setname(e.target.value)}
          name="name"
        />
        <Label htmlFor="age">Age</Label>
        <Input
          value={age}
          onChange={(e) => setAge(e.target.value)}
          name="age"
        />
        <StateList setStateCode={setStateCode} setStateName={SetstateName} />
        {stateCode && (
          <CityList setCityName={setcityName} stateCode={stateCode} />
        )}
      </div>

      {error && <p className="text-red-700">{error}</p>}
      <Button onClick={handleSubmit}>
        {isLoding ? "loading" : "Create Profile"}
      </Button>
    </div>
  );
};

export default CreateProfile;
