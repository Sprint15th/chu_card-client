import styled from "@emotion/styled";

const BackDrop = styled.div`
  width: 100vw;
  height: calc(var(--vh, 1vh) * 100);

  position: fixed;
  top: 0;
  left: 0;

  display: flex;
  justify-content: center;

  background-color: rgba(0, 0, 0, 0.5);

  z-index: 99;
`;

export default BackDrop;
