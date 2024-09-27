import { Divider } from '../Divider';
import { dividerTheme } from '~/components/Divider/Divider.css';

const COMPONENT_NAME = 'MenuDivider';

export const MenuDivider = Divider.withProps({
  my: '$2',
});

MenuDivider.theme = dividerTheme;
MenuDivider.displayName = `@sixui/${COMPONENT_NAME}`;
