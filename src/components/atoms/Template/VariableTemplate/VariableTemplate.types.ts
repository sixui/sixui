import type { IContainerProps } from '@/helpers/types';
import type { IVisualState } from '@/components/utils/VisualState';
import type { IVariableTemplateStylesKey } from './VariableTemplate.styles';

export type IVariableTemplateVariant = 'primary' | 'secondary';

export type IVariableTemplateProps =
  IContainerProps<IVariableTemplateStylesKey> & {
    visualState?: IVisualState;
    variant?: IVariableTemplateVariant | false;
    children?: React.ReactNode;
  };
