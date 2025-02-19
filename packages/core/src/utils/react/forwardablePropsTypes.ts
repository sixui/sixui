export type IRendererPropsWithForwardedProps<TRenderProps, TForwardedProps> =
  TRenderProps & {
    forwardedProps?: TForwardedProps;
  };

export type IRendererWithForwardedProps<
  TRenderProps = object,
  TForwardedProps = Record<string, unknown>,
> =
  | React.ReactNode
  | ((
      props: IRendererPropsWithForwardedProps<TRenderProps, TForwardedProps>,
    ) => React.ReactNode);

export type IForwardableProps = {
  forwardProps?: boolean;
};
