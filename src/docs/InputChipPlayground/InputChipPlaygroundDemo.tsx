import type { IInputChipProps } from '~/components/Chip';
import { InputChip } from '~/components/Chip';

export type IInputChipPlaygroundDemoProps = {
  inputChip: IInputChipProps;
};

export const InputChipPlaygroundDemo: React.FC<
  IInputChipPlaygroundDemoProps
> = (props) => <InputChip {...props.inputChip} />;
