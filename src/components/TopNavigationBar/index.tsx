import useStepController from "@/hooks/useStepController";
import styled from "@emotion/styled";
import Image from "next/image";

interface TopNavigationBarProps {
  selectedIndex: number;
}

const TopNavigationBar = ({ selectedIndex }: TopNavigationBarProps) => {
  const { prev, next } = useStepController();

  const handleLeftClick = () => {
    prev();
  };

  const handleRightClick = () => {
    next();
  };

  return (
    <S.Container>
      {selectedIndex !== 0 ? (
        <Image
          src="/arrow_left.svg"
          alt="left"
          width={24}
          height={24}
          onClick={handleLeftClick}
          style={{ cursor: "pointer" }}
        />
      ) : (
        <div></div>
      )}
      {selectedIndex !== 2 ? (
        <Image
          src="/arrow_right.svg"
          alt="right"
          width={24}
          height={24}
          onClick={handleRightClick}
          style={{ cursor: "pointer" }}
        />
      ) : (
        <div></div>
      )}
    </S.Container>
  );
};

const S = {
  Container: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 0;

    svg {
      cursor: pointer;
    }
  `,
};

export default TopNavigationBar;
