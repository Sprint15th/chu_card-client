import Letter from '@/components/Letter';
import { useState } from 'react';
import styled from '@emotion/styled';

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

const LetterForm = () => {
  const [message, setMessage] = useState('');
  const [sender, setSender] = useState('');
  const [receiver, setReceiver] = useState('');

  const letterData = {
    cake,
    message,
    sender,
    receiver,
  };

  const handleMessage = (value: string) => {
    setMessage(value);
  };

  const handleSender = (value: string) => {
    setSender(value);
  };

  const handleReceiver = (value: string) => {
    setReceiver(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(letterData);
    // TODO: API 요청
  };

  return (
    <S.Form onSubmit={handleSubmit}>
      <Letter
        letterData={letterData}
        onChangeMessage={handleMessage}
        onChangeReceiver={handleReceiver}
        onChangeSender={handleSender}
      />
      <S.Button type='submit'>작성완료</S.Button>
    </S.Form>
  );
};

const S = {
  Form: styled.form`
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

export default LetterForm;
