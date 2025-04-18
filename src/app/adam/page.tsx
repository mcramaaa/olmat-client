import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div className=" h-screen grid place-items-center">
      <Link
        className="px-10 py-4 bg-pink-300 font-bold "
        href={"https://whatsapp.com/channel/0029VbBGSn26LwHnMdNiQT1p"}
      >
        {" "}
        Pencet disini
      </Link>
    </div>
  );
}
