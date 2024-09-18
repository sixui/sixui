import type { StyleXStyles } from '@stylexjs/stylex';
import { useMemo } from 'react';

import type { IThemeSettings } from '~/components/ThemeProvider';
import type { IVisualState } from '~/components/VisualState';
import type { IStyleProps } from '~/helpers/stylePropsFactory';
import type { IStylesCombinatorStylesProp } from '~/helpers/stylesCombinatorFactory';
import { useThemeContext } from '~/components/ThemeProvider';
import { stylePropsFactory } from '~/helpers/stylePropsFactory';
import {
  IStylesCombinator,
  stylesCombinatorFactory,
} from '~/helpers/stylesCombinatorFactory';

export type IUseStylesProps<TStyleKey extends string> = {
  componentName: string;
  styles: IStylesCombinatorStylesProp<TStyleKey>;
  visualState?: IVisualState;
};

export type IUseStylesResult<TStyleKey extends string> = {
  settings?: IThemeSettings;
  globalStyles?: StyleXStyles;
  combineStyles: IStylesCombinator<TStyleKey>;
  getStyles: IStyleProps<TStyleKey>;
};

export const useStyles = <TStyleKey extends string>(
  props: IUseStylesProps<TStyleKey>,
): IUseStylesResult<TStyleKey> => {
  const { componentName, styles, visualState } = props;
  const themeContext = useThemeContext();

  const combineStyles = useMemo(
    () => stylesCombinatorFactory(styles),
    [styles],
  );
  const getStyles = useMemo(
    () => stylePropsFactory(combineStyles, visualState),
    [combineStyles, visualState],
  );

  return {
    settings: themeContext.settings,
    globalStyles: themeContext.componentsStyles?.[componentName],
    combineStyles,
    getStyles,
  };
};
