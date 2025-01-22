import { createSequence } from '@olivierpascal/helpers';

import type { IAppLayoutFooterProps } from '~/components/AppLayoutFooter';
import { Text } from '~/components/Text';
import { AppLayout } from '../AppLayout';

export type IFooterProps = IAppLayoutFooterProps;

export const Footer: React.FC<IFooterProps> = (props) => {
  const { ...other } = props;

  return (
    <AppLayout.Footer {...other}>
      {createSequence(2).map((index) => (
        <Text key={index} gutterBottom>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a
          ullamcorper nisl. In ut diam sapien. Proin orci mauris, pretium ac
          ante ut, porta fermentum ipsum. Proin at lobortis turpis, a rhoncus
          massa.
        </Text>
      ))}
    </AppLayout.Footer>
  );
};
