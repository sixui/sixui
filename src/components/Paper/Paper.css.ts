import { style } from '@vanilla-extract/css';

import { stylesFactory, type IStylesFactory } from '~/utils/stylesFactory';

export type IPaperStyleName = keyof typeof paperStyles;

const classNames = {
  root: style({}),
};

export type IPaperStylesFactory = IStylesFactory<{
  styleName: keyof typeof classNames;
}>;

export const paperStyles = stylesFactory<IPaperStylesFactory>({
  classNames,
  tokens: undefined,
});
