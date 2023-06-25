import React from 'react';
import Image from 'next/image';
import { useRecoilValue } from 'recoil';
import { cakeState } from '@/store/cakeState';
import { CREATE_STEPS } from '@/constants/createStep';

const Preview = () => {
  const {
    selectedIndex,
    steps: { appearance, decoration },
  } = useRecoilValue(cakeState);

  return (
    <article>
      <h3>{CREATE_STEPS[selectedIndex].title}</h3>
      <Image alt="frame" src='/frame.svg' width={382} height={348} />
    </article>
  );
};

export default Preview;
