import { Color, Shape, Topping } from "@/types/cake";

const CREATE_STEPS = [
  {
    label: `appearance`,
  },
  {
    label: `decoration`,
  },
  {
    label: `letter`,
  },
  {
    label: `complete`,
  },
];

const CREATE_STATE = {
  selectedIndex: 0,
  steps: {
    appearance: {
      valid: false,
      value: {
        color: "CHOCLATE" as Color,
        shape: "CIRCLE" as Shape,
      },
    },
    decoration: {
      valid: false,
      value: {
        topping: "CHERRY" as Topping,
      },
    },
    letter: {
      valid: false,
      value: {
        sender: "",
        receiver: "",
        message: "",
      },
    },
  },
};

export { CREATE_STEPS, CREATE_STATE };
