const CREATE_STEPS = [
  {
    label: `appearance`,
  },
  {
    label: `topping`,
  },
  {
    label: `letter`,
  },
  // {
  //   label: `complete`,
  // },
];


const CREATE_STATE = {
  selectedIndex: 0,
  steps: {
    appearance: {
      valid: false,
      value: {
        color: 'CHOCLATE',
        shape: 'CIRCLE',
      },
    },
    topping: {
      valid: false,
      value: {
        name: 'cherry',
      },
    },
    letter: {
      valid: false,
      value: {
        sender: '',
        receiver: '',
        message: '',
      }
    }
  },
};

export {
  CREATE_STEPS,
  CREATE_STATE
}

