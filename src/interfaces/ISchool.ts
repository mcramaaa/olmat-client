export interface ISchool {
  province_id: string;
  city_id: string;
  city: { region: { name: string } };
  subdistrict_id: number;
  address: string;
  degree_id: string;
  name: string;
  email: string;
  phone: string;
  whatsapp: string;
}
