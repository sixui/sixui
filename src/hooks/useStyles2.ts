import { useCallback } from 'react';
import { asArray } from '@olivierpascal/helpers';
import clsx from 'clsx';

import type {
  IComponentStyles,
  IComponentStylesFactoryPayload,
} from '~/utils/componentStylesFactory';
import { useThemeContext } from '~/components/ThemeProvider';

export type IUseStylesProps<TPayload extends IComponentStylesFactoryPayload> = {
  /** The name of the component. */
  componentName: string;

  /** The class name to apply to the root selector. */
  className?: Parameters<typeof clsx>[0];

  /** The class names to apply to the component. */
  classNames?: Partial<Record<TPayload['styleName'], string>>;

  /**
   * The styles of the component.
   */
  styles: IComponentStyles<TPayload>;

  /** CSS properties to apply to the root selector. */
  style?: React.CSSProperties;

  /**
   * The root style name to apply the tokens class to.
   * @defaultValue 'root'
   */
  rootStyleName?: string;

  /** The styles variant to use. */
  variant?: TPayload['variant'];
};

export type IGetStylesOptions = {
  className?: string;
  style?: React.CSSProperties;
};

export type IUseStylesResult<TPayload extends IComponentStylesFactoryPayload> =
  {
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

export const useStyles = <TPayload extends IComponentStylesFactoryPayload>(
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
  const themeContext = useThemeContext();

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
                [styles.classNames, classNames].map(
                  (classNames) => classNames?.[styleName],
                ),
                variant && styles.variants?.[styleName]?.[variant],
                options?.className,
              ]
            : undefined,
        ),
      ),
      styles: {
        ...style,
        ...options?.style,
      },
    }),
    [className, classNames, rootStyleName, variant, style, styles],
  );

  return {
    getStyles,
  };
};
