import {
  getAllCityAction,
  getAllRegionAction,
} from "./(auth)/register/register.action";
import HomeV2 from "./landing/HomeV2";

export default async function Home() {
  const resCities = await getAllCityAction();
  const getRegions = await getAllRegionAction();
  return <HomeV2 cities={resCities.data} regions={getRegions.data} />;
}
