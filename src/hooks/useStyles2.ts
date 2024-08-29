import { useCallback } from 'react';
import { asArray } from '@olivierpascal/helpers';
import clsx from 'clsx';

import type { IStyles, IStylesFactoryPayload } from '~/utils/stylesFactory';
import { useThemeContext } from '~/components/ThemeProvider';

export type IStylesProps<TPayload extends IStylesFactoryPayload> = {
  /** The class name to apply to the root selector. */
  className?: Parameters<typeof clsx>[0];

  /** The class names to apply to the component. */
  classNames?: Partial<Record<TPayload['styleName'], string>>;

  /** CSS properties to apply to the root selector. */
  style?: React.CSSProperties;

  /** The styles variant to use. */
  variant?: TPayload['variant'];
};

export type IUseStylesProps<TPayload extends IStylesFactoryPayload> =
  IStylesProps<TPayload> & {
    /** The name of the component. */
    componentName: string;

    /**
     * The styles of the component.
     */
    styles: IStyles<TPayload>;

    /**
     * The root style name to apply the tokens class to.
     * @defaultValue 'root'
     */
    rootStyleName?: string;
  };

export type IGetStylesOptions = {
  className?: string;
  style?: React.CSSProperties;
};

export type IUseStylesResult<TPayload extends IStylesFactoryPayload> = {
  getStyles: (
    styleName:
      | TPayload['styleName']
      | Array<TPayload['styleName'] | false | undefined>,
    options?: IGetStylesOptions,
  ) => {
    className?: string;
    style?: React.CSSProperties;
  };
};

export const useStyles = <TPayload extends IStylesFactoryPayload>(
  props: IUseStylesProps<TPayload>,
): IUseStylesResult<TPayload> => {
  const {
    componentName,
    classNames,
    className,
    styles,
    style,
    variant,
    rootStyleName = 'root',
  } = props;
  const { theme } = useThemeContext();

  const getStyles: IUseStylesResult<TPayload>['getStyles'] = useCallback(
    (styleName, options) => ({
      className: clsx(
        asArray(styleName).map((styleName) =>
          styleName
            ? [
                styleName === rootStyleName && [
                  styles.tokensClassName,
                  className,
                ],
                [
                  styles.classNames,
                  classNames,
                  theme.components?.[componentName]?.classNames,
                ].map((classNames) => classNames?.[styleName]),
                variant && styles.variants?.[styleName]?.[variant],
                options?.className,
              ]
            : undefined,
        ),
      ),
      style: {
        ...style,
        ...options?.style,
      },
    }),
    [
      componentName,
      className,
      theme.components,
      classNames,
      rootStyleName,
      variant,
      style,
      styles,
    ],
  );

  return {
    getStyles,
  };
};
