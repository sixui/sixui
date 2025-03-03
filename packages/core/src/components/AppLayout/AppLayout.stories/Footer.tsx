import type { IAppLayoutFooterProps } from '../AppLayoutFooter';
import { AppLayout } from '~/components/AppLayout';
import { Flex } from '~/components/Flex';
import { Placeholder } from '~/components/Placeholder';

export type IFooterProps = IAppLayoutFooterProps;

export const Footer: React.FC<IFooterProps> = (props) => {
  const { ...other } = props;

  return (
    <AppLayout.Footer {...other}>
      <Flex direction="row" gap="$xl" justify="space-between">
        <Placeholder w="100%" h="128px" shape="$sm" label="Footer" diagonals />
      </Flex>
    </AppLayout.Footer>
  );
};
