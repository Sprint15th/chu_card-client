import { useSetRecoilState } from "recoil";
import { produce } from "immer";
import { CREATE_STEPS } from "@/constants/createStep";
import { CreateCakeState, cakeState } from "@/store/cakeState";

export const STEP = {
  MIN: 0,
  MAX: CREATE_STEPS.length - 1,
};

const getNextStep = (value: number) => {
  if (value < STEP.MIN) return STEP.MIN;
  if (value > STEP.MAX) return STEP.MAX;

  return value;
};

const useStepController = () => {
  const setCreateCakeState = useSetRecoilState(cakeState);

  const next = () => {
    setCreateCakeState(
      produce((prev: CreateCakeState) => ({
        ...prev,
        selectedIndex: getNextStep(prev.selectedIndex + 1),
      }))
    );
  };

  const prev = () => {
    setCreateCakeState(
      produce((prev: CreateCakeState) => ({
        ...prev,
        selectedIndex: getNextStep(prev.selectedIndex - 1),
      }))
    );
  };

  return {
    prev,
    next,
  };
};

export default useStepController;
