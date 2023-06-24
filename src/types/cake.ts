export type Color = "CHOCLATE" | "CREAM" | "BERRY";
export type Shape = "CIRCLE" | "SQUARE" | "HEART";
export type Topping = "CHERRY" | "BERRY" | "ORGANGE" | "CHOCOLATE";

export type Appearance = {
  valid: boolean;
  value: {
    color: Color;
    shape: Shape;
  };
};

export type Decoration = {
  valid: boolean;
  value: {
    topping: Topping;
  };
};
