import { forwardRef } from 'react';

import type { IThemeComponentValues } from '~/components/ThemeProvider';
import type { IAny } from '../types';

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

export type IComponentFactoryPayload = {
  props: Record<string, IAny>;
  ref?: IAny;
  styles?: IAny;
  staticComponents?: Record<string, IAny>;
};

export type IStaticComponents<TInput> =
  TInput extends Record<string, IAny> ? TInput : Record<string, never>;

export type IComponentStyles<TPayload extends IComponentFactoryPayload> = {
  styles: TPayload['styles'];
};

export type IExtendsRootComponent<TPayload extends IComponentFactoryPayload> = {
  defaultProps?: Partial<TPayload['props']> & IDataAttributes;
  styles?: TPayload['styles'];
};

export type IExtendComponent<TPayload extends IComponentFactoryPayload> =
  IExtendsRootComponent<TPayload>;

export type IThemeExtend<TPayload extends IComponentFactoryPayload> = {
  extend: (input: IExtendComponent<TPayload>) => IThemeComponentValues;
};

export const componentFactory = <TPayload extends IComponentFactoryPayload>(
  renderFunction: React.ForwardRefRenderFunction<
    TPayload['ref'],
    TPayload['props']
  >,
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
) => {
  type IComponentFromFactory = React.ForwardRefExoticComponent<
    TPayload['props'] & React.RefAttributes<TPayload['ref']>
  > &
    IThemeExtend<TPayload> &
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

export type IComponentFactory<TPayload extends IComponentFactoryPayload> =
  TPayload;
