import { forwardRef } from 'react';

import type { IAny } from '~/helpers/types';
import type { IThemeComponentValues } from '~/components/ThemeProvider';

export type IComponentFactoryPayload = {
  props: Record<string, IAny>;
  ref?: Element;
  styles?: IAny;
  staticComponents?: Record<string, IAny>;
};

export type IDataAttributes = Record<`data-${string}`, IAny>;

export const identity = <T,>(value: T): T => value;

export type IFactoryComponentWithProps<
  TPayload extends IComponentFactoryPayload,
> = {
  withProps: (props: TPayload['props']) => React.ForwardRefExoticComponent<
    TPayload['props'] &
      React.RefAttributes<TPayload['ref']> & {
        component?: IAny;
        renderRoot?: (props: Record<string, IAny>) => React.ReactNode;
      }
  >;
};

export type IFactoryComponentStaticComponents<TInput> =
  TInput extends Record<string, IAny> ? TInput : Record<string, never>;

export type IFactoryComponentStyles<TPayload extends IComponentFactoryPayload> =
  {
    styles: TPayload['styles'];
  };

export type IFactoryComponentExtendRootProps<
  TPayload extends IComponentFactoryPayload,
> = {
  defaultProps?: Partial<TPayload['props']> & IDataAttributes;
  classNames?: TPayload['styles']['classNames'];
};

export type IFactoryComponentExtendProps<
  TPayload extends IComponentFactoryPayload,
> = IFactoryComponentExtendRootProps<TPayload>;

export type IFactoryComponentThemeExtend<
  TPayload extends IComponentFactoryPayload,
> = {
  extend: (
    input: IFactoryComponentExtendProps<TPayload>,
  ) => IThemeComponentValues;
};

export type IComponentFactory<TPayload extends IComponentFactoryPayload> =
  TPayload;

export const componentFactory = <TPayload extends IComponentFactoryPayload>(
  renderFunction: React.ForwardRefRenderFunction<
    TPayload['ref'],
    TPayload['props']
  >,
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
) => {
  type IComponent = React.ForwardRefExoticComponent<
    TPayload['props'] & React.RefAttributes<TPayload['ref']>
  >;

  type IComponentFromFactory = IComponent &
    IFactoryComponentThemeExtend<TPayload> &
    IFactoryComponentStyles<TPayload> &
    IFactoryComponentWithProps<TPayload>;

  const ComponentFromFactory = forwardRef(
    renderFunction,
  ) as IComponentFromFactory;

  ComponentFromFactory.extend = identity as IAny;
  ComponentFromFactory.withProps = (fixedProps: IAny) => {
    const Extended = forwardRef(function Extended(props, ref) {
      return (
        <ComponentFromFactory {...fixedProps} {...props} ref={ref as IAny} />
      );
    }) as unknown as IComponentFromFactory;
    Extended.extend = ComponentFromFactory.extend;
    Extended.displayName = `WithProps(${ComponentFromFactory.displayName})`;

    return Extended;
  };

  return ComponentFromFactory;
};
