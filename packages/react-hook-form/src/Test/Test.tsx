import { Button } from '@sixui/core';

export interface ITestProps {
  children: React.ReactNode;
}

export const Test: React.FC<ITestProps> = (props) => {
  const { children, ...other } = props;

  return <Button {...other}>{children}</Button>;
};
