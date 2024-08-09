import stylex from '@stylexjs/stylex';

import {
  DialogContent,
  type IDialogContentProps,
} from '~/components/DialogContent';
import { scaleTokens } from '~/themes/base/scale.stylex';

export type IDialogContentPlaygroundDemoProps = {
  dialogContent: IDialogContentProps;
};

const styles = stylex.create({
  host: {
    width: `calc(400px * ${scaleTokens.scale})`,
  },
  host$scrollable: {
    height: `calc(400px * ${scaleTokens.scale})`,
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
