import type { IBoxProps } from '~/components/Box';
import { Placeholder } from '~/components/Placeholder';

type IDetailPaneProps = IBoxProps;

export const DetailPane: React.FC<IDetailPaneProps> = (props) => {
  const { ...other } = props;

  return (
    <Placeholder label="Detail" shape="$sm" h="$176" diagonals {...other} />
  );
};
