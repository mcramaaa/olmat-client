"use client";

import React, { useState } from "react";
import { OtpForm } from "./OtpForm";

export default function AccountClient() {
  const [isShow, setIsShow] = useState(false);

  return (
    <div className="container flex items-center justify-center mx-auto">
      {isShow ? <div></div> : <OtpForm />}
      <div></div>
    </div>
  );
}
