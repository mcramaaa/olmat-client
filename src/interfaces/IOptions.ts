export interface IOptions {
  province: { label?: string; value?: string }[];
  city: { label?: string; value?: string }[];
  subdistrict: { label?: string; value?: string }[];
  school?: { label?: string; value?: string }[];
  level?: { label?: string; value?: string }[];
}

// import { DefaultOptionType } from "antd/es/select";

// export interface IOptions {
//   city: DefaultOptionType[];
//   subdistrict: DefaultOptionType[];
//   school?: DefaultOptionType[];
//   level?: DefaultOptionType[];
// }
