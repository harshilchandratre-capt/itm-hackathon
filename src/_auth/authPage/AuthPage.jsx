import InputOtp from "@/components/shared/InputOtp";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import authServices from "@/services/authServices";
import React, { useState } from "react";

const AuthPage = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [userId, setUserId] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const sendOtp = async () => {
    const userId = await authServices.sendOTP({ phoneNumber });
    setOtpSent(true);
    setUserId(userId);
  };

  const handleOtp = async () => {
    await authServices.verifyOTP({ userId, otp });
  };

  return (
    <div className="h-screen bg-red-300 flex flex-col gap-4 py-4">
      <Input
        placeholder={"Enter phone number"}
        type="text"
        onChange={(e) => {
          setPhoneNumber(e.target.value);
        }}
      />
      {!otpSent && <Button onClick={sendOtp}>Send otp</Button>}
      {otpSent && (
        <>
          <InputOtp otp={otp} setOtp={setOtp} />
          <Button onClick={handleOtp}>Verify OTP</Button>
        </>
      )}
    </div>
  );
};

export default AuthPage;
