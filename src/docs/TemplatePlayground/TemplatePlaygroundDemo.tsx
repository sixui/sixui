import type { IBasicTemplateProps } from '~/components/Template/BasicTemplate';
import { BasicTemplate } from '~/components/Template/BasicTemplate';

export type ITemplatePlaygroundDemoProps = {
  template: IBasicTemplateProps;
};

export const TemplatePlaygroundDemo: React.FC<ITemplatePlaygroundDemoProps> = (
  props,
) => <BasicTemplate {...props.template} />;
