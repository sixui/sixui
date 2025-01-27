import { forwardRef } from 'react';

export const fixedForwardRef = <TElement, TProps>(
  render: (props: TProps, ref: React.Ref<TElement>) => React.ReactNode,
): ((props: TProps & React.RefAttributes<TElement>) => React.ReactNode) =>
  forwardRef(render);
