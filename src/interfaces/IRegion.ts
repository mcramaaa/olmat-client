export interface IRegion {
  id: string;
  name: string;
  captain: string;
  contact: string;
  cities?: {
    id: string;
    name: string;
  }[];
}
