import { AppLayout } from '~/components/AppLayout';
import { IAppLayoutTopBarProps } from '../AppLayoutTopBar';

export type ITopBarProps = IAppLayoutTopBarProps;

export const TopBar: React.FC<ITopBarProps> = (props) => {
  const { ...other } = props;

  return <AppLayout.TopBar headline="App Layout" {...other} />;
};
