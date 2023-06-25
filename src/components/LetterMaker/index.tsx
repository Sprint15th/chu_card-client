import Letter from '@/components/Letter';
import styled from '@emotion/styled';
import { useRecoilState } from 'recoil';
import { cakeState } from '@/store/cakeState';
import { produce } from 'immer';

interface LetterMakerProps {
  onDone: () => void;
}

const LetterMaker = ({ onDone }: LetterMakerProps) => {
  const [
    {
      steps: { appearance, decoration, letter },
    },
    setCakeState,
  ] = useRecoilState(cakeState);

  const letterData = {
    cake: {
      appearance,
      decoration,
    },
    ...letter,
  };

  const handleMessage = (value: string) => {
    setCakeState(
      produce(({ steps }) => {
        steps.letter.message = value;
      })
    );
  };

  const handleReceiver = (value: string) => {
    setCakeState(
      produce(({ steps }) => {
        steps.letter.receiver = value;
      })
    );
  };

  const handleSender = (value: string) => {
    setCakeState(
      produce(({ steps }) => {
        steps.letter.sender = value;
      })
    );
  };

  const handleClick = () => {
    if (!letterData.message || !letterData.receiver || !letterData.sender)
      return alert('모든 항목을 입력해주세요');

    onDone();
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
      <S.Button onClick={handleClick}>작성완료</S.Button>
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
