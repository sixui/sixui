import type { IAny } from '~/utils/types';
import { useThemeContext } from '~/components/Theme/Theme.context';
import { isFunction } from '~/utils/isFunction';

type IFilterPropsRes<TProps extends Record<string, IAny>> = {
  [Key in keyof TProps]-?: TProps[Key] extends undefined ? never : TProps[Key];
};

const filterProps = <TProps extends Record<string, IAny>>(
  props: TProps,
): IFilterPropsRes<TProps> =>
  Object.keys(props).reduce((acc, key: keyof TProps) => {
    if (props[key] === undefined) {
      return acc;
    }

    return {
      ...acc,
      [key]: props[key],
    };
  }, {} as IFilterPropsRes<TProps>);

export type IUsePropsProps<
  TProps extends Record<string, IAny>,
  TDefaultProps extends Partial<TProps> = object,
> = {
  componentName: string;
  props: TProps;
  defaultProps?: TDefaultProps;
};

export const useProps = <
  TProps extends Record<string, IAny>,
  TDefaultProps extends Partial<TProps> = object,
>({
  componentName,
  props,
  defaultProps,
}: IUsePropsProps<TProps, TDefaultProps>): TProps & {
  [Key in Extract<keyof TProps, keyof TDefaultProps>]-?:
    | TDefaultProps[Key]
    | NonNullable<TProps[Key]>;
} => {
  const { theme } = useThemeContext();

  const contextPropsPayload = theme.components?.[componentName]?.defaultProps;
  const contextProps = (
    isFunction(contextPropsPayload)
      ? contextPropsPayload(theme)
      : contextPropsPayload
  ) as TDefaultProps;

  return { ...defaultProps, ...contextProps, ...filterProps(props) };
};
