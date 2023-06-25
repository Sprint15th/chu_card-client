import React from "react";
import { useRecoilValue } from "recoil";
import { cakeState } from "@/store/cakeState";

const Preview = () => {
  const {
    steps: { appearance, decoration },
  } = useRecoilValue(cakeState);

  return <article>preview</article>;
};

export default Preview;
