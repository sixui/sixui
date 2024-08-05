import type { IBaseProps } from '~/components/Base';
import type { IVisualState } from '../../VisualState';
import type { IVariableTemplateStylesKey } from './VariableTemplate.styles';

export type IVariableTemplateVariant = 'primary' | 'secondary';

export type IVariableTemplateProps = IBaseProps<IVariableTemplateStylesKey> & {
  visualState?: IVisualState;
  variant?: IVariableTemplateVariant | false;
  children?: React.ReactNode;
};
