import { asArray } from '@olivierpascal/helpers';
import clsx from 'clsx';

import { useThemeContext } from '~/components/ThemeProvider';

export type IUseStylesProps<
  TSelector extends string,
  TVariant extends string,
> = {
  name: string;
  rootSelector?: string;
  className?: string;
  style?: React.CSSProperties;
  classNames?: Partial<Record<TSelector, string>>;
  styles?: Record<TSelector, string>;
  theme?: string;
  variants?: Partial<Record<TSelector, Partial<Record<TVariant, string>>>>;
  variant?: TVariant;
};

export type IGetStylesProps = {
  className?: string;
  style?: React.CSSProperties;
};

export type IUseStylesResult<TSelector extends string> = {
  getStyles: (
    selector: TSelector | Array<TSelector | false | undefined>,
    options?: IGetStylesProps,
  ) => {
    className?: string;
    style?: React.CSSProperties;
  };
};

export const useStyles = <
  TSelector extends string,
  TVariant extends string = never,
>(
  props: IUseStylesProps<TSelector, TVariant>,
): IUseStylesResult<TSelector> => {
  const {
    name,
    rootSelector = 'root',
    theme,
    styles,
    variants,
    variant,
    classNames,
    className,
  } = props;
  const themeContext = useThemeContext();

  return {
    getStyles: (selector, options) => ({
      className: clsx(
        asArray(selector).map((selector) =>
          selector
            ? [
                selector === rootSelector && [theme, className],
                styles?.[selector],
                classNames?.[selector],
                variant && variants?.[selector]?.[variant],
                options?.className,
              ]
            : undefined,
        ),
      ),
      styles: options?.style,
    }),
  };
};
