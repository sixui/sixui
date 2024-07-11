import { forwardRef } from 'react';

import type { IMinimalTemplateProps } from './MinimalTemplateProps';

export const MinimalTemplate = forwardRef<
  HTMLDivElement,
  IMinimalTemplateProps
>(function MinimalTemplate(props, forwardedRef) {
  const { children, ...other } = props;

  return (
    <div {...other} ref={forwardedRef}>
      {children}
    </div>
  );
});
