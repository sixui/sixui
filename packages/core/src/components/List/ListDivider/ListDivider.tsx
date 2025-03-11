import { Divider } from '~/components/Divider';
import { dividerTheme } from '~/components/Divider/Divider.css';
import { COMPONENT_NAME } from './ListDivider.constants';

/**
 * @see https://m3.material.io/components/divider/overview
 */
export const ListDivider = Divider.withProps({
  my: '$2',
});

ListDivider.displayName = `@sixui/core/${COMPONENT_NAME}`;
ListDivider.theme = dividerTheme;
