import { dividerTheme } from '~/components/Divider/Divider.css';
import { Divider } from '../Divider';

const COMPONENT_NAME = 'ListDivider';

export const ListDivider = Divider.withProps({
  my: '$2',
});

ListDivider.theme = dividerTheme;
ListDivider.displayName = `@sixui/${COMPONENT_NAME}`;
