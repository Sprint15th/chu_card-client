import { produce } from 'immer';
import { useSetRecoilState } from 'recoil';
import { COLOR, SHAPE } from '@/constants/cake';
import { cakeState } from '@/store/cakeState';
import type { Color, Shape } from '@/types/cake';

const getColorByShape = (shape: Shape) => {
  let color: Color;

  switch (shape) {
    case SHAPE.CIRCLE:
      color = COLOR.CHOCOLATE;
      break;
    case SHAPE.HEART:
      color = COLOR.BERRY;
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
      produce((prev) => {
        prev.steps.appearance = {
          shape: selectedShape,
          color: nextColor,
        };
      })
    );
  };

  return (
    <article>
      {Object.values(SHAPE).map((shape) => (
        <button key={shape} type='button' onClick={() => handleClick(shape)}>
          {shape}
        </button>
      ))}
    </article>
  );
};

export default ShapeController;
