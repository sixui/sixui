import type { StyleXVar } from '@stylexjs/stylex/lib/StyleXTypes';

export type IColorRoleProps = {
  label: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  backgroundColor: string | StyleXVar<string>;
  textColor: string | StyleXVar<string>;
};
