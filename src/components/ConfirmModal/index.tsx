import Modal from '@/components/Modal';
import styled from '@emotion/styled';

type ConfirmModalProps = {
  selector: string;
  closeModal: () => void;
  onConfirm: () => void;
};

const ConfirmModal = (props: ConfirmModalProps) => {
  const { closeModal, selector, onConfirm } = props;

  return (
    <Modal selector={selector} closeModal={closeModal}>
      <Root>
        <Title>작성을 완료하시겠습니까?</Title>
        <Alert>
          *비방 및 욕설을 자제해 주세요.
          <br />
          *작성 후, 수정할 수 없어요.
        </Alert>
        <ButtonContainer>
          <CancelButton onClick={closeModal}>취소</CancelButton>
          <ConfirmButton onClick={onConfirm}>확인</ConfirmButton>
        </ButtonContainer>
      </Root>
    </Modal>
  );
};

export default ConfirmModal;

const Root = styled.div`
  width: 344px;
  height: 190px;
  padding: 12px 14px;
  background-color: #fff;
  border-radius: 16px;
  font-family: 'Cafe24Oneprettynight';
`;

const Title = styled.div`
  font-size: 20px;
  text-align: center;
  margin: 18px 0 24px 0;
`;

const Alert = styled.div`
  font-size: 16px;
  text-align: center;
  color: rgba(0, 0, 0, 0.54);
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 16px;
`;

const CancelButton = styled.button`
  padding: 14px 24px 14px 24px;
  width: 144px;
  background-color: #ececec;
  border-radius: 26px;
`;

const ConfirmButton = styled.button`
  padding: 14px 24px 14px 24px;
  width: 146px;
  background-color: #ffe4d0;
  border-radius: 26px;
`;
