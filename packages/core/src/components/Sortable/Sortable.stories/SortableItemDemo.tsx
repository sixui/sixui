import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { delay } from '@olivierpascal/helpers';

import type { IOmit } from '~/utils/types';
import type { ISortableItem } from '../Sortable.types';
import type { ISortableItemProps } from '../SortableItem';
import { Box } from '~/components/Box';
import { Card } from '~/components/Card';
import { Flex } from '~/components/Flex';
import { IconButton } from '~/components/IconButton';
import { IndeterminateCircularProgressIndicator } from '~/components/IndeterminateCircularProgressIndicator';
import { Overlayable } from '~/components/Overlayable';
import { Text } from '~/components/Text';
import { SortableItem } from '../SortableItem';

export type IItem = string;

export interface ISortableItemDemoProps
  extends IOmit<ISortableItemProps, 'children'>,
    ISortableItem<IItem> {}

export const SortableItemDemo: React.FC<ISortableItemDemoProps> = (props) => {
  const {
    processing: _processing,
    itemProcessing,
    disabled,
    onDelete,
    ...other
  } = props;

  return (
    <SortableItem
      as={Card}
      fixed={disabled}
      shape="$sm"
      w="96px"
      h="96px"
      {...other}
    >
      <Box pos="absolute" top="4px" right="8px">
        <Text variant="label">{props.id}</Text>
      </Box>

      <Flex justify="center" align="center" h="100%">
        <Overlayable
          overlay={<IndeterminateCircularProgressIndicator fz="24px" />}
          visible={itemProcessing}
        >
          <IconButton
            icon={<FontAwesomeIcon icon={faXmark} />}
            onClick={() => delay(600).then(() => onDelete?.())}
          />
        </Overlayable>
      </Flex>
    </SortableItem>
  );
};
