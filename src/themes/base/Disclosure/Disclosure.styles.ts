import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { IDisclosureStyleKey } from '@/components/atoms/Disclosure';

type IDisclosureStyles = IStyles<IDisclosureStyleKey>;
export const styles: MapNamespaces<IDisclosureStyles> =
  stylex.create<IDisclosureStyles>({
    host: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
    },
  });
