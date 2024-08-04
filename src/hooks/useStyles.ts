import type { StyleXStyles } from '@stylexjs/stylex';
import { useMemo } from 'react';

import type { IVisualState } from '~/components/VisualState';
import type { IStylesCombinator } from '~/helpers/stylesCombinatorFactory';
import { useThemeContext, type IThemeSettings } from '~/components/Theme';
import {
  stylePropsFactory,
  type IStyleProps,
} from '~/helpers/stylePropsFactory';
import {
  stylesCombinatorFactory,
  type IStylesCombinatorStylesProp,
} from '~/helpers/stylesCombinatorFactory2';

export type IUseStylesProps<TStyleKey extends string> = {
  name: string;
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
  const { name, styles, visualState } = props;
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
    globalStyles: themeContext.componentsStyles?.[name],
    combineStyles,
    getStyles,
  };
};
