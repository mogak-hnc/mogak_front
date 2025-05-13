import { create } from "zustand";
import { MainSubCardProps } from "@/types";

type SearchResultState = {
  data: MainSubCardProps[];
  setData: (newData: MainSubCardProps[]) => void;
};

export const useSearchResultStore = create<SearchResultState>((set) => ({
  data: [],
  setData: (newData) => set({ data: newData }),
}));
