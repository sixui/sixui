import type { IAny } from '~/helpers/types';

declare module 'react' {
  function forwardRef<TRef, TProps = IAny>(
    render: (props: TProps, ref: React.Ref<TRef>) => React.ReactNode | null,
  ): ((props: TProps & React.RefAttributes<TRef>) => React.ReactNode | null) & {
    displayName?: string;
  };
}
