import { Flex, themeTokens } from '@sixui/core';

import type { ISortableProps } from '../Sortable';
import { Sortable } from '../Sortable';

export type ISortableListDemoProps = ISortableProps;

export const SortableListDemo: React.FC<ISortableListDemoProps> = (props) => (
  <Flex
    direction="row"
    gap="$sm"
    align="center"
    bd={`1px solid ${themeTokens.colorScheme.outlineVariant}`}
    br="$sm"
    p="$lg"
    w="min-content"
  >
    <Sortable {...props} />
  </Flex>
);
