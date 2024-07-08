import { forwardRef } from 'react';

export type IMinimalTemplateProps = {
  children?: React.ReactNode;
};

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
