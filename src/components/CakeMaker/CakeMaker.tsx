import { COLOR, SHAPE, TOPPING } from "@/constants/cake";
import { cakeState } from "@/store/cakeState";
import { Color, Shape, Topping } from "@/types/cake";
import { produce } from "immer";
import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

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

interface Props {
  children?: React.ReactNode;
}

const CakeMaker = () => {
  return (
    <>
      <Preview />
      <ControllerList>
        <ShapeController />
        <ToppingController />
      </ControllerList>
    </>
  );
};

export default CakeMaker;

const Preview = () => {
  const {
    steps: { appearance, decoration },
  } = useRecoilValue(cakeState);

  return <article>preview</article>;
};

const ControllerList = ({ children }: Props) => <section>{children}</section>;

const ShapeController = () => {
  const setCakeState = useSetRecoilState(cakeState);

  const handleClick = (selectedShape: Shape) => {
    const nextColor = getColorByShape(selectedShape);

    setCakeState(
      produce((prev) => {
        prev.steps.appearance.value = {
          shape: selectedShape,
          color: nextColor,
        };
      })
    );
  };

  return (
    <article>
      {Object.values(SHAPE).map((shape) => (
        <button key={shape} type="button" onClick={() => handleClick(shape)}>
          {shape}
        </button>
      ))}
    </article>
  );
};

const ToppingController = () => {
  const setCakeState = useSetRecoilState(cakeState);

  const handleClick = (selectedTopping: Topping) => {
    setCakeState(
      produce((prev) => {
        prev.steps.decoration.value = {
          topping: selectedTopping,
        };
      })
    );
  };

  return (
    <article>
      {Object.values(TOPPING).map((topping) => (
        <button
          key={topping}
          type="button"
          onClick={() => handleClick(topping)}
        >
          {topping}
        </button>
      ))}
    </article>
  );
};
