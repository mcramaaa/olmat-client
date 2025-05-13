import Link from "next/link";
import { Mail } from "lucide-react";
import Image from "next/image";
import { APPCONSTANT } from "@/constant/App.constant";
import { FaWhatsapp } from "react-icons/fa6";
import { SlLocationPin } from "react-icons/sl";

export function SiteFooter() {
  return (
    <footer className="border-t bg-white">
      <div className="container px-4 md:px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="md:col-span-2 flex flex-col md:flex-row gap-5 items-start">
            <div className="relative aspect-square w-20 md:w-14">
              <Image
                src={"/logo-olm.webp"}
                alt="logo-olmat"
                fill
                sizes="1"
                className="object-contain"
              />
            </div>
            <div>
              <h3 className="font-bold mb-2">{APPCONSTANT.fullName}</h3>
              <p className="text-sm text-gray-600 italic">
                {APPCONSTANT.theme}
              </p>
            </div>
          </div>

          <div>
            <div>
              <h3 className="font-bold mb-4">Sosial Media & E-Commerce</h3>
              <div className="flex space-x-5">
                {APPCONSTANT.footer.socialMedia.map((item, i) => (
                  <Link
                    key={i}
                    href={item.link}
                    className="text-gray-600 hover:text-gray-900 hover:scale-110 duration-300"
                  >
                    <p className="w-4 h-4 text-2xl text-black">{item.icon}</p>
                  </Link>
                ))}
              </div>
            </div>
            <div className="mt-5">
              <Link
                href={APPCONSTANT.footer.shopee.link}
                className="text-gray-600 hover:text-gray-900 hover:scale-110 duration-300"
              >
                <p className="w-4 h-4 text-2xl text-black">
                  {APPCONSTANT.footer.shopee.icon}
                </p>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="font-bold mb-4">Kontak</h3>
            <address className="not-italic text-sm text-gray-600 space-y-2">
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <Link href={`mailto:${APPCONSTANT.footer.email}`}>
                  {APPCONSTANT.footer.email}
                </Link>
              </p>
              <p className="flex items-center gap-2">
                <FaWhatsapp className="w-4 h-4" />
                <Link
                  href={`https://api.whatsapp.com/send?phone=${APPCONSTANT.footer.mainWhatsApp.replace(
                    "+",
                    ""
                  )}&text=Hai%20kak%20dengan%20OLMAT%20UINSA`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Adam : {APPCONSTANT.footer.mainWhatsApp.replace("62", "0")}
                </Link>
              </p>
              <p className="flex items-start gap-2">
                <SlLocationPin className="text-2xl" />
                <Link
                  href={"https://maps.app.goo.gl/YuQGXHFWA4WiETSf7"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  UIN Sunan Ampel Surabaya, Jl. Ahmad Yani No.117, Surabaya,
                  East Java, Indonesia
                </Link>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-gray-600">
          <p className="flex flex-wrap items-center gap-1 justify-center">
            © 2025 OLMAT UINSA created by{" "}
            <Link
              href="https://mcrama.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold inline-flex items-center gap-2 py-1 rounded"
            >
              <span className="relative w-5 h-5 inline-block">
                <Image
                  src="/cathabot.webp"
                  alt="Cathabot Logo"
                  fill
                  sizes="1"
                />
              </span>
              <span>Cathabot.id</span>
            </Link>
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

{
  /* <div className="mt-8 pt-8 border-t text-center text-sm text-gray-600 flex justify-center w-full items-center">
  <p className="flex flex-wrap items-center gap-1">
    © 2025 OLMAT UINSA created by{" "}
    <Link
      href="https://mcrama.vercel.app/"
      target="_blank"
      rel="noopener noreferrer"
      className="font-bold inline-flex items-center gap-2 py-1 rounded"
    >
      <span className="relative w-5 h-5 inline-block">
        <Image src="/cathabot.webp" alt="Cathabot Logo" fill />
      </span>
      <span>Cathabot.id</span>
    </Link>
    All rights reserved.
  </p>
</div>; */
}
