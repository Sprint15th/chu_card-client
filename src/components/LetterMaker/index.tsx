import Letter from '@/components/Letter';
import styled from '@emotion/styled';
import { useRecoilState } from 'recoil';
import { cakeState } from '@/store/cakeState';
import { produce } from 'immer';

const cake = {
  appearance: {
    valid: true,
    value: {
      color: 'CHOCOLATE',
      shape: 'CIRCLE',
    },
  },
  decoration: {
    valid: true,
    value: {
      topping: 'CHERRY',
    },
  },
} as const;

interface LetterMakerProps {
  onDone: () => void;
}

const LetterMaker = ({ onDone }: LetterMakerProps) => {
  const [
    {
      steps: { letter },
    },
    setCakeState,
  ] = useRecoilState(cakeState);

  const letterData = {
    cake,
    ...letter.value,
  };

  const handleMessage = (value: string) => {
    setCakeState(
      produce(({ steps }) => {
        steps.letter.value.message = value;
      })
    );
  };

  const handleReceiver = (value: string) => {
    setCakeState(
      produce(({ steps }) => {
        steps.letter.value.receiver = value;
      })
    );
  };

  const handleSender = (value: string) => {
    setCakeState(
      produce(({ steps }) => {
        steps.letter.value.sender = value;
      })
    );
  };

  return (
    <S.Container>
      <Letter
        letterData={letterData}
        imagePath=''
        onChangeMessage={handleMessage}
        onChangeReceiver={handleReceiver}
        onChangeSender={handleSender}
      />
      <S.Button onClick={onDone}>작성완료</S.Button>
    </S.Container>
  );
};

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    gap: 40px;
    width: 100%;
    height: 100%;
  `,
  Button: styled.button`
    width: 100%;
    padding: 12px 86px;
    background-color: #ffe4d0;
    border-radius: 27px;
    line-height: 27px;
    font-size: 18px;
    border: none;
  `,
};

export default LetterMaker;
