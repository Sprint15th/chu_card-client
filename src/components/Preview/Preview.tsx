import React from 'react';
import Image from 'next/image';
import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';
import { cakeState } from '@/store/cakeState';
import { CREATE_STEPS } from '@/constants/createStep';
import { Appearance, Decoration } from '@/types/cake';
import { SHAPE } from '@/constants/cake';

const capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

const getImageSrc = (appearance: Appearance, decoration: Decoration) => {
  const defaultPath = (path: string) => `/images/${path}.png`;

  const shape = capitalizeFirstLetter(appearance.shape || SHAPE.CIRCLE);
  const topping = capitalizeFirstLetter(decoration.topping || '');

  return defaultPath(`${shape}${topping}`);
};

const Preview = () => {
  const {
    selectedIndex,
    steps: { appearance, decoration },
  } = useRecoilValue(cakeState);

  const title = CREATE_STEPS[selectedIndex]?.title || CREATE_STEPS[0].title;
  const imgSrc = getImageSrc(appearance, decoration);

  return (
    <S.Container>
      <S.Title>{title}</S.Title>
      <S.Frame>
        <Image alt='frame' src='/frame.svg' width={375} height={348} />
        <S.CakeAppearance>
          <Image alt='cake' src={imgSrc} width={160} height={160} />
        </S.CakeAppearance>
      </S.Frame>
    </S.Container>
  );
};

export default Preview;

const S = {
  Container: styled.article`
    display: flex;
    flex-direction: column;
    align-items: center;
    user-select: none;
    margin-bottom: 2px;
  `,
  Title: styled.h3`
    font-size: 18px;
    line-height: 21.6px;
  `,
  Frame: styled.div`
    position: relative;
  `,
  CakeAppearance: styled.div`
    display: flex;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
  `,
};
