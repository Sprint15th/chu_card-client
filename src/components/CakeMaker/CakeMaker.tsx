import React from "react";
import Preview from "../Preview";
import ShapeController from "../ShapeController";
import ToppingController from "../ToppingController/ToppingController";

const CakeMaker = () => {
  return (
    <>
      <Preview />
      <section>
        <ShapeController />
        <ToppingController />
      </section>
    </>
  );
};

export default CakeMaker;
