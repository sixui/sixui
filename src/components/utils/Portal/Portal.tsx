import { FloatingPortal } from '@floating-ui/react';

export type IBasicTemplateProps = {
  root?: HTMLElement | null | React.MutableRefObject<HTMLElement | null>;
  children?: React.ReactNode;
};

export const Portal: React.FC<IBasicTemplateProps> = (props) => {
  const { root, children } = props;

  return <FloatingPortal root={root}>{children}</FloatingPortal>;
};
