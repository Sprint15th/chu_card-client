import { produce } from 'immer';
import { useSetRecoilState } from 'recoil';
import { COLOR, SHAPE } from '@/constants/cake';
import { cakeState } from '@/store/cakeState';
import type { Color, Shape } from '@/types/cake';
import styled from '@emotion/styled';

const getColorByShape = (shape: Shape) => {
  let color: Color;

  switch (shape) {
    case SHAPE.CIRCLE:
      color = COLOR.CHOCOLATE;
      break;
    case SHAPE.HEART:
      color = COLOR.BERRY;
    case SHAPE.SQUARE:
      color = COLOR.CREAM;
    default:
      color = COLOR.CHOCOLATE;
  }

  return color;
};

const ShapeController = () => {
  const setCakeState = useSetRecoilState(cakeState);

  const handleClick = (selectedShape: Shape) => {
    const nextColor = getColorByShape(selectedShape);

    setCakeState(
      produce(prev => {
        prev.steps.appearance = {
          shape: selectedShape,
          color: nextColor,
        };
      })
    );
  };

  return (
    <Root>
      {Object.values(SHAPE).map(shape => (
        <Button key={shape} onClick={() => handleClick(shape)}>
          <CakeContainer>
            <CakeImage src={getImageSrc(shape)} alt={shape} />
            {transelate(shape)}
          </CakeContainer>
        </Button>
      ))}
    </Root>
  );
};

export default ShapeController;

const getImageSrc = (name: (typeof SHAPE)[keyof typeof SHAPE]) => {
  const strReplace = (str: string) =>
    str.length === 0 ? str : str[0].toUpperCase() + str.slice(1, str.length).toLowerCase();

  return `/images/${strReplace(name)}.png`;
};

const transelate = (shape: Shape) => {
  switch (shape) {
    case SHAPE.CIRCLE:
      return '원';
    case SHAPE.HEART:
      return '하트';
    case SHAPE.SQUARE:
      return '사각형';
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

const CakeContainer = styled.div`
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
