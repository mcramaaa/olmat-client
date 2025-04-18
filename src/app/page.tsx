import { getAllCityAction } from "./(auth)/register/register.action";
import HomeV2 from "./landing/HomeV2";

export default async function Home() {
  const resCities = await getAllCityAction();
  return <HomeV2 cities={resCities.data} />;
}
