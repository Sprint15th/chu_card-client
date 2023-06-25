import { TOPPING } from '@/constants/cake';
import { cakeState } from '@/store/cakeState';
import { Topping } from '@/types/cake';
import { produce } from 'immer';
import { useSetRecoilState } from 'recoil';
import styled from '@emotion/styled';

const ToppingController = () => {
  const setCakeState = useSetRecoilState(cakeState);

  const handleClick = (selectedTopping: Topping) => {
    setCakeState(
      produce(prev => {
        prev.steps.decoration = {
          topping: selectedTopping,
        };
      })
    );
  };

  return (
    <Root>
      {Object.values(TOPPING).map(topping => (
        <Button key={topping} onClick={() => handleClick(topping)}>
          <ToppingContainer>
            <CakeImage src={getImageSrc(topping)} alt={topping} />
            {transelate(topping)}
          </ToppingContainer>
        </Button>
      ))}
    </Root>
  );
};

export default ToppingController;

const getImageSrc = (name: (typeof TOPPING)[keyof typeof TOPPING]) => {
  const strReplace = (str: string) =>
    str.length === 0 ? str : str[0].toUpperCase() + str.slice(1, str.length).toLowerCase();

  return `/images/${strReplace(name)}.png`;
};

const transelate = (topping: Topping) => {
  switch (topping) {
    case TOPPING.CHERRY:
      return '체리';
    case TOPPING.BERRY:
      return '딸기';
    case TOPPING.ORANGE:
      return '오렌지';
    case TOPPING.CHOCOLATE:
      return '초콜릿';
  }
};

const Root = styled.article`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 3%;
`;

const Button = styled.button`
  margin-top: 14px;
  background-color: #ffe4d0;
  width: 48.5%;
  height: 130px;
  border-radius: 8px;

  @media (max-height: 700px) {
    height: 88px;
  }
`;

const ToppingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const CakeImage = styled.img`
  width: 46%;

  @media (max-height: 700px) {
    width: 26%;
  }
`;
