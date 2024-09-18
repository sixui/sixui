import type { IFabProps } from '~/components/Fab';
import { Fab } from '~/components/Fab';

export type IFabPlaygroundDemoProps = {
  fab: IFabProps;
};

export const FabPlaygroundDemo: React.FC<IFabPlaygroundDemoProps> = (props) => (
  <Fab {...props.fab} />
);
