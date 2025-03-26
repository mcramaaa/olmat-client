"use client";

import React, { useEffect, useState } from "react";
import { OtpForm } from "./OtpForm";
import Lottie from "lottie-react";
import otpMail from "@/assets/lottie/otpMail.json";

export default function AccountClient() {
  const [isShow, setIsShow] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShow(true);
    }, 2850);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container flex items-center justify-center mx-auto">
      {!isShow ? (
        <div>
          <Lottie animationData={otpMail} autoPlay loop />
        </div>
      ) : (
        <OtpForm />
      )}
      <div></div>
    </div>
  );
}
