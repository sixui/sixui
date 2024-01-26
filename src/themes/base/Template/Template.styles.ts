import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import * as stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { ITemplateStyleKey } from '@/components/atoms/Template';

type ITemplateStyles = IStyles<ITemplateStyleKey>;
export const styles: MapNamespaces<ITemplateStyles> =
  stylex.create<ITemplateStyles>({
    host: {},
  });
