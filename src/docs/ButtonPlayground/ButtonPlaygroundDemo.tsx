import type { IButtonProps } from '~/components/Button';
import { Button } from '~/components/Button';

export type IButtonPlaygroundDemoProps = {
  button: IButtonProps;
};

export const ButtonPlaygroundDemo: React.FC<IButtonPlaygroundDemoProps> = (
  props,
) => <Button {...props.button} />;
