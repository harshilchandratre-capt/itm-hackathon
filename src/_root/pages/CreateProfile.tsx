import { CityList } from "@/components/shared/CityList";
import { StateList } from "@/components/shared/StateList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import dbServices from "@/services/dbServices";
import { UserData } from "@/types";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const CreateProfile = () => {
  const [stateCode, setStateCode] = useState<string>("");
  const [cityCode, setCityCode] = useState<string>("");
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<UserData>();

  const submitHandler: SubmitHandler<UserData> = async (data) => {
    const userData: UserData = {
      ...data,
      age: Number(data.age),
      state: stateCode,
      city: cityCode,
    };

    console.log(userData);

    try {
      await dbServices.addUserIntoDatabase({ user: userData });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex items-center mb-6">
            <div className="bg-brandColor h-16 w-16 mr-4 flex-shrink-0 flex items-center justify-center  text-white">
              Logo
            </div>
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900">
                Create Profile
              </h2>
              <p className="text-sm text-gray-600">Tell Us About Yourself</p>
            </div>
          </div>

          <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
            <div className="grid md:grid-cols-1 gap-4">
              <div>
                <Label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Name
                </Label>
                <Input
                  {...register("name", {
                    required: { message: "Name is required", value: true },
                  })}
                  placeholder="Enter your name"
                  className="w-full"
                />
                {errors.name && (
                  <p className="text-errorColor text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <Label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Phone
                </Label>
                <Input
                  {...register("phone")}
                  placeholder="Enter your phone number"
                  className="w-full"
                />
                {errors.phone && (
                  <p className="text-errorColor text-sm mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email
                </Label>
                <Input
                  {...register("email")}
                  placeholder="Enter your email"
                  className="w-full"
                />
                {errors.email && (
                  <p className="text-errorColor text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <Label
                  htmlFor="age"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Age
                </Label>
                <Input
                  {...register("age", {
                    required: { message: "Age is required", value: true },
                  })}
                  placeholder="Enter your age"
                  className="w-full"
                />
                {errors.age && (
                  <p className="text-errorColor text-sm mt-1">
                    {errors.age.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">
                  State
                </Label>
                <StateList setStateCode={setStateCode} />
              </div>

              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">
                  City
                </Label>
                <CityList setCityCode={setCityCode} stateCode={stateCode} />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label
                  htmlFor="village"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Village
                </Label>
                <Input
                  {...register("village")}
                  placeholder="Enter your village"
                  className="w-full"
                />
                {errors.village && (
                  <p className="text-errorColor text-sm mt-1">
                    {errors.village.message}
                  </p>
                )}
              </div>

              <div>
                <Label
                  htmlFor="pinCode"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Pin Code
                </Label>
                <Input
                  type="number"
                  {...register("pinCode", {
                    required: { message: "Pincode is required", value: true },
                  })}
                  placeholder="Enter your pincode"
                  className="w-full"
                />
                {errors.pinCode && (
                  <p className="text-errorColor text-sm mt-1">
                    {errors.pinCode.message}
                  </p>
                )}
              </div>
            </div>

            <Button type="submit" className="w-full mt-6">
              Create Profile
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProfile;
