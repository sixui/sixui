import { useCallback } from 'react';
import { asArray } from '@olivierpascal/helpers';
import cx from 'clsx';

import type { INestedArray } from '~/helpers/types';
import type {
  IComponentTheme,
  IComponentThemeFactoryPayload,
} from '~/utils/styles/componentThemeFactory';
import { useThemeContext } from '~/components/ThemeProvider';
import { getDataAttributes, IModifiers } from '~/utils/getDataAttributes';
import { isTruthy } from '~/utils/isTruthy';

export interface IComponentThemeProps<
  TPayload extends IComponentThemeFactoryPayload,
> {
  /** The class name to apply to the root selector. */
  className?: Parameters<typeof cx>[0];

  /** The CSS properties to apply to the root selector. */
  style?: React.CSSProperties;

  /** The class names to apply to the inner elements of the component. */
  classNames?: Partial<Record<TPayload['styleName'], Parameters<typeof cx>[0]>>;

  /** The CSS properties to apply to the inner elements of the component. */
  styles?: Partial<Record<TPayload['styleName'], React.CSSProperties>>;

  /** The styles variant to use. */
  variant?: TPayload['variant'] | false;

  otherProps?: Record<string, unknown>;
}

export interface IUseComponentThemeProps<
  TPayload extends IComponentThemeFactoryPayload,
> extends IComponentThemeProps<TPayload> {
  /** The name of the component. */
  componentName: string;

  /** The theme of the component. */
  theme: IComponentTheme<TPayload>;

  /** The theme of the component variants. */
  themeVariants?: TPayload['variant'] extends string
    ? Record<TPayload['variant'], IComponentTheme<TPayload>['classNames']>
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
}

export interface IGetStylesOptions<
  TPayload extends IComponentThemeFactoryPayload,
> {
  className?: string;
  style?: React.CSSProperties;
  modifiers?: TPayload['modifier'] extends string
    ? Partial<IModifiers<TPayload['modifier']>>
    : never;
}

export type IUseComponentThemeResult<
  TPayload extends IComponentThemeFactoryPayload,
> = {
  getStyles: (
    styleName: INestedArray<TPayload['styleName'] | false | undefined>,
    options?: IGetStylesOptions<TPayload>,
  ) => {
    className?: string;
    style?: React.CSSProperties;
  };
};

export const useComponentTheme = <
  TPayload extends IComponentThemeFactoryPayload,
>(
  props: IUseComponentThemeProps<TPayload>,
): IUseComponentThemeResult<TPayload> => {
  const {
    componentName,
    classNames,
    className,
    styles,
    theme: componentTheme,
    themeVariants,
    style,
    variant,
    rootStyleName = 'root',
    modifiers,
  } = props;
  const { theme } = useThemeContext();

  const getStyles: IUseComponentThemeResult<TPayload>['getStyles'] =
    useCallback(
      (styleName, options) => {
        const styleNames = asArray(styleName).flat(Infinity as 1) as Array<
          TPayload['styleName'] | false | undefined
        >;
        const includesRoot = styleNames.includes(rootStyleName);

        return {
          className: cx(
            styleNames
              .filter(isTruthy)
              .map((styleName) => [
                styleName === rootStyleName && [
                  componentTheme.tokensClassName,
                  className,
                ],
                [
                  componentTheme.classNames,
                  variant ? themeVariants?.[variant] : undefined,
                  classNames,
                  theme.components?.[componentName]?.classNames,
                ].map((classNames) => classNames?.[styleName]),
                options?.className,
              ]),
          ),
          style: {
            ...(includesRoot ? style : undefined),
            ...styleNames.reduce(
              (acc, styleName) => ({
                ...acc,
                ...(styleName ? styles?.[styleName] : undefined),
              }),
              {} as React.CSSProperties,
            ),
            ...options?.style,
          },
          ...(includesRoot
            ? getDataAttributes({
                variant,
                ...modifiers,
              })
            : undefined),
          ...(options?.modifiers
            ? getDataAttributes(options.modifiers)
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
        componentTheme,
        themeVariants,
      ],
    );

  return {
    getStyles,
  };
};
