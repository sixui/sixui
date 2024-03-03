import type { IAny } from '@/helpers/types';

// Source: https://github.com/emotion-js/emotion/blob/master/packages/styled-base/types/helper.d.ts

// A more precise version of just React.ComponentPropsWithoutRef on its own
export type IPropsOf<
  TComponent extends
    | keyof JSX.IntrinsicElements
    | React.JSXElementConstructor<IAny>,
> = JSX.LibraryManagedAttributes<
  TComponent,
  React.ComponentPropsWithoutRef<TComponent>
>;

type IAsProp<TRoot extends React.ElementType> = {
  /**
   * An override of the default HTML tag.
   * Can also be another React component.
   */
  as?: TRoot;
};

/**
 * Allows for extending a set of props (`ExtendedProps`) by an overriding set of props
 * (`OverrideProps`), ensuring that any duplicates are overridden by the overriding
 * set of props.
 */
export type IExtendableProps<
  TExtendedProps = object,
  TOverrideProps = object,
> = TOverrideProps & Omit<TExtendedProps, keyof TOverrideProps>;

/**
 * Allows for inheriting the props from the specified element type so that
 * props like children, className & style work, as well as element-specific
 * attributes like aria roles. The component (`C`) must be passed in.
 */
export type IInheritableElementProps<
  TRoot extends React.ElementType,
  TProps = object,
> = IExtendableProps<IPropsOf<TRoot>, TProps>;

/**
 * A more sophisticated version of `InheritableElementProps` where
 * the passed in `as` prop will determine which props can be included
 */
export type IPolymorphicComponentProps<
  TRoot extends React.ElementType,
  TProps = object,
> = IInheritableElementProps<TRoot, TProps & IAsProp<TRoot>>;

/**
 * Utility type to extract the `ref` prop from a polymorphic component
 */
export type IPolymorphicRef<TRoot extends React.ElementType> =
  React.ComponentPropsWithRef<TRoot>['ref'];

/**
 * A wrapper of `PolymorphicComponentProps` that also includes the `ref`
 * prop for the polymorphic component
 */
export type IPolymorphicComponentPropsWithRef<
  TRoot extends React.ElementType,
  TProps = object,
> = IPolymorphicComponentProps<TRoot, TProps> & {
  ref?: IPolymorphicRef<TRoot>;
};
