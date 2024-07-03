export type IRendererPropsWithForwardedHtmlProps<
  TRenderProps,
  TForwardedProps,
> = TRenderProps & {
  forwardedHtmlProps?: TForwardedProps;
};

export type IRendererWithForwardedHtmlProps<
  TRenderProps = object,
  TForwardedProps = Record<string, unknown>,
> =
  | React.ReactNode
  | ((
      props: IRendererPropsWithForwardedHtmlProps<
        TRenderProps,
        TForwardedProps
      >,
    ) => React.ReactNode);

export type IForwardableHtmlProps = {
  forwardHtmlProps?: boolean;
};
