import { LetterData } from '@/types/letter';
import styled from '@emotion/styled';
import autoSize from '@/utils/autoSize';
import Image from 'next/image';
import type { StaticImageData } from 'next/image';

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
  onChangeMessage = () => {},
  onChangeReceiver = () => {},
  onChangeSender = () => {},
  isPreview = false,
}: LetterProps) => {
  return (
    <S.Container>
      <Image src={imagePath} alt='cake' width='230' height='230' />
      <S.Letter>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <p>To.</p>
          <input value={letterData.receiver} onChange={e => onChangeReceiver(e.target.value)} readOnly={isPreview} />
        </div>
        <S.Textarea
          value={letterData.message}
          onChange={e => {
            if (e.target.value.length > 100) return;
            onChangeMessage(e.target.value);
          }}
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
          <p>From.</p>
          <input
            value={letterData.sender}
            style={{
              width: '15px',
              minWidth: '15px',
              textAlign: 'end',
            }}
            onChange={e => {
              if (e.target.value.length > 20) return;
              autoSize(e.target);
              onChangeSender(e.target.value);
            }}
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
    min-height: 570px;
    padding: 20px;
    padding-top: 40px;
    background-image: url('/letter.svg');
    background-size: cover;
    input {
      border: none;
      background-color: inherit;
    }
  `,
  Letter: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 243px;
    padding: 10px 20px;
    background-color: #fff5f5;
  `,
  Textarea: styled.textarea`
    flex-grow: 1;
    width: 100%;
    padding: 8px 10px;
    background-attachment: local;
    background-image: linear-gradient(to right, #fff5f5 10px, transparent 10px),
      linear-gradient(to left, #fff5f5 10px, transparent 10px),
      repeating-linear-gradient(#fff5f5, #fff5f5 30px, #ccc 30px, #ccc 31px, #fff5f5 31px);
    line-height: 31px;
    border: none;
    resize: none;
  `,
};

export default Letter;
