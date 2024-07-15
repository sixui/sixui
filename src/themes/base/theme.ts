import type { ITheme } from '../theme.types';

import { darkColorRoles, darkColorRolesTheme } from './vars/darkColorRoles';

import { componentTheme as componentShowcaseTheme } from './ComponentShowcase/ComponentShowcase.stylex';
import { styles as componentShowcaseStyles } from './ComponentShowcase/ComponentShowcase.styles';

import { styles as stateLayerStyles } from './StateLayer/StateLayer.styles';
import { componentTheme as statelayerTheme } from './StateLayer/StateLayer.stylex';

import { styles as elevationStyles } from './Elevation/Elevation.styles';
import { componentTheme as elevationTheme } from './Elevation/Elevation.stylex';

import { styles as focusRingStyles } from './FocusRing/FocusRing.styles';
import { componentTheme as focusRingTheme } from './FocusRing/FocusRing.stylex';

import {
  styles as textFieldBaseStyles,
  fieldStyles as textFieldBaseFieldStyles,
} from './TextFieldBase/TextFieldBase.styles';
import { componentTheme as textFieldTheme } from './TextFieldBase/TextFieldBase.stylex';

import { styles as typographyStyles } from './Typography/Typography.styles';

import { styles as anchoredStyles } from './Anchored/Anchored.styles';

import { componentTheme as elementWithLabelTheme } from './ElementWithLabel/ElementWithLabel.stylex';
import { styles as elementWithLabelStyles } from './ElementWithLabel/ElementWithLabel.styles';

export const theme: ITheme = {
  name: 'Material Design 3',
  colorSchemes: {
    dark: darkColorRolesTheme,
  },
  colorRoles: {
    dark: darkColorRoles,
  },
  components: {
    ComponentShowcase: {
      vars: componentShowcaseTheme,
      styles: componentShowcaseStyles,
    },
    StateLayer: {
      vars: statelayerTheme,
      styles: stateLayerStyles,
    },
    Elevation: {
      vars: elevationTheme,
      styles: elevationStyles,
    },
    FocusRing: {
      vars: focusRingTheme,
      styles: focusRingStyles,
    },
    TextFieldBase: {
      vars: textFieldTheme,
      styles: textFieldBaseStyles,
      fieldStyles: textFieldBaseFieldStyles,
    },
    FilledTextField: {},
    OutlinedTextField: {},
    Typography: {
      styles: typographyStyles,
    },
    Anchored: {
      styles: anchoredStyles,
    },
    ElementWithLabel: {
      vars: elementWithLabelTheme,
      styles: elementWithLabelStyles,
    },
  },
};
