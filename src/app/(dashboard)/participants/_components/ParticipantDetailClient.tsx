import { Alert } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IParticipant } from "@/interfaces/IParticipant";
import { FileText, Info, User } from "lucide-react";
import React from "react";
import { ParticipantCardButton } from "./participant-card-button";
import { convertBirth, convertGender } from "@/helper/common";
import AppImage from "@/components/ui/AppImage";

interface IProps {
  participant: IParticipant;
}

export default function ParticipantDetailClient({ participant }: IProps) {
  console.log("uspad", participant);

  return (
    <>
      <div className="mb-4 md:hidden">
        <h1 className="text-2xl font-bold tracking-tight">
          Halo, pejuang Matematika! 🎓
        </h1>
        <p className="text-sm text-gray-500">
          Ini adalah halaman profilmu sebagai peserta Olimpiade Matematika
          UINSA.
        </p>
      </div>
      <div className="flex flex-col gap-6 md:flex-row">
        <div className="md:w-1/3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-lg font-medium">
                Profil Peserta
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="flex flex-col items-center mb-6">
                {participant.img ? (
                  <AppImage
                    className="w-40 overflow-hidden rounded-full aspect-square"
                    object="object-cover"
                    src={`${process.env.NEXT_PUBLIC_IMG_CDN}/imgs/${participant.img}`}
                    priority={false}
                  />
                ) : (
                  <div className="relative flex items-center justify-center w-40 mb-4 overflow-hidden bg-gray-200 rounded-full aspect-square">
                    <User className="w-full h-full text-gray-500" />
                  </div>
                )}
                <h2 className="text-xl font-bold">{participant.name}</h2>
                <p className="text-sm text-muted-foreground">
                  {participant.email}
                </p>
                <div
                  className={`mt-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    participant.status === "active"
                      ? "bg-green-100 text-green-800"
                      : participant.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {participant.status}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Jenis Kelamin
                  </h3>
                  <p>{convertGender(participant.gender)}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Tanggal Lahir
                  </h3>
                  <p>{convertBirth(participant.birth)}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    WhatsApp
                  </h3>
                  <p>{participant.phone}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Sekolah
                  </h3>
                  <p>{participant.school.name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Location
                  </h3>
                  <p>{participant.school.address},</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:w-2/3">
          <div className="hidden mb-4 md:block">
            <h1 className="text-2xl font-bold tracking-tight">
              Halo, pejuang Matematika! 🎓
            </h1>
            <p className="text-sm text-gray-500">
              Ini adalah halaman profilmu sebagai peserta Olimpiade Matematika
              UINSA.
            </p>
          </div>
          <Card className="py-5">
            <CardContent className="px-4">
              <div className="space-y-4">
                {participant.img && (
                  <div className="flex flex-col p-3 border rounded-md">
                    <p className="text-sm font-medium md:hidden">
                      Foto Peserta
                    </p>
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <AppImage
                          className="w-[40px] aspect-square"
                          object="object-cover"
                          src={`${process.env.NEXT_PUBLIC_IMG_CDN}/imgs/${participant.img}`}
                          priority={false}
                        />
                        {/* <FileText className="w-5 h-5 text-muted-foreground" /> */}
                        <div>
                          <p className="hidden font-medium md:block">
                            Foto Peserta
                          </p>
                        </div>
                      </div>
                      <div
                        className={`inline-flex bg-green-100 text-green-800 items-center rounded-full px-2.5 py-0.5 text-xs font-medium `}
                      >
                        <p>Terupload</p>
                      </div>
                    </div>
                  </div>
                )}
                {participant.attachment && (
                  <div className="flex flex-col p-3 border rounded-md">
                    <p className="text-sm font-medium md:hidden">
                      Kartu Pelajar atau Dokumen Pendukung
                    </p>
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <AppImage
                          className="w-[40px] aspect-square"
                          object="object-cover"
                          priority={false}
                          src={`${process.env.NEXT_PUBLIC_IMG_CDN}/attachments/${participant.attachment}`}
                        />
                        {/* <FileText className="w-5 h-5 text-muted-foreground" /> */}
                        <div>
                          <p className="hidden font-medium md:block">
                            Kartu Pelajar atau Dokumen Pendukung
                          </p>
                        </div>
                      </div>
                      <div
                        className={`inline-flex bg-green-100 text-green-800 items-center rounded-full px-2.5 py-0.5 text-xs font-medium `}
                      >
                        <p>Terupload</p>
                      </div>
                    </div>
                  </div>
                )}
                <div className="flex flex-col p-3 border rounded-md">
                  <p className="text-sm font-medium md:hidden">Kartu Peserta</p>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <FileText className="w-[40px] " />
                      <div>
                        <p className="hidden font-medium md:block">
                          Kartu Peserta
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex items-center w-full">
                        <div
                          className={`mt-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            participant.status === "active"
                              ? "bg-green-100 text-green-800"
                              : participant.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {participant.status === "active"
                            ? "Tersedia"
                            : "Menunggu Pembayaran"}
                        </div>
                      </div>
                      <ParticipantCardButton
                        name={participant.name}
                        id={participant.id || ""}
                        school={participant.school.name}
                        region={participant.region || ""}
                        imgUrl={participant.img}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Alert className="bg-muted/50 border-muted">
                <div className="flex items-center h-full gap-2">
                  <p className="flex flex-wrap gap-2 text-wrap ">
                    <span className="flex items-center gap-2 font-semibold">
                      <Info className="w-4 h-4" />
                      Penting :
                    </span>
                    Pastikan semua data sudah benar ya, jika ada kesalahan data,
                    segera hubungi panitia ya!~ 😊
                  </p>
                </div>
              </Alert>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}
