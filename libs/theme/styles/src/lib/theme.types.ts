export type ColorName =
  | 'black'
  | 'white'
  | 'neutral'
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'info'
  | 'danger'
  | 'success'
  | 'warning';

export type ColorWeight = '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';

export type ColorPallete = {
  black: string;
  white: string;
} & Record<ColorName, Record<ColorWeight, string>>;
