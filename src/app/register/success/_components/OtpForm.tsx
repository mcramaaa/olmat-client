"use client";

import React from "react";
import { useState, useRef, useEffect } from "react";
import { Send, ShieldEllipsisIcon, Undo2 } from "lucide-react";
import { Card, CardHeader } from "@/components/ui/card";
import { getCookie, setCookie } from "cookies-next";
import { confirmAction, resendOtpAction } from "../verifauth.action";
import Link from "next/link";
import { ROUTES } from "@/routes/router";
import { useLayout } from "@/hooks/zustand/layout";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import ErrMessageBox from "@/components/ui/ErrMessageBox";

interface OTPVerificationProps {
  length?: number;
}

export function OtpForm({ length = 6 }: OTPVerificationProps) {
  const router = useRouter();
  const { getMe } = useAuth();
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const { setIsSuccess } = useLayout();
  const [activeInput, setActiveInput] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [canResend, setCanResend] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<{
    code: number | null;
    message: string;
  }>();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [authData, setAuthData] = useState<{
    hash: string;
    email: string;
  }>({ hash: "", email: "" });

  async function onVerify(otp: string) {
    const res = await confirmAction(authData.hash, otp);
    if (res.success) {
      setIsSuccess(true, "Yay, Aktivasi Akun Berhasil");
      setCookie("CBO_Token", res.data.data.token, {
        maxAge: 60 * 60 * 24 * 1,
      });
      router.push(ROUTES.DASHBOARD.DEFAULT);
      getMe();
    } else {
      setErrMsg({
        code: null,
        message: "Kode kamu salah nih, coba masukkan lagi dengan benar",
      });
    }
  }

  async function handleResend() {
    setCanResend(false);
    setTimeLeft(60);
    const res = await resendOtpAction(authData?.hash);
    if (res.data) {
      setCookie("CBO_Auth", { data: res.data.data, email: authData.email });
    }

    if (res.error) {
      const err = res.error as any;
      if (err.statusCode === 403) {
        setErrMsg({
          code: 403,
          message:
            "Yah, pendaftaran telah kadaluwarsa. Yuk, Daftarkan ulang akun kamu lagi!",
        });
      }
    }
  }

  // Get Auth Token
  useEffect(() => {
    const authToken = getCookie("CBO_Auth");
    if (!authToken) return;

    try {
      const parsed = JSON.parse(authToken as string);
      setAuthData({
        hash: parsed.data,
        email: parsed.email,
      });
    } catch (error) {
      console.error("Invalid JSON in CBO_Auth cookie", error);
    }
  }, []);

  // Initialize input refs
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, length);
  }, [length]);

  // Handle countdown
  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;

    // Only allow one digit
    if (value.length > 1) return;

    // Update OTP array
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // If input is filled, move to next input
    if (value && index < length - 1) {
      setActiveInput(index + 1);
      inputRefs.current[index + 1]?.focus();
    }

    // Check if all inputs are filled
    if (newOtp.every((v) => v) && newOtp.length === length) {
      onVerify(newOtp.join(""));
    }
  };

  // Handle key down events
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      setActiveInput(index - 1);
      inputRefs.current[index - 1]?.focus();
    }

    // Move to next input on right arrow
    if (e.key === "ArrowRight" && index < length - 1) {
      setActiveInput(index + 1);
      inputRefs.current[index + 1]?.focus();
    }

    // Move to previous input on left arrow
    if (e.key === "ArrowLeft" && index > 0) {
      setActiveInput(index - 1);
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle paste event
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").trim();

    // Check if pasted data is a number and has correct length
    if (!/^\d+$/.test(pastedData)) return;

    const pastedOtp = pastedData.slice(0, length).split("");
    const newOtp = [...otp];

    for (let i = 0; i < pastedOtp.length; i++) {
      newOtp[i] = pastedOtp[i];
    }

    setOtp(newOtp);

    // Focus on the next empty input or the last input
    const nextEmptyIndex = newOtp.findIndex((v) => !v);
    const focusIndex = nextEmptyIndex === -1 ? length - 1 : nextEmptyIndex;
    setActiveInput(focusIndex);
    inputRefs.current[focusIndex]?.focus();

    // Check if all inputs are filled
    if (newOtp.every((v) => v) && newOtp.length === length) {
      onVerify(newOtp.join(""));
    }
  };

  // Handle resend

  return (
    <Card className="w-full max-w-sm p-8 mx-auto bg-white rounded-lg shadow-md">
      {/* <div className="flex flex-col items-center"> */}
      <CardHeader className="flex flex-col items-center gap-y-2">
        <div className="p-3 rounded-full bg-slate-800">
          <ShieldEllipsisIcon className="w-12 h-12 text-white" />
        </div>

        <h1 className="text-2xl font-bold text-slate-800">
          Verifikasi Akun Kamu
        </h1>
      </CardHeader>

      <p className="mb-6 text-sm text-center text-slate-600">
        Kami telah mengirimkan kode OTP ke email{" "}
        <span className="text-black font-semibold">{authData?.email}</span>{" "}
        Masukkan kode tersebut di bawah ini untuk menyelesaikan proses
        verifikasi.
        <br />
      </p>
      {errMsg && <ErrMessageBox message={errMsg.message} />}

      <div className="flex justify-center w-full gap-2 mb-6">
        {Array.from({ length }).map((_, index) => (
          <input
            key={index}
            type="text"
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            value={otp[index]}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={index === 0 ? handlePaste : undefined}
            onFocus={() => setActiveInput(index)}
            className={`w-12 h-12 text-center text-xl font-bold border ${
              activeInput === index ? "border-slate-800" : "border-slate-200"
            } rounded-md focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800`}
            maxLength={1}
            inputMode="numeric"
            pattern="[0-9]*"
            autoComplete="one-time-code"
          />
        ))}
      </div>

      {/* <Button
        onClick={() => onVerify(otp.join(""))}
        disabled={otp.some((v) => !v)}
        className="w-full py-3 mb-6 font-medium text-white rounded-md bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Verify Code
      </Button> */}

      {errMsg?.code === 403 ? (
        <div className="flex justify-center">
          <Link
            className="px-4 py-1 mt-2 rounded-full flex items-center gap-2 text-sm font-medium text-slate-800  hover:text-white hover:bg-slate-800 duration-300"
            href={ROUTES.REGISTER}
          >
            <Undo2 className="h-5" />
            Daftar akun ulang
          </Link>
        </div>
      ) : (
        <div className="text-center flex flex-col items-center">
          <p className="font-medium text-slate-800">Belum menerima kode?</p>
          {canResend ? (
            <button
              onClick={handleResend}
              className="px-4 flex gap-2 items-center py-1 mt-2 text-sm font-medium rounded-full text-slate-800 hover:text-white hover:bg-slate-800 duration-300"
            >
              <Send className="h-5" />
              Kirim ulang kode
            </button>
          ) : (
            <p className="text-sm text-slate-600">
              Kamu bisa kirim ulang kode dalam {timeLeft} detik
            </p>
          )}
        </div>
      )}

      {/* </div> */}
    </Card>
  );
}
