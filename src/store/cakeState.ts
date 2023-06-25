import { atom } from 'recoil';
import { CREATE_STATE } from '@/constants/createStep';
import { Appearance, Decoration, Letter } from '@/types/cake';

export type CreateCakeState = {
  selectedIndex: number;
  steps: {
    appearance: Appearance;
    decoration: Decoration;
    letter: Letter;
  };
};

export const KEY = 'cakeState';

export const cakeState = atom<CreateCakeState>({
  key: KEY,
  default: {
    ...CREATE_STATE,
  },
});
