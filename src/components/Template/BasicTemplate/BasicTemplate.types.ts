import type { IContainerProps } from '@/helpers/types';
import type { IBasicTemplateStylesKey } from './BasicTemplate.styles';

export type IBasicTemplateProps = IContainerProps<IBasicTemplateStylesKey> & {
  children?: React.ReactNode;
};
