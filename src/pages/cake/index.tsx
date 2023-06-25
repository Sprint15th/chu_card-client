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
  const { selectedIndex } = useRecoilValue(cakeState);

  const handleConfirm = () => {
    //TODO: 서버에 저장하는 로직
    setIsModalOpen(false);
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

  return (
    <div style={{ padding: '16px' }}>
      <TopNavigationBar selectedIndex={selectedIndex} />
      <main>{getComponentByStep(selectedIndex)}</main>
      {isModalOpen && (
        <ConfirmModal
          onConfirm={handleConfirm}
          closeModal={() => setIsModalOpen(false)}
          selector='#portal'
        />
      )}
    </div>
  );
};

export default Cake;
