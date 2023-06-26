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
      color: COLOR.CHOCOLATE,
      shape: SHAPE.CIRCLE,
    },
    decoration: {
      topping: null,
    },
    letter: {
      receiver: '',
      sender: '',
      message: '',
    },
  },
};

const STEP = {
  MIN: 0,
  MAX: CREATE_STEPS.length - 1,
};

export { STEP, CREATE_STEPS, CREATE_STATE };
