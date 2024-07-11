import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { IBasicTemplateStyleKey } from '@/components/atoms/Template/BasicTemplate';
import { componentVars as vars } from './Template.stylex';

type IBasicTemplateStyles = IStyles<IBasicTemplateStyleKey>;
export const styles: MapNamespaces<IBasicTemplateStyles> =
  stylex.create<IBasicTemplateStyles>({
    host: {
      color: vars.textColor,
    },
  });
