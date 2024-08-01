import {
  SnackbarContent,
  type ISnackbarContentProps,
} from '~/components/SnackbarContent';

export type ISnackbarContentPlaygroundDemoProps = {
  snackbarContent: ISnackbarContentProps;
};

export const SnackbarContentPlaygroundDemo: React.FC<
  ISnackbarContentPlaygroundDemoProps
> = (props) => <SnackbarContent {...props.snackbarContent} />;
