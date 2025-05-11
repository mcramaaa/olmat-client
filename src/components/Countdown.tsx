/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";

interface IProps {
  start: string | null;
  end: string | null;
  now: string;
}

export default function Countdown({ start, now, end }: IProps) {
  const [eventDate, seteventDate] = useState<Date | string>(`${end}`);

  const nowDate = new Date(now);
  const startDate = start ? new Date(start) : null;
  const endDate = end ? new Date(end) : null;

  const targetDate = new Date(
    new Date(eventDate).toLocaleString("en-US", { timeZone: "Asia/Jakarta" })
  );

  const [timeLeft, setTimeLeft] = useState({
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [showMonths, setShowMonths] = useState(false);

  useEffect(() => {
    if (!startDate || !now) return;

    if (nowDate < startDate) {
      seteventDate(startDate);
    } else if (endDate && nowDate >= startDate && nowDate < endDate) {
      seteventDate(endDate);
    }
  }, [start, end, now]);

  useEffect(() => {
    // Validasi tanggal target
    if (isNaN(targetDate.getTime())) {
      return;
    }

    const interval = setInterval(() => {
      const now = new Date(
        new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" })
      );
      const difference = targetDate.getTime() - now.getTime(); // Selisih waktu dalam milidetik

      if (difference <= 0) {
        clearInterval(interval); // Hentikan interval jika waktu habis
        setTimeLeft({ months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        // Total days
        const totalDays = Math.floor(difference / (1000 * 60 * 60 * 24));

        // Calculate months (assuming 30 days per month for simplicity)
        const months = Math.floor(totalDays / 30);

        // Determine if we should show months based on if there's at least 1 month left
        const shouldShowMonths = months > 0;
        setShowMonths(shouldShowMonths);

        // Calculate remaining days based on whether we're showing months
        const days = shouldShowMonths ? totalDays % 30 : totalDays;

        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({ months, days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [eventDate]);

  const formatNumber = (num: number): string => {
    return num < 10 ? `0${num}` : `${num}`;
  };

  return (
    <div className=" md:px-10 backdrop-blur-sm  bg-white/20 rounded-2xl shadow-lg w-full max-w-5xl py-5 md:translate-y-1/2">
      <div>
        <p className="text-sm text-center font-dancing text-brand">
          {startDate &&
            endDate &&
            nowDate < startDate &&
            "Pembukaan Pendaftaran"}
          {startDate &&
            endDate &&
            nowDate > startDate &&
            nowDate < endDate &&
            "Penutupan Pendaftaran"}
        </p>
        <p className="text-xl text-center font-dancing font-bold text-secondBrand">
          Olimpiade Matematika UINSA
        </p>
      </div>
      <div className="relative rounded-xl p-4 flex ">
        {/* Background pattern overlay */}

        <div
          className={`grid ${
            showMonths ? "grid-cols-5" : "grid-cols-4"
          } gap-10 w-full`}
        >
          {showMonths && (
            <div className="flex flex-col justify-center items-center gap-3">
              <p className="text-4xl md:text-5xl font-dancing font-bold bg-gradient-to-t from-yellow-400 via-yellow-500 to-yellow-600 text-transparent bg-clip-text">
                {formatNumber(timeLeft.months)}
              </p>
              <p className="text-xs uppercase font-medium text-gray-800">
                Bulan
              </p>
            </div>
          )}

          <div className="flex flex-col justify-center items-center gap-3">
            <p className="text-4xl md:text-5xl font-dancing font-bold bg-gradient-to-t from-yellow-400 via-yellow-500 to-yellow-600 text-transparent bg-clip-text">
              {formatNumber(timeLeft.days)}
            </p>
            <p className="text-xs uppercase font-medium text-gray-800">Hari</p>
          </div>

          <div className="flex flex-col justify-center items-center gap-3">
            <p className="text-4xl md:text-5xl font-dancing font-bold bg-gradient-to-t from-yellow-400 via-yellow-500 to-yellow-600 text-transparent bg-clip-text">
              {formatNumber(timeLeft.hours)}
            </p>
            <p className="text-xs uppercase font-medium text-gray-800">Jam</p>
          </div>

          <div className="flex flex-col justify-center items-center gap-3">
            <p className="text-4xl md:text-5xl font-dancing font-bold bg-gradient-to-t from-yellow-400 via-yellow-500 to-yellow-600 text-transparent bg-clip-text">
              {formatNumber(timeLeft.minutes)}
            </p>
            <p className="text-xs uppercase font-medium text-gray-800">Menit</p>
          </div>

          {/* {!showMonths && ( */}
          <div className="flex flex-col justify-center items-center gap-3">
            <p className="text-4xl md:text-5xl font-dancing font-bold bg-gradient-to-t from-yellow-400 via-yellow-500 to-yellow-600 text-transparent bg-clip-text">
              {formatNumber(timeLeft.seconds)}
            </p>
            <p className="text-xs uppercase font-medium text-gray-800">Detik</p>
          </div>
          {/* )} */}
        </div>
      </div>
    </div>
    // </div>
    // </div>
  );
}
