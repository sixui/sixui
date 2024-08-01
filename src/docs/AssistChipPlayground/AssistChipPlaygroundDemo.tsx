import { AssistChip, type IAssistChipProps } from '~/components/Chip';

export type IAssistChipPlaygroundDemoProps = {
  assistChip: IAssistChipProps;
};

export const AssistChipPlaygroundDemo: React.FC<
  IAssistChipPlaygroundDemoProps
> = (props) => <AssistChip {...props.assistChip} />;
