import { CREATE_STEPS } from "@/constants/createStep";
import { CreateCakeState, cakeState } from "@/store/cakeState";
import { useSetRecoilState } from "recoil";

export const STEP = {
  MIN: 0,
  MAX: CREATE_STEPS.length - 1,
};

const useStepController = () => {
  const setCreateCakeState = useSetRecoilState(cakeState);

  const next = () => {
    setCreateCakeState((prev: CreateCakeState) => ({
      ...prev,
      selectedIndex: prev.selectedIndex + 1,
    }));
  };

  const prev = () => {
    setCreateCakeState((prev: CreateCakeState) => ({
      ...prev,
      selectedIndex: prev.selectedIndex - 1,
    }));
  };

  const setSelectedIndex = (index: number) =>
    setCreateCakeState((prev: CreateCakeState) => ({
      ...prev,
      selectedIndex: index,
    }));

  return {
    prev,
    next,
    setSelectedIndex,
  };
};

export default useStepController;
