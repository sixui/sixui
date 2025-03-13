import type { IOmit, ISortableItem, ISortableItemProps } from '@sixui/core';
import {
  Box,
  Card,
  Flex,
  IconButton,
  IndeterminateCircularProgressIndicator,
  Overlayable,
  SortableItem,
  Text,
} from '@sixui/core';

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
          <IconButton onClick={onDelete} icon="❌" />
        </Overlayable>
      </Flex>
    </SortableItem>
  );
};
