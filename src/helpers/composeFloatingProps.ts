export const composeFloatingProps = <
  TProps extends object,
  TElement extends Element = Element,
>(
  getProps: (userProps?: React.HTMLProps<TElement>) => object,
  userProps: TProps & Omit<React.HTMLProps<TElement>, keyof TProps>,
): TProps => ({ ...userProps, ...getProps(userProps) }) as TProps;
