import { Divider } from '~/components/Divider';
import { dividerTheme } from '~/components/Divider/Divider.css';
import { COMPONENT_NAME } from './ListDivider.constants';

export const ListDivider = Divider.withProps({
  my: '$2',
});

ListDivider.theme = dividerTheme;
ListDivider.displayName = `@sixui/core/${COMPONENT_NAME}`;
