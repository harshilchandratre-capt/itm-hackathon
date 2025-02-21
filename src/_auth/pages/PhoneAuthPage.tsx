import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { brandName, tagLine } from "@/constants/constants";
import { toast } from "@/hooks/use-toast";
import { getAuthErrorByCode } from "@/lib/utils";
import { authServices } from "@/services/authServices";
import { AuthError } from "@/services/errors";
import { Label } from "@radix-ui/react-label";
import { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface PhoneAuthenticationForm {
  phoneNumber: string;
  otp: string;
}

const PhoneAuthentication = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm<PhoneAuthenticationForm>();

  const [isOtpSent, setIsOtpSent] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>("");
  const [OTP, setOTP] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [countdown, setCountdown] = useState<number>(60);
  const [canResendOtp, setCanResendOtp] = useState<boolean>(false);

  // Timer effect to count down and enable resend
  useEffect(() => {
    let timerId: NodeJS.Timeout;
    if (isOtpSent && countdown > 0) {
      timerId = setTimeout(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      setCanResendOtp(true);
    }

    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, [isOtpSent, countdown]);

  const handleSendOtp = async (phoneNumber: string) => {
    console.log("handleSendOtp called");
    const ph = `+91${phoneNumber}`;
    console.log(ph);
    try {
      const userId = await authServices.sendOTP({ phoneNumber: ph });
      setUserId(userId);
      setIsOtpSent(true);
      setCountdown(60);
      setCanResendOtp(false);
      toast({ title: "OTP Sent successfully!", duration: 1700 });
      console.log("otp sent for user id : ", userId);
    } catch (error) {
      toast({
        title: "Failed to send OTP",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleVerifyOtp = async (otp: string) => {
    console.log("handleVerifyOtp called");
    try {
      const temp = await authServices.verifyOTP({ otp, userId });
      console.log(temp);
      toast({ title: "OTP Verified Successfully!", duration: 1700 });
    } catch (error) {
      if (error instanceof AuthError) {
        setError(getAuthErrorByCode({ errorCode: error.code }));
        setOTP("");
      }
    }
  };

  const handleFormSubmit: SubmitHandler<PhoneAuthenticationForm> = async (
    data
  ) => {
    isOtpSent ? handleVerifyOtp(OTP) : handleSendOtp(data.phoneNumber);
  };

  const handleResendOtp = () => {
    if (canResendOtp) {
      handleSendOtp(userId);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen lg:bg-primaryColor1">
      <div className="h-screen lg:w-[90vw] lg:h-[90vh] flex max-sm:flex-col lg:justify-between lg:gap-2 rounded-sm lg:bg-white relative">
        <div className="lg:w-[50%] max-sm:h-[65%] overflow-hidden rounded-sm bg-white relative">
          <img
            src="https://cloud.appwrite.io/v1/storage/buckets/674b00470008971c59af/files/674b00810009985b3e33/view?project=674accf60022b098995d&project=674accf60022b098995d&mode=admin"
            alt="image"
            className="h-full w-full object-cover hover:scale-110 transition-all"
          />
        </div>
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="w-full p-6 space-y-4 lg:w-[47%] lg:px-24 flex flex-col justify-center max-sm:rounded-t-2xl bg-white max-sm:shadow-[0px_-10px_140px_5px_#1cb05e]  z-10 lg:flex-1 max-sm:absolute max-sm:bottom-0 max-sm:h-[45%] "
        >
          <h2 className="text-3xl font-bold text-brandColor">{brandName}</h2>
          <h2 className="font-semibold text-brandColor">{tagLine}</h2>
          <div>
            <Label className="block mb-2">
              <span className="text-2xl font-semibold">Sign In</span>
              <br />
              <span className="text-sm">Enter Your Phone Number</span>
              <Input
                className="my-3"
                disabled={isOtpSent}
                type="tel"
                placeholder="Enter 10-digit phone number"
                {...register("phoneNumber", {
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Phone number must contain only digits",
                  },
                  maxLength: {
                    value: 10,
                    message: "Phone number can not be more than 10 digits",
                  },
                  minLength: {
                    value: 10,
                    message: "Phone number can not be less than 10 digits",
                  },
                  required: {
                    value: true,
                    message: "Phone number is required",
                  },
                })}
                onInput={(e) => {
                  const input = e.target as HTMLInputElement;
                  input.value = input.value.replace(/[^0-9]/g, "");
                }}
              />
            </Label>
          </div>

          {isOtpSent && (
            <div className="space-y-2">
              <Label className="block mb-2">
                OTP
                <InputOTP
                  className="my-3"
                  maxLength={6}
                  onChange={(e) => {
                    setOTP(e);
                  }}
                  value={OTP}
                >
                  <InputOTPGroup className="gap-2 rounded-sm flex justify-center">
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </Label>

              {/* Resend OTP Section */}
              <div className="text-center">
                {countdown > 0 ? (
                  <p className="text-sm text-gray-600">
                    Resend OTP in {countdown} seconds
                  </p>
                ) : (
                  <Button
                    type="button"
                    variant="link"
                    onClick={handleResendOtp}
                    className="text-primary hover:underline"
                  >
                    Resend OTP
                  </Button>
                )}
              </div>
            </div>
          )}

          {errors.phoneNumber && (
            <p className="text-errorColor">{errors.phoneNumber.message}</p>
          )}
          {error && <p className="text-errorColor">{error}</p>}

          <Button className="w-full">
            {isOtpSent ? "Verify OTP" : "Continue"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PhoneAuthentication;
