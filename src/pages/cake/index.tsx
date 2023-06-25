import CakeMaker from '@/components/CakeMaker';
import ConfirmModal from '@/components/ConfirmModal';
import DecorationMaker from '@/components/DecorationMaker';
import LetterMaker from '@/components/LetterMaker';
import TopNavigationBar from '@/components/TopNavigationBar';
import { cakeState } from '@/store/cakeState';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from '@emotion/styled';
import GiftBox from '@/components/GiftBox';
import { useRouter } from 'next/navigation';

const Cake = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { selectedIndex } = useRecoilValue(cakeState);
  const [showGift, setShowGift] = useState(false);
  const router = useRouter();

  const handleConfirm = () => {
    //TODO: 서버에 저장하는 로직
    setIsModalOpen(false);
    setShowGift(true);
    setTimeout(() => {
      router.push('/cake/complete/11');
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
