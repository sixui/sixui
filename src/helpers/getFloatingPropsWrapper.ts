export const getFloatingPropsWrapper = <
  TProps extends object,
  TElement extends Element = Element,
>(
  getProps: (userProps?: React.HTMLProps<TElement>) => object,
  userProps: TProps & Omit<React.HTMLProps<TElement>, keyof TProps>,
): TProps => getProps(userProps) as TProps;
