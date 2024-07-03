type IRenderPropsWithForwardedHtmlProps<TRenderProps, TForwardedProps> =
  TRenderProps & {
    forwardedHtmlProps?: TForwardedProps;
  };

type IChildrenWithForwardedHtmlProps<TRenderProps, TForwardedProps> =
  | React.ReactNode
  | ((
      props: IRenderPropsWithForwardedHtmlProps<TRenderProps, TForwardedProps>,
    ) => React.ReactNode);

export type IForwardableHtmlProps<
  TRenderProps = object,
  TForwardedProps = Record<string, unknown>,
> = {
  children?: IChildrenWithForwardedHtmlProps<TRenderProps, TForwardedProps>;
  forwardHtmlPropsToChildren?: boolean;
};
