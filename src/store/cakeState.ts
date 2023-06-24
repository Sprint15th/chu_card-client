import { atom } from "recoil";
import { CREATE_STATE } from "@/constants/createStep";
import { Appearance, Decoration } from "@/types/cake";

export type CreateCakeState = {
  selectedIndex: number;
  steps: {
    appearance: Appearance;
    decoration: Decoration;
  };
};

export const KEY = "cakeState";

export const cakeState = atom<CreateCakeState>({
  key: KEY,
  default: {
    ...CREATE_STATE,
  },
});
