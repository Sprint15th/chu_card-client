import BackDrop from "@/components/BackDrop";
import styled from "@emotion/styled";
import { MouseEvent, PropsWithChildren } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  closeModal: () => void;
  selector: string;
};

const Modal = (props: PropsWithChildren<ModalProps>) => {
  const { closeModal, children, selector } = props;

  const onClickBackdrop = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const element =
    typeof window !== "undefined" && document.querySelector(selector);
  return element && children
    ? createPortal(
        <BackDrop onClick={onClickBackdrop}>
          <Root onClick={onClickBackdrop}>{children}</Root>
        </BackDrop>,
        element
      )
    : null;
};

export default Modal;

const Root = styled.div`
  max-width: 414px;
  width: 100%;
  padding: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
