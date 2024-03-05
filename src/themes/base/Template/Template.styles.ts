import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { ITemplateStyleKey } from '@/components/atoms/Template';
import { componentVars as vars } from './Template.stylex';

type ITemplateStyles = IStyles<ITemplateStyleKey>;
export const styles: MapNamespaces<ITemplateStyles> =
  stylex.create<ITemplateStyles>({
    host: {
      color: vars.textColor,
    },
  });
