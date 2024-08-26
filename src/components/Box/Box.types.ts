import type { AriaFocusRingProps, HoverEvents } from 'react-aria';

export type IBoxModifiers = Record<
  string,
  string | number | boolean | undefined
>;

export type IBoxProps<TClassName extends string = never> = {
  className?: string;
  classNames?: Partial<Record<TClassName, string>>;
  style?: React.CSSProperties;
  interactions?: {
    hover?: boolean | HoverEvents;
    focusVisible?: boolean | AriaFocusRingProps;
  };
  modifiers?: IBoxModifiers;
};
