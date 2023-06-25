import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export default function OpenAnimation() {
  return (
    <Motion
      animate={{
        scale: [0.5, 15, 0],
        rotate: [0, 0, 180, 180, 0],
        borderRadius: ['50%', '50%', '50%', '50%', '50%'],
      }}
      transition={{
        duration: 1.1,
        ease: 'easeOut',
        times: [0, 0.2, 0.5, 0.8, 1],
        repeatDelay: 1,
      }}
    />
  );
}

export const Motion = styled(motion.div)`
  position: absolute;
  z-index: 100;
  width: 200px;
  height: 200px;
  background: #f7f7f7;
  top: calc(var(--vh, 1vh) * 40);
  left: calc(50% - 100px);
`;
