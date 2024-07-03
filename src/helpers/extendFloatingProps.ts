export type IExtendedHtmlFloatingProps = Pick<
  React.HTMLProps<HTMLElement>,
  | 'onMouseEnter'
  | 'onMouseLeave'
  | 'onFocus'
  | 'onBlur'
  | 'onClick'
  | 'onMouseMove'
  | 'onMouseDown'
  | 'onMouseUp'
  | 'onKeyDown'
  | 'onKeyUp'
  | 'tabIndex'
> &
  Pick<
    React.AriaAttributes,
    | 'aria-haspopup'
    | 'aria-expanded'
    | 'aria-controls'
    | 'aria-describedby'
    | 'aria-label'
    | 'aria-labelledby'
  >;

export type IExtendedFloatingProps<
  TProps extends object = Record<string, never>,
> = TProps & IExtendedHtmlFloatingProps;

/**
 * A function that returns the props to apply to a floating element while
 * preserving types.
 *
 * @param getProps - Prop getter function, ie. `getReferenceProps`,
 *   `getFloatingProps` or `getItemProps`.
 * @param userProps - All event handlers you pass in should be done so through
 * the this argument. This is because your handler may be either overwritten or
 * overwrite one of the Floating UI hooks' handlers, ie. `onClick` or `onFocus`.
 */
export const extendFloatingProps = <
  TProps extends object = Record<string, never>,
>(
  getProps: (userProps?: object) => object,
  userProps: IExtendedHtmlFloatingProps,
): IExtendedFloatingProps<TProps> =>
  getProps(userProps) as IExtendedFloatingProps<TProps>;
