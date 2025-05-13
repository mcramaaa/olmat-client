import type { Metadata } from "next";
import ParticipantForm from "../_components/ParticipantForm";
import { getProvinceAction } from "@/app/(auth)/register/register.action";
import { APPCONSTANT } from "@/constant/App.constant";
import { eventSettingAction } from "@/lib/auth.action";
import { Card, CardContent } from "@/components/ui/card";
import { InfoIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { convertDateTime } from "@/helper/common";

export const metadata: Metadata = {
  title: "Register Participants - Math Olympiad 2025",
  description:
    "Register participants for the International Mathematics Olympiad 2025",
};

export default async function RegisterParticipantsPage() {
  const [resProv, resEvent] = await Promise.all([
    getProvinceAction(),
    eventSettingAction(),
  ]);
  const prov = resProv.data.map((item: any) => ({
    label: item.name,
    value: item.id,
  }));
  const nowUtc = new Date();
  const nowWib = new Date(nowUtc.getTime() + 7 * 60 * 60 * 1000);

  const startDate = resEvent.data?.start ? new Date(resEvent.data.start) : null;
  const endDate = resEvent.data?.end ? new Date(resEvent.data.end) : null;

  const startWib = startDate
    ? new Date(startDate.getTime() + 7 * 60 * 60 * 1000)
    : null;
  const endWib = endDate
    ? new Date(endDate.getTime() + 7 * 60 * 60 * 1000)
    : null;

  const isOpen = startWib && endWib && nowWib >= startWib && nowWib <= endWib;

  function formatDateTime(isoDate: Date) {
    if (!isoDate) return "-";

    const date = new Date(isoDate);

    // Format untuk hari dan tanggal
    const dateFormatter = new Intl.DateTimeFormat("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    // Format untuk waktu
    const timeFormatter = new Intl.DateTimeFormat("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    return `${dateFormatter.format(date)}, ${timeFormatter.format(date)} WIB`;
  }

  return (
    <div className="pb-12 md:px-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {isOpen ? (
          <>
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold">Pendaftaran OLMAT UINSA</h1>
              <p className="text-gray-500">{APPCONSTANT.theme}</p>
            </div>

            <ParticipantForm provinceOptions={prov} />
          </>
        ) : (
          <Card className="border-none shadow-md overflow-hidden">
            <div className="p-4 bg-gray-100">
              <h2 className="text-xl font-bold">
                {startWib && nowWib < startWib
                  ? "Pendaftaran Belum Dibuka"
                  : "Pendaftaran Telah Ditutup"}
              </h2>
            </div>
            <CardContent className="p-6">
              <div className="space-y-4">
                {startWib && nowWib < startWib ? (
                  <>
                    <div className="flex items-start">
                      <div>
                        <h3 className="font-semibold text-lg">
                          Hai, Sahabat Matematika! 👋
                        </h3>
                        <p className="text-gray-600 mt-1 text-sm">
                          Pendaftaran Olimpiade Matematika UINSA akan dibuka
                          mulai{" "}
                          <span className="font-bold ">
                            {startDate && convertDateTime(startDate)}
                          </span>{" "}
                          hingga{" "}
                          <span className="font-bold ">
                            {endDate && convertDateTime(endDate)}
                          </span>
                          . Jangan lupa catat tanggalnya, ya!
                        </p>
                      </div>
                    </div>

                    <Alert className=" bg-blue-50 border-blue-200">
                      <InfoIcon className="h-4 w-4 text-amber-600" />
                      <AlertTitle>Persiapkan dirimu!</AlertTitle>
                      <AlertDescription>
                        Siapkan dokumen dan informasi yang diperlukan sebelum
                        pendaftaran dibuka untuk mempercepat proses pendaftaran.
                      </AlertDescription>
                    </Alert>
                  </>
                ) : (
                  <>
                    <div className="flex items-start">
                      <div>
                        <h3 className="font-semibold text-lg">
                          Terima Kasih! 🙌
                        </h3>
                        <p className="text-gray-600 mt-1">
                          Terima kasih atas antusiasme dan partisipasi kalian
                          dalam pendaftaran OLMAT UINSA! Sampai jumpa di
                          kesempatan berikutnya dan semoga sukses! ✨
                        </p>
                      </div>
                    </div>

                    <Alert className="bg-blue-50 border-blue-200">
                      <InfoIcon className="h-4 w-4 text-blue-600" />
                      <AlertTitle>Informasi Selanjutnya</AlertTitle>
                      <AlertDescription>
                        Pantau email dan media sosial resmi OLMAT UINSA untuk
                        informasi terbaru mengenai jadwal dan pelaksanaan
                        kompetisi.
                      </AlertDescription>
                    </Alert>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
