import { useLayoutEffect, useRef } from 'react';
import styled from '@emotion/styled';
import autoSize from '@/utils/autoSize';
import Image from 'next/image';
import type { StaticImageData } from 'next/image';
import type { LetterData } from '@/types/letter';

const MAX_MESSAGE_LENGTH = 100;
const MAX_RECEIVER_LENGTH = 20;
const MAX_SENDER_LENGTH = 20;

interface LetterProps {
  letterData: LetterData;
  imagePath: string | StaticImageData;
  isPreview?: boolean;
  onChangeMessage?: (value: string) => void;
  onChangeSender?: (value: string) => void;
  onChangeReceiver?: (value: string) => void;
}

const Letter = ({
  letterData,
  imagePath,
  isPreview = false,
  onChangeMessage = () => {},
  onChangeReceiver = () => {},
  onChangeSender = () => {},
}: LetterProps) => {
  const senderRef = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    if (senderRef.current) {
      autoSize(senderRef.current);
    }
  }, [letterData.sender]);

  return (
    <S.Container>
      <S.Image src={imagePath} alt='cake' width={230} height={230} />
      <S.Letter>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <label htmlFor='receiver'>To.</label>
          <input
            id='receiver'
            value={letterData.receiver}
            style={{ width: '100%' }}
            onChange={e => {
              if (e.target.value.length > MAX_RECEIVER_LENGTH) return;
              onChangeReceiver(e.target.value);
            }}
            onFocus={e => isPreview && e.target.blur()}
            readOnly={isPreview}
          />
        </div>
        <S.Textarea
          value={letterData.message}
          onChange={e => {
            if (e.target.value.length > MAX_MESSAGE_LENGTH) return;
            onChangeMessage(e.target.value);
          }}
          onFocus={e => isPreview && e.target.blur()}
          readOnly={isPreview}
        />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'end',
            gap: '5px',
            padding: '0 10px',
          }}
        >
          <label htmlFor='sender'>From.</label>
          <input
            id='sender'
            ref={senderRef}
            value={letterData.sender}
            style={{
              width: '15px',
              minWidth: '15px',
              textAlign: 'end',
            }}
            onChange={e => {
              if (e.target.value.length > MAX_SENDER_LENGTH) return;
              onChangeSender(e.target.value);
            }}
            onFocus={e => isPreview && e.target.blur()}
            readOnly={isPreview}
          />
        </div>
      </S.Letter>
    </S.Container>
  );
};

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 25px;
    width: 100%;
    height: calc(var(--vh, 1vh) * 73);
    padding: 20px;
    padding-top: 40px;
    background-image: url('/letter.svg');
    background-size: cover;

    @media (min-height: 700px) {
      height: calc(var(--vh, 1vh) * 75);
    }

    @media (min-height: 1000px) {
      height: calc(var(--vh, 1vh) * 85);
    }
  `,
  ImageContainer: styled.div`
    width: 100%;
  `,
  Image: styled(Image)`
    max-width: 40%;
    height: auto;

    @media (min-height: 700px) {
      max-width: 50%;
    }

    @media (min-height: 1000px) {
      max-width: 80%;
    }
  `,
  Letter: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: calc(var(--vh, 1vh) * 40);
    padding: 10px 20px;
    background-color: #fff5f5;

    input {
      border: none;
      background-color: inherit;
    }

    @media (min-height: 700px) {
      height: calc(var(--vh, 1vh) * 40);
    }

    @media (min-height: 1000px) {
      height: calc(var(--vh, 1vh) * 60);
    }
  `,
  Textarea: styled.textarea`
    flex-grow: 1;
    width: 100%;
    padding: 8px 10px;
    background-attachment: local;
    background-image: linear-gradient(to right, #fff5f5 10px, transparent 10px),
      linear-gradient(to left, #fff5f5 10px, transparent 10px),
      repeating-linear-gradient(#fff5f5, #fff5f5 30px, #ccc 30px, #ccc 31px, #fff5f5 31px);
    line-height: 1.9;
    border: none;
    resize: none;
  `,
};

export default Letter;
