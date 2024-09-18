import { dividerTheme } from '~/components/Divider/Divider.css';
import { Divider } from '../../Divider';

const COMPONENT_NAME = 'MenuDivider';

export const MenuDivider = Divider.withProps({
  my: '$2',
});

MenuDivider.theme = dividerTheme;
MenuDivider.displayName = `@sixui/${COMPONENT_NAME}`;
