import type { IContainerProps } from '@/helpers/types';
import type { IBasicTemplateStyleKey } from './BasicTemplate.styledefs';

export type IBasicTemplateProps = IContainerProps<IBasicTemplateStyleKey> & {
  children?: React.ReactNode;
};
