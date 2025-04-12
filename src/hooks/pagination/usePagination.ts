import { IMetaData } from "@/interfaces/IMetaData";
import { IPaginationOptions } from "@/interfaces/IPagination-options";
import { create } from "zustand";

type TPaginationState = {
  paginationOptions: IPaginationOptions;
  metaData: IMetaData;
  setPaginationOptions: (value: IPaginationOptions) => void;
  setMetaData: (value: IMetaData) => void;
};

export const usePaginationProduct = create<TPaginationState>((set) => ({
  paginationOptions: {
    curentPage: 1,
    pageSize: 10,
  },
  metaData: {
    total: 0,
    current_page: 0,
    per_page: 0,
    total_pages: 0,
    has_next_page: false,
  },
  setPaginationOptions: (value) => set(() => ({ paginationOptions: value })),
  setMetaData: (value) => set(() => ({ metaData: value })),
}));
