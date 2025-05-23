import { eventSettingAction } from "@/lib/auth.action";
import {
  getAllCityAction,
  getAllRegionAction,
} from "./(auth)/register/register.action";
import HomeV2 from "./landing/HomeV2";
import { getParticipantCount } from "./landing/landing.action";

export default async function Home() {
  const [resRegion, resCities, resParticipantsCount, resEventSetting] =
    await Promise.all([
      getAllRegionAction(),
      getAllCityAction(),
      getParticipantCount(),
      eventSettingAction(),
    ]);
  return (
    <HomeV2
      cities={resCities.data}
      regions={resRegion.data}
      participanCountData={resParticipantsCount.data}
      event={resEventSetting.data}
    />
  );
}
