import React, { HTMLAttributes, useEffect, useState } from 'react';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { kakaoClipboard } from 'react-kakao-share';
import styled from '@emotion/styled';
import prisma from '@/utils/prismaClient';
import OpenAnimation from '@/components/OpenAnimation';
import GiftBox from '@/components/GiftBox';

import { cakeState } from '@/store/cakeState';

import Meta from '@/components/Metadata';
import Letter from '@/components/Letter';

import type { Cake } from '@/types/cake.type';
import { CAKE_PATH } from '@/constants/cakePath';

type Props = {
  initialCake: Cake;
  kakaoShareData: {
    title: string;
    description: string;
    image: string;
    APIKEY: string;
  };
};

export default function CakeConfirm({ initialCake, kakaoShareData }: Props) {
  const [animationTrigger, setAnimationTrigger] = useState(0);
  const [isOpenGift, setIsOpenGift] = useState(false);

  const router = useRouter();
  const setCreateCakeState = useSetRecoilState(cakeState);
  const createCakeState = initializeCreateCakeState(initialCake);
  const resetCreateCakeState = useResetRecoilState(cakeState);

  const letterData = {
    cake: createCakeState.steps,
    message: initialCake.message,
    sender: initialCake.sender,
    receiver: initialCake.receiver,
  };

  useEffect(() => {
    setCreateCakeState(createCakeState);
  }, []);

  const cakeImagePath = `/images/${CAKE_PATH[`${initialCake.shape}_${initialCake.topping}`]}.png`;

  return (
    <>
      <Meta title={kakaoShareData.title} description={kakaoShareData.description} image={kakaoShareData.image} />
      {animationTrigger !== 0 && <OpenAnimation key={animationTrigger} />}
      {isOpenGift ? (
        <React.Fragment>
          <Wrapper>
            <Navigation>
              <HomeButton
                onClick={() => {
                  resetCreateCakeState();
                  router.push('/');
                }}
              />
            </Navigation>
            <Letter letterData={letterData} imagePath={cakeImagePath} isPreview={true} />
            <ButtonContainer>
              <Button onClick={() => kakaoClipboard(kakaoShareData)}>공유하기</Button>
            </ButtonContainer>
          </Wrapper>
        </React.Fragment>
      ) : (
        <GiftRoot>
          <GiftBoxContainer
            onClick={() => {
              setAnimationTrigger(animationTrigger + 1);
              setTimeout(() => {
                setIsOpenGift(prev => !prev);
              }, 500);
            }}
          >
            <GiftBox text='어떤 선물이 배달 되었을까요?'></GiftBox>
          </GiftBoxContainer>
        </GiftRoot>
      )}
    </>
  );
}

const initializeCreateCakeState = (initialCake: Cake) => ({
  selectedIndex: 2,
  steps: {
    appearance: {
      color: initialCake.color,
      shape: initialCake.shape,
    },
    decoration: {
      topping: initialCake.topping,
    },
    letter: {
      sender: initialCake.sender,
      receiver: initialCake.receiver,
      message: initialCake.message,
    },
  },
});

export const getServerSideProps = async ({ query, req }: GetServerSidePropsContext) => {
  const cake = await prisma.cake.findUnique({
    where: {
      cakeId: Number(query.id),
    },
  });

  if (!cake) {
    return {
      redirect: '/',
    };
  }

  const data: Cake = {
    cakeId: `${cake.cakeId}`,
    color: cake.color as Cake['color'],
    shape: cake.shape as Cake['shape'],
    topping: cake.topping as Cake['topping'],
    sender: cake.sender,
    receiver: cake.receiver,
    message: cake.message,
  };

  return {
    props: {
      initialCake: data,
      kakaoShareData: getClipData(data),
    },
  };
};

const GITHUB_REPO_PATH = 'https://github.com/Sprint15th/chu_card-client/blob/develop/public/images';

const getClipData = (cake: Cake) => ({
  title: `${cake.sender}님께서 ${cake.receiver}에게 축하메시지를 보냈습니다.`,
  description: cake.message,
  image: `${GITHUB_REPO_PATH}/${CAKE_PATH[`${cake.shape}_${cake.topping}`]}.png?raw=true`,
  APIKEY: process.env.NEXT_PUBLIC_KAKAO_API_KEY,
});

const Wrapper = styled.div`
  background-color: #f6f4eb;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 15px 18px;
`;

const Navigation = styled.div`
  padding: 15px 0;
`;

const ButtonContainer = styled.div`
  margin-top: 28px;
  display: flex;
  gap: 16px;
`;

const Button = styled.button`
  padding: 12px;
  background-color: #ffe4d0;
  border-radius: 26px;
  flex: 1;
`;

const HomeButton = (props: HTMLAttributes<HTMLButtonElement>) => {
  return (
    <button {...props}>
      <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <g id='home'>
          <path
            id='Vector'
            d='M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z'
            stroke='black'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            id='Vector_2'
            d='M9 22V12H15V22'
            stroke='black'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </g>
      </svg>
    </button>
  );
};

export const GiftRoot = styled.div`
  background-color: #ffa0a0;
  min-height: calc(var(--vh, 1vh) * 100);
`;

export const GiftBoxContainer = styled.div``;
