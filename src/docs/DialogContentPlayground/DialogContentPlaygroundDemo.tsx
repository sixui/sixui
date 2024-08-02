import stylex from '@stylexjs/stylex';

import {
  DialogContent,
  type IDialogContentProps,
} from '~/components/DialogContent';

export type IDialogContentPlaygroundDemoProps = {
  dialogContent: IDialogContentProps;
};

const styles = stylex.create({
  host: {
    width: 400,
  },
  host$scrollable: {
    height: 400,
  },
});

export const DialogContentPlaygroundDemo: React.FC<
  IDialogContentPlaygroundDemoProps
> = (props) => (
  <DialogContent
    sx={[styles.host, props.dialogContent.scrollable && styles.host$scrollable]}
    {...props.dialogContent}
  />
);
