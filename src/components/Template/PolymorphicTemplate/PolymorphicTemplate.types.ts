import type { IPolymorphicTemplateStylesKey } from './PolymorphicTemplate.styles';
import { IBaseProps } from '~/components/Base';

export type IPolymorphicTemplateProps =
  IBaseProps<IPolymorphicTemplateStylesKey> & {
    children?: React.ReactNode;
  };
