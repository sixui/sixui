import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { IVariableTemplateStyleKey } from '@/components/atoms/Template/VariableTemplate';

type IVariantTemplateStyles = IStyles<IVariableTemplateStyleKey>;
export const styles: MapNamespaces<IVariantTemplateStyles> =
  stylex.create<IVariantTemplateStyles>({
    host: {},
  });
