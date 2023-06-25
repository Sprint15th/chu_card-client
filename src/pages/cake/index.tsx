import CakeMaker from '@/components/CakeMaker';
import ConfirmModal from '@/components/ConfirmModal';
import DecorationMaker from '@/components/DecorationMaker';
import LetterMaker from '@/components/LetterMaker';

import { cakeState } from '@/store/cakeState';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from '@emotion/styled';
import GiftBox from '@/components/GiftBox';
import { useRouter } from 'next/navigation';
import TopNavigationBar from '@/components/TopNavigationBar';
import { Appearance, Decoration, Letter, Topping } from '@/types/cake';
import { Cake } from '@/types/cake.type';
import prisma from '@/utils/prismaClient';

const serializeObjectForServer = ({
  appearance,
  decoration,
  letter,
}: {
  appearance: Appearance;
  decoration: Decoration;
  letter: Letter;
}) => {
  const { color, shape } = appearance;
  const topping = decoration.topping as Topping;
  const { sender, receiver, message } = letter;

  return {
    color,
    shape,
    topping,
    sender,
    receiver,
    message,
  };
};

const addCake = async (data: Omit<Cake, 'cakeId' | 'createdAt'>) => {
  try {
    const cake = await prisma.cake.create({
      data,
    });

    return cake;
  } catch (err) {
    alert(`에러가 발생했습니다!`);
  }
};

const Cake = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { selectedIndex, steps } = useRecoilValue(cakeState);
  const [showGift, setShowGift] = useState(false);
  const router = useRouter();

  const handleConfirm = async () => {
    const params = serializeObjectForServer({ ...steps });
    const { cakeId }: any = await addCake(params);

    setIsModalOpen(false);
    setShowGift(true);

    if (!cakeId) return;
    setTimeout(() => {
      router.push(`/cake/complete/${cakeId}`);
    }, 3000);
  };

  const getComponentByStep = (step: number) => {
    switch (step) {
      case 0:
        return <CakeMaker />;
      case 1:
        return <DecorationMaker />;
      case 2:
        return <LetterMaker onDone={() => setIsModalOpen(true)} />;
      default:
        return <CakeMaker />;
    }
  };

  if (showGift)
    return (
      <GiftContainer>
        <GiftBox text='소중한분에게 선물이 배달되고 있어요.'></GiftBox>
      </GiftContainer>
    );

  return (
    <div style={{ padding: '16px' }}>
      <TopNavigationBar selectedIndex={selectedIndex} />
      <main>{getComponentByStep(selectedIndex)}</main>
      {isModalOpen && (
        <ConfirmModal onConfirm={handleConfirm} closeModal={() => setIsModalOpen(false)} selector='#portal' />
      )}
    </div>
  );
};

export default Cake;

const GiftContainer = styled.div`
  background-color: #ffa0a0;
  min-height: calc(var(--vh, 1vh) * 100);
`;
