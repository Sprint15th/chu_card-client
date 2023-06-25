export type Color = 'CHOCOLATE' | 'CREAM' | 'BERRY';
export type Shape = 'CIRCLE' | 'SQUARE' | 'HEART';
export type Topping = 'CHERRY' | 'BERRY' | 'ORANGE' | 'CHOCOLATE';

export type Appearance = {
  color: Color;
  shape: Shape;
};

export type Decoration = {
  topping: Topping | null;
};

export type Cake = {
  appearance: Appearance;
  decoration: Decoration;
};

export type Letter = {
  sender: string;
  receiver: string;
  message: string;
};
