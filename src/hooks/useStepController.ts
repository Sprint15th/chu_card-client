import { CreateCakeState, cakeState } from '@/store/cakeState';
import { useSetRecoilState } from 'recoil';

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
