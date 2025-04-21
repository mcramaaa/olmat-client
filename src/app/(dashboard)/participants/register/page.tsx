import type { Metadata } from "next";
import ParticipantForm from "../_components/ParticipantForm";
import { getProvinceAction } from "@/app/(auth)/register/register.action";
import { APPCONSTANT } from "@/constant/App.constant";

export const metadata: Metadata = {
  title: "Register Participants - Math Olympiad 2025",
  description:
    "Register participants for the International Mathematics Olympiad 2025",
};

export default async function RegisterParticipantsPage() {
  const resProv = await getProvinceAction();
  const prov = resProv.data.map((item: any) => ({
    label: item.name,
    value: item.id,
  }));
  return (
    <div className="pb-12  md:px-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Pendaftaran OLMAT UINSA</h1>
          <p className="text-gray-500">{APPCONSTANT.theme}</p>
        </div>

        <ParticipantForm provinceOptions={prov} />
      </div>
    </div>
  );
}
