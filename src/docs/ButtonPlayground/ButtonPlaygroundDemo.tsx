import { Button, type IButtonProps } from '~/components/Button';

export type IButtonPlaygroundDemoProps = {
  button: IButtonProps;
};

export const ButtonPlaygroundDemo: React.FC<IButtonPlaygroundDemoProps> = (
  props,
) => <Button {...props.button} />;
