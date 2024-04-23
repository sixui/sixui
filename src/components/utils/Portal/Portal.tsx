import { FloatingPortal } from '@floating-ui/react';

import { useColorScheme } from '@/components/utils/ColorScheme';

export type IBasicTemplateProps = {
  root?: HTMLElement | null | React.MutableRefObject<HTMLElement | null>;
  children?: React.ReactNode;
};

export const Portal: React.FC<IBasicTemplateProps> = (props) => {
  const { root: rootProp, children } = props;
  const { root: rootColorScheme } = useColorScheme();

  const root = rootProp ?? rootColorScheme;

  return <FloatingPortal root={root}>{children}</FloatingPortal>;
};
