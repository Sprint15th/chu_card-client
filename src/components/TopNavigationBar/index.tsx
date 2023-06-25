import { CREATE_STEPS, STEP } from '@/constants/createStep';
import useStepController from '@/hooks/useStepController';
import { cakeState } from '@/store/cakeState';
import styled from '@emotion/styled';
import Image from 'next/image';
import { useRecoilValue } from 'recoil';

interface TopNavigationBarProps {
  selectedIndex: number;
}

const isValid = (str: string) => str.length !== 0;

const TopNavigationBar = ({ selectedIndex }: TopNavigationBarProps) => {
  const {
    steps: { decoration },
  } = useRecoilValue(cakeState);
  const { prev, next } = useStepController();

  const handleLeftClick = () => {
    prev();
  };

  const handleRightClick = () => {
    if (!isMoveNextStep()) return;
    next();
  };

  const isMoveNextStep = () => {
    const currentStep = CREATE_STEPS[selectedIndex].label;

    if (currentStep === CREATE_STEPS[1].label) return isValid(decoration.topping || '');

    return true;
  };

  return (
    <S.Container>
      {selectedIndex !== STEP.MIN ? (
        <Image
          src='/arrow_left.svg'
          alt='left'
          width={24}
          height={24}
          onClick={handleLeftClick}
          style={{ cursor: 'pointer' }}
        />
      ) : (
        <div />
      )}
      {selectedIndex !== STEP.MAX ? (
        <Image
          src='/arrow_right.svg'
          alt='right'
          width={24}
          height={24}
          onClick={handleRightClick}
          style={{ cursor: 'pointer' }}
        />
      ) : (
        <div />
      )}
    </S.Container>
  );
};

const S = {
  Container: styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 0;

    svg {
      cursor: pointer;
    }
  `,
};

export default TopNavigationBar;
