import GiftBox from '@/components/GiftBox';
import styled from '@emotion/styled';
import OpenAnimation from '@/components/OpenAnimation';
import { useState } from 'react';
import type { Cake } from '@/types/cake.type';
import { GetServerSidePropsContext } from 'next';
import Letter from '@/components/Letter';
import Meta from '@/components/Metadata';
import { useRouter } from 'next/navigation';
import prisma from '@/utils/prismaClient';

import { useSetRecoilState } from 'recoil';
import { cakeState } from '@/store/cakeState';
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

export default function SharePage({ initialCake, kakaoShareData }: Props) {
  const [animationTrigger, setAnimationTrigger] = useState(0);
  const [isOpenGift, setIsOpenGift] = useState(false);
  const router = useRouter();
  const createCakeState = initializeCreateCakeState(initialCake);

  const letterData = {
    cake: createCakeState.steps,
    message: initialCake.message,
    sender: initialCake.sender,
    receiver: initialCake.receiver,
  };

  const cakeImagePath = `/images/${CAKE_PATH[`${initialCake.shape}_${initialCake.topping}`]}.png`;

  return (
    <>
      <Meta title={kakaoShareData.title} description={kakaoShareData.description} image={kakaoShareData.image} />
      {animationTrigger !== 0 && <OpenAnimation key={animationTrigger} />}
      {isOpenGift ? (
        <>
          <Meta title={kakaoShareData.title} description={kakaoShareData.description} image={kakaoShareData.image} />
          <Wrapper>
            {/* <Navigation>
              <HomeButton onClick={() => router.push('/')} />
            </Navigation> */}
            <Letter letterData={letterData} imagePath={cakeImagePath} />
            <ButtonContainer>
              <Button onClick={() => router.push('/')}>나도 쓰기</Button>
            </ButtonContainer>
          </Wrapper>
        </>
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

const GITHUB_REPO_PATH = 'https://github.com/Sprint15th/chu_card-client/blob/develop/public/images';

const getClipData = (cake: Cake) => ({
  title: `${cake.sender}님께서 ${cake.receiver}에게 축하메시지를 보냈습니다.`,
  description: cake.message,
  image: `${GITHUB_REPO_PATH}/${CAKE_PATH[`${cake.shape}_${cake.topping}`]}.png?raw=true`,
  APIKEY: process.env.NEXT_PUBLIC_KAKAO_API_KEY,
});
export const GiftRoot = styled.div`
  background-color: #ffa0a0;
  min-height: calc(var(--vh, 1vh) * 100);
`;

export const GiftBoxContainer = styled.div``;

const Wrapper = styled.div`
  background-color: #f6f4eb;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 15px 18px;
`;

const Navigation = styled.div``;

const ButtonContainer = styled.div`
  margin-top: 28px;
  display: flex;
  gap: 16px;
`;

const Button = styled.button`
  padding: 12px;
  background-color: #ffe4d0;
  border-radius: 26px;
  font-family: Cafe24 Oneprettynight OTF;
  flex: 1;
`;
