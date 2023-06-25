import { COLOR, SHAPE, TOPPING } from './cake';

const CREATE_STEPS = [
  {
    label: `appearance`,
    title: '케이크 모양을 선택해 주세요!',
  },
  {
    label: `decoration`,
    title: '토핑을 선택해 주세요!',
  },
  {
    label: `letter`,
  },
];

const CREATE_STATE = {
  selectedIndex: 0,
  steps: {
    appearance: {
      valid: false,
      value: {
        color: COLOR.CHOCOLATE,
        shape: SHAPE.CIRCLE,
      },
    },
    decoration: {
      valid: false,
      value: {
        topping: TOPPING.CHERRY,
      },
    },
    letter: {
      valid: false,
      value: {
        sender: '',
        receiver: '',
        message: '',
      },
    },
  },
};

export { CREATE_STEPS, CREATE_STATE };
