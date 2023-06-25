export type Color = "CHOCOLATE" | "CREAM" | "BERRY";
export type Shape = "CIRCLE" | "SQUARE" | "HEART";
export type Topping = "CHERRY" | "BERRY" | "ORANGE" | "CHOCOLATE";

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