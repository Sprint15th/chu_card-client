import GiftBox from '@/components/GiftBox';
import styled from '@emotion/styled';
import OpenAnimation from '@/components/OpenAnimation';
import { useState } from 'react';
import type { Cake } from '@/types/cake.type';
import { GetServerSideProps } from 'next';
import Letter from '@/components/Letter';
import Meta from '@/components/Metadata';
import { useRouter } from 'next/navigation';
import cardService from '@/services/Card.service';
import { useSetRecoilState } from 'recoil';
import { cakeState } from '@/store/cakeState';

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
  const setCreateCakeState = useSetRecoilState(cakeState);
  const createCakeState = initializeCreateCakeState(initialCake);

  const letterData = {
    cake: createCakeState.steps,
    message: initialCake.message,
    sender: initialCake.sender,
    receiver: initialCake.receiver,
  };

  return (
    <>
      <Meta title={kakaoShareData.title} description={kakaoShareData.description} image={kakaoShareData.image} />
      {animationTrigger !== 0 && <OpenAnimation key={animationTrigger} />}
      {isOpenGift ? (
        <>
          <Wrapper>
            <Navigation></Navigation>
            <Letter letterData={letterData} imagePath={''} />
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

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const cake = await cardService.fetchCakeCardDetail(query.id as string);
  console.log(cake);

  return {
    props: {
      initialCake: cake,
      kakaoShareData: getClipData(cake),
    },
  };
};

const initializeCreateCakeState = (initialCake: Cake) => ({
  selectedIndex: 2,
  steps: {
    appearance: {
      valid: true,
      value: {
        color: initialCake.color,
        shape: initialCake.shape,
      },
    },
    decoration: {
      valid: true,
      value: {
        topping: initialCake.topping,
      },
    },
    letter: {
      valid: true,
      value: {
        sender: initialCake.sender,
        receiver: initialCake.receiver,
        message: initialCake.message,
      },
    },
  },
});

const getClipData = (cake: Cake) => ({
  title: `${cake.sender}님께서 ${cake.receiver}에게 축하선물를 보냈습니다.`,
  description: cake.message,
  image: 'https://cdn.discordapp.com/attachments/1119286155356160110/1122035909295091712/image.png',
  APIKEY: process.env.NEXT_PUBLIC_KAKAO_API_KEY,
});

const getLetterData = (repo: Cake) => {
  return {
    cake: {
      appearance: {
        valid: true,
        value: {
          color: repo.color,
          shape: repo.shape,
        },
      },
      decoration: {
        valid: true,
        value: {
          topping: repo.topping,
        },
      },
    },
    message: repo.message,
    sender: repo.sender,
    receiver: repo.receiver,
  };
};

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
