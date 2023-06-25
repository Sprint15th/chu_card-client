import CakeMaker from "@/components/CakeMaker";
import useStepController, { STEP } from "@/hooks/useStepController";
import { cakeState } from "@/store/cakeState";
import { useRecoilValue } from "recoil";

const getComponentByStep = (step: number) => {
  switch (step) {
    case 0:
      return <CakeMaker />;
    case 1:
      return <Letter />;
    default:
      return <CakeMaker />;
  }
};

interface Props {
  children?: React.ReactNode;
}

const Cake = () => {
  const { selectedIndex } = useRecoilValue(cakeState);

  return (
    <>
      <StepController />
      <Panel>{getComponentByStep(selectedIndex)}</Panel>
    </>
  );
};

export default Cake;

const StepController = () => {
  const { selectedIndex } = useRecoilValue(cakeState);
  const { next, prev } = useStepController();

  const isShowLeftArrow = selectedIndex > STEP.MIN;
  const isShowRightArrow = selectedIndex < STEP.MAX;

  return (
    <header>
      {isShowLeftArrow && (
        <button type="button" onClick={prev}>
          {"<"}
        </button>
      )}
      {isShowRightArrow && (
        <button type="button" onClick={next}>
          {">"}
        </button>
      )}
    </header>
  );
};

const Panel = ({ children }: Props) => <main>{children}</main>;

const Letter = () => {
  return <div>Letter</div>;
};
