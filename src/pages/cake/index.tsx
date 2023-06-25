import CakeMaker from '@/components/CakeMaker';
import ConfirmModal from '@/components/ConfirmModal';
import DecorationMaker from '@/components/DecorationMaker';
import LetterMaker from '@/components/LetterMaker';
import TopNavigationBar from '@/components/TopNavigationBar';

import { cakeState } from '@/store/cakeState';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';

const Cake = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { selectedIndex, steps } = useRecoilValue(cakeState);

  const { appearance, decoration, letter } = steps;

  const handleDone = () => {
    if (!appearance.valid) {
      alert('케이크 모양을 선택해주세요.');
      return;
    }

    if (!decoration.valid) {
      alert('케이크 장식을 선택해주세요.');
      return;
    }

    if (!letter.valid) {
      alert('케이크 메시지를 입력해주세요.');
      return;
    }

    //TODO: 서버로 전송
  };

  const getComponentByStep = (step: number) => {
    switch (step) {
      case 0:
        return <CakeMaker />;
      case 1:
        return <DecorationMaker />;
      case 2:
        return <LetterMaker onDone={handleDone} />;
      default:
        return <CakeMaker />;
    }
  };

  return (
    <div style={{ padding: '16px' }}>
      <TopNavigationBar selectedIndex={selectedIndex} />
      <main>{getComponentByStep(selectedIndex)}</main>
      {isModalOpen && <ConfirmModal closeModal={() => setIsModalOpen(false)} selector='' />}
    </div>
  );
};

export default Cake;
