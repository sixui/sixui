import { useCallback } from 'react';
import { asArray } from '@olivierpascal/helpers';
import cx from 'clsx';

import type { INestedArray } from '~/helpers/types';
import type {
  IStyles,
  IStylesFactoryPayload,
} from '~/utils/styles/stylesFactory';
import { useThemeContext } from '~/components/ThemeProvider';
import { getDataAttributes, IModifiers } from '~/utils/getDataAttributes';

export type IStylesProps<TPayload extends IStylesFactoryPayload> = {
  /** The class name to apply to the root selector. */
  className?: Parameters<typeof cx>[0];

  /** The class names to apply to the component. */
  classNames?: Partial<Record<TPayload['styleName'], Parameters<typeof cx>[0]>>;

  /** CSS properties to apply to the root selector. */
  style?: React.CSSProperties;

  /** The styles variant to use. */
  variant?: TPayload['variant'];

  sprinkles?: { className?: string; style?: React.CSSProperties };
};

export type IUseStylesProps<TPayload extends IStylesFactoryPayload> =
  IStylesProps<TPayload> & {
    /** The name of the component. */
    componentName: string;

    /** The styles of the component. */
    styles: IStyles<TPayload>;

    /** The styles of the component variants. */
    stylesVariants?: TPayload['variant'] extends string
      ? Record<TPayload['variant'], IStyles<TPayload>['classNames']>
      : never;

    /**
     * The root style name to apply the tokens class to.
     * @defaultValue 'root'
     */
    rootStyleName?: string;

    /**
     * The modifiers to apply to the root selector.
     */
    modifiers?: TPayload['modifier'] extends string
      ? Partial<IModifiers<TPayload['modifier']>>
      : never;
  };

export type IGetStylesOptions = {
  className?: string;
  style?: React.CSSProperties;
};

export type IUseStylesResult<TPayload extends IStylesFactoryPayload> = {
  getStyles: (
    styleName: INestedArray<TPayload['styleName'] | false | undefined>,
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
    stylesVariants,
    style,
    variant,
    sprinkles,
    rootStyleName = 'root',
    modifiers,
  } = props;
  const { theme } = useThemeContext();

  const getStyles: IUseStylesResult<TPayload>['getStyles'] = useCallback(
    (styleName, options) => {
      const styleNames = asArray(styleName).flat(Infinity as 1) as Array<
        TPayload['styleName'] | false | undefined
      >;
      const isRoot = styleNames.includes(rootStyleName);
      const sprinklesClassName = sprinkles?.className;
      const sprinklesStyles = sprinkles?.style;

      return {
        className: cx(
          styleNames.map((styleName) =>
            styleName
              ? [
                  styleName === rootStyleName && [
                    styles.tokensClassName,
                    className,
                    sprinklesClassName,
                  ],
                  [
                    styles.classNames,
                    variant && stylesVariants?.[variant],
                    classNames,
                    theme.components?.[componentName]?.classNames,
                  ].map((classNames) => classNames?.[styleName]),
                  options?.className,
                ]
              : undefined,
          ),
        ),
        style: {
          ...(isRoot ? style : undefined),
          ...options?.style,
          ...sprinklesStyles,
        },
        ...(isRoot
          ? getDataAttributes({
              variant,
              ...modifiers,
            })
          : undefined),
      };
    },
    [
      componentName,
      className,
      theme.components,
      classNames,
      rootStyleName,
      modifiers,
      variant,
      style,
      styles,
      stylesVariants,
      sprinkles,
    ],
  );

  return {
    getStyles,
  };
};
