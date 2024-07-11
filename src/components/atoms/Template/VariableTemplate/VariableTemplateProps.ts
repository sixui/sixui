import type { IContainerProps } from '@/helpers/types';
import type {
  IVariableTemplateStyleKey,
  IVariableTemplateVariant,
} from './VariableTemplate.styledefs';
import type { IVisualState } from '@/components/utils/VisualState';

export type IVariableTemplateProps =
  IContainerProps<IVariableTemplateStyleKey> & {
    visualState?: IVisualState;
    variant?: IVariableTemplateVariant | false;
    children?: React.ReactNode;
  };
