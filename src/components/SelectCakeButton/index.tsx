import styled from '@emotion/styled';
import Image from 'next/image';
import type { StaticImageData } from 'next/image';

interface SelectCakeButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  imagePath: string | StaticImageData;
  name: string;
  onClick?: () => void;
}

const SelectCakeButton = ({ imagePath, name, onClick, ...props }: SelectCakeButtonProps) => {
  return (
    <S.Button onClick={onClick} {...props}>
      <Image src={imagePath} alt='selectCake' width={100} height={100} />
      <S.Text>{name}</S.Text>
    </S.Button>
  );
};

const S = {
  Button: styled.button`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 165px;
    height: 132px;
    border-radius: 8px;
  `,
  Text: styled.p`
    font-size: 14px;
    font-family: 'Cafe24Oneprettynight';
  `,
};

export default SelectCakeButton;
