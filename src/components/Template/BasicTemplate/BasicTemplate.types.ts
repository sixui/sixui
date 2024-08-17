import type { IBasicTemplateStylesKey } from './BasicTemplate.styles';
import type { IBaseProps } from '~/components/Base';

export type IBasicTemplateProps = IBaseProps<IBasicTemplateStylesKey> & {
  children?: React.ReactNode;
};
