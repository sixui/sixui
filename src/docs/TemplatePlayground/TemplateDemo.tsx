import type { IOmit } from '~/helpers/types';
import {
  BasicTemplate,
  type IBasicTemplateProps,
} from '~/components/Template/BasicTemplate';

export type ITemplateDemoProps = IOmit<IBasicTemplateProps, 'styles'>;

export const TemplateDemo: React.FC<ITemplateDemoProps> = (props) => (
  <BasicTemplate {...props} />
);
