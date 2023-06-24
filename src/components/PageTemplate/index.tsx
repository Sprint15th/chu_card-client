import { PropsWithChildren, useEffect } from "react";
import * as Styled from "./styles";

const PageTemplate = (props: PropsWithChildren) => {
  const { children } = props;

  return (
    <Styled.Root>
      <Styled.Container>{children}</Styled.Container>
    </Styled.Root>
  );
};

export default PageTemplate;
