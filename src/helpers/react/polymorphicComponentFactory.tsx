import { forwardRef } from 'react';

import type { IAny } from '~/helpers/types';
import type { IPolymorphicComponentProps } from './polymorphicComponentTypes';
import {
  identity,
  type IComponentFactoryPayload,
  type IComponentStyles,
  type IStaticComponents,
  type IThemeExtend,
} from './componentFactory';

export type IPolymorphicComponentWithProps<
  TPayload extends IPolymorphicComponentFactoryPayload,
> = {
  withProps: <TRoot extends React.ElementType = TPayload['defaultRoot']>(
    fixedProps: IPolymorphicComponentProps<TRoot, TPayload['props']>,
  ) => <TL extends React.ElementType = TRoot>(
    props: IPolymorphicComponentProps<TL, TPayload['props']>,
  ) => React.ReactElement;
};

export const polymorphicComponentFactory = <
  TPayload extends IPolymorphicComponentFactoryPayload,
>(
  renderFunction: React.ForwardRefRenderFunction<
    TPayload['defaultRef'],
    TPayload['props']
  >,
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
) => {
  type IComponentProps<TRoot extends React.ElementType> =
    IPolymorphicComponentProps<TRoot, TPayload['props']>;

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
    IThemeExtend<TPayload> &
    IComponentStyles<TPayload> &
    IStaticComponents<TPayload['staticComponents']> &
    IPolymorphicComponentWithProps<TPayload>;

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

export type IPolymorphicComponentFactoryPayload = IComponentFactoryPayload & {
  defaultRef: IAny;
  defaultRoot: IAny;
};

export type IPolymorphicComponentFactory<
  TPayload extends IPolymorphicComponentFactoryPayload,
> = TPayload;
