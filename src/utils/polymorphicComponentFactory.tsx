import { forwardRef } from 'react';

import type { IAny } from '~/helpers/types';
import type {
  IPolymorphicComponentProps,
  IPolymorphicComponentPropsWithRef,
  IWithAsProp,
} from './createPolymorphicComponent';
import {
  identity,
  type IComponentFactoryPayload,
  type IFactoryComponentStyles,
  type IFactoryComponentStaticComponents,
  type IFactoryComponentThemeExtend,
} from './componentFactory';

export type IPolymorphicComponentFactoryPayload = IComponentFactoryPayload & {
  defaultRef: IAny;
  defaultRoot: IAny;
};

export type IFactoryPolymorphicComponentWithProps<
  TPayload extends IPolymorphicComponentFactoryPayload,
> = {
  withProps: <TRoot extends React.ElementType = TPayload['defaultRoot']>(
    fixedProps: IPolymorphicComponentProps<TRoot, TPayload['props']>,
  ) => <TL extends React.ElementType = TRoot>(
    props: IPolymorphicComponentProps<TL, TPayload['props']>,
  ) => React.ReactElement;
};

export type IPolymorphicComponentFactory<
  TPayload extends IPolymorphicComponentFactoryPayload,
> = TPayload;

export const polymorphicComponentFactory = <
  TPayload extends IPolymorphicComponentFactoryPayload,
>(
  renderFunction: React.ForwardRefRenderFunction<
    TPayload['defaultRef'],
    IWithAsProp<TPayload['props']>
  >,
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
) => {
  type IComponentProps<TRoot extends React.ElementType> =
    IPolymorphicComponentPropsWithRef<TRoot, TPayload['props']>;

  type IPolymorphicComponent = <
    TRoot extends React.ElementType = TPayload['defaultRoot'],
  >(
    props: IComponentProps<TRoot>,
  ) => React.ReactElement;

  type IFunctionComponentProps = Omit<
    React.FunctionComponent<IComponentProps<IAny>>,
    never
  >;

  type IPolymorphicComponentFromFactory = IPolymorphicComponent &
    IFunctionComponentProps &
    IFactoryComponentThemeExtend<TPayload> &
    IFactoryComponentStyles<TPayload> &
    IFactoryComponentStaticComponents<TPayload['staticComponents']> &
    IFactoryPolymorphicComponentWithProps<TPayload>;

  const PolymorphicComponentFromFactory = forwardRef(
    renderFunction,
  ) as IPolymorphicComponentFromFactory;

  PolymorphicComponentFromFactory.withProps = (fixedProps: IAny) => {
    const Extended = forwardRef(function Extended(props, ref) {
      return (
        <PolymorphicComponentFromFactory
          {...fixedProps}
          {...props}
          ref={ref as IAny}
        />
      );
    }) as unknown as IPolymorphicComponentFromFactory;
    Extended.extend = PolymorphicComponentFromFactory.extend;
    Extended.displayName = `WithProps(${PolymorphicComponentFromFactory.displayName})`;

    return Extended;
  };

  PolymorphicComponentFromFactory.extend = identity as IAny;

  return PolymorphicComponentFromFactory;
};
