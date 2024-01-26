import type { ITheme } from '../theme.types';

import {
  componentTheme as templateTheme,
  componentVars as templateVars,
} from './Template/Template.stylex';
import { styles as templateStyles } from './Template/Template.styles';
import { componentTheme as variantTemplateTheme } from './Template/VariantTemplate.stylex';
import { styles as variantTemplateStyles } from './Template/VariantTemplate.styles';

import {
  componentTheme as componentShowcaseTheme,
  componentVars as componentShowcaseVars,
} from './ComponentShowcase/ComponentShowcase.stylex';
import { styles as componentShowcaseStyles } from './ComponentShowcase/ComponentShowcase.styles';

import { styles as placeholderStyles } from './Placeholder/Placeholder.styles';
import {
  componentTheme as placeholderTheme,
  componentVars as placeholderVars,
} from './Placeholder/Placeholder.stylex';

import { styles as rippleStyles } from './Ripple/Ripple.styles';
import {
  componentTheme as rippleTheme,
  componentVars as rippleVars,
} from './Ripple/Ripple.stylex';

import { styles as elevationStyles } from './Elevation/Elevation.styles';
import {
  componentTheme as elevationTheme,
  componentVars as elevationVars,
} from './Elevation/Elevation.stylex';

import { styles as focusRingStyles } from './FocusRing/FocusRing.styles';
import {
  componentTheme as focusRingTheme,
  componentVars as focusRingVars,
} from './FocusRing/FocusRing.stylex';

import {
  componentTheme as buttonTheme,
  componentVars as buttonVars,
} from './Button/Button.stylex';
import {
  styles as buttonStyles,
  rippleStyles as buttonRippleStyles,
  elevationStyles as buttonElevationStyles,
  focusRingStyles as buttonFocusRingStyles,
  circularProgressIndicatorStyles as buttonCircularProgressIndicatorStyles,
} from './Button/Button.styles';
import { componentTheme as elevatedButtonTheme } from './Button/ElevatedButton.stylex';
import { componentTheme as filledButtonTheme } from './Button/FilledButton.stylex';
import { componentTheme as filledTonalButtonTheme } from './Button/FilledTonalButton.stylex';
import { componentTheme as outlinedButtonTheme } from './Button/OutlinedButton.stylex';
import { styles as outlinedButtonStyles } from './Button/OutlinedButton.styles';
import { componentTheme as textButtonTheme } from './Button/TextButton.stylex';

import { styles as circularProgressIndicatorStyles } from './CircularProgressIndicator/CircularProgressIndicator.styles';
import {
  componentTheme as circularProgressIndicatorTheme,
  componentVars as circularProgressIndicatorVars,
} from './CircularProgressIndicator/CircularProgressIndicator.stylex';
import { styles as indeterminateCircularProgressIndicatorStyles } from './CircularProgressIndicator/IndeterminateCircularProgressIndicator.styles';
import { styles as determinateCircularProgressIndicatorStyles } from './CircularProgressIndicator/DeterminateCircularProgressIndicator.styles';

import {
  componentTheme as chipTheme,
  componentVars as chipVars,
} from './Chip/Chip.stylex';
import {
  styles as chipStyles,
  rippleStyles as chipRippleStyles,
  elevationStyles as chipElevationStyles,
  focusRingStyles as chipFocusRingStyles,
  trailingActionFocusRingStyles as chipTrailingActionFocusRingStyles,
  trailingActionRippleStyles as chipTrailingActionRippleStyles,
  circularProgressIndicatorStyles as chipCircularProgressIndicatorStyles,
} from './Chip/Chip.styles';
import { componentTheme as assistChipTheme } from './Chip/AssistChip.stylex';
import { componentTheme as filterChipTheme } from './Chip/FilterChip.stylex';
import { componentTheme as inputChipTheme } from './Chip/InputChip.stylex';
import { componentTheme as suggestionChipTheme } from './Chip/SuggestionChip.stylex';

import {
  styles as fabStyles,
  rippleStyles as fabRippleStyles,
  elevationStyles as fabElevationStyles,
  focusRingStyles as fabFocusRingStyles,
  circularProgressIndicatorStyles as fabCircularProgressIndicatorStyles,
} from './Fab/Fab.styles';
import {
  componentTheme as fabTheme,
  componentVars as fabVars,
} from './Fab/Fab.stylex';
import { componentTheme as surfaceFabTheme } from './Fab/SurfaceFab.stylex';
import { componentTheme as primaryFabTheme } from './Fab/PrimaryFab.stylex';
import { componentTheme as secondaryFabTheme } from './Fab/SecondaryFab.stylex';
import { componentTheme as tertiaryFabTheme } from './Fab/TertiaryFab.stylex';
import { componentTheme as brandedFabTheme } from './Fab/BrandedFab.stylex';

import {
  styles as iconButtonStyles,
  rippleStyles as iconButtonRippleStyles,
  focusRingStyles as iconButtonFocusRingStyles,
  circularProgressIndicatorStyles as iconButtonCircularProgressIndicatorStyles,
} from './IconButton/IconButton.styles';
import {
  componentTheme as iconButtonTheme,
  componentVars as iconButtonVars,
} from './IconButton/IconButton.stylex';
import { componentTheme as standardIconButtonTheme } from './IconButton/StandardIconButton.stylex';
import { componentTheme as filledIconButtonTheme } from './IconButton/FilledIconButton.stylex';
import { componentTheme as filledTonalIconButtonTheme } from './IconButton/FilledTonalIconButton.stylex';
import { componentTheme as outlinedIconButtonTheme } from './IconButton/OutlinedIconButton.stylex';
import { styles as outlinedIconButtonStyles } from './IconButton/OutlinedIconButton.styles';

import {
  styles as switchStyles,
  rippleStyles as switchRippleStyles,
  focusRingStyles as switchFocusRingStyles,
  circularProgressIndicatorStyles as switchCircularProgressIndicatorStyles,
} from './Switch/Switch.styles';
import {
  componentTheme as switchTheme,
  componentVars as switchVars,
} from './Switch/Switch.stylex';

import { styles as fieldSharedStyles } from './Field/Field.styles';
import { styles as fieldFilledStyles } from './Field/FilledField.styles';
import { styles as fieldOutlinedStyles } from './Field/OutlinedField.styles';

import {
  componentTheme as textFieldTheme,
  componentVars as textFieldVars,
} from './TextField/TextField.stylex';
import {
  styles as textFieldStyles,
  fieldStyles as textFieldFieldStyles,
} from './TextField/TextField.styles';
import { componentTheme as filledTextFieldTheme } from './TextField/FilledTextField.stylex';
import { componentTheme as outlinedTextFieldTheme } from './TextField/OutlinedTextField.stylex';

import {
  componentTheme as radioTheme,
  componentVars as radioVars,
} from './Radio/Radio.stylex';
import {
  styles as radioStyles,
  rippleStyles as radioRippleStyles,
  focusRingStyles as radioFocusRingStyles,
} from './Radio/Radio.styles';
import {
  componentTheme as checkboxTheme,
  componentVars as checkboxVars,
} from './Checkbox/Checkbox.stylex';
import {
  styles as checkboxStyles,
  rippleStyles as checkboxRippleStyles,
  focusRingStyles as checkboxFocusRingStyles,
} from './Checkbox/Checkbox.styles';

import { styles as itemStyles } from './Item/Item.styles';
import {
  componentTheme as itemTheme,
  componentVars as itemVars,
} from './Item/Item.stylex';

import { styles as listStyles } from './List/List.styles';
import {
  componentTheme as listTheme,
  componentVars as listVars,
} from './List/List.stylex';
import {
  componentTheme as listItemTheme,
  componentVars as listItemVars,
} from './Item/ListItem.stylex';
import {
  styles as listItemStyles,
  itemStyles as listItemItemStyles,
  rippleStyles as listItemRippleStyles,
  focusRingStyles as listItemFocusRingStyles,
} from './Item/ListItem.styles';

import {
  componentTheme as iconTheme,
  componentVars as iconVars,
} from './Icon/Icon.stylex';
import { styles as iconStyles } from './Icon/Icon.styles';

import {
  componentTheme as dividerTheme,
  componentVars as dividerVars,
} from './Divider/Divider.stylex';
import { styles as dividerStyles } from './Divider/Divider.styles';

import {
  componentTheme as cardTheme,
  componentVars as cardVars,
} from './Card/Card.stylex';
import {
  styles as cardStyles,
  rippleStyles as cardRippleStyles,
  focusRingStyles as cardFocusRingStyles,
  elevationStyles as cardElevationStyles,
} from './Card/Card.styles';
import { componentTheme as elevatedCardTheme } from './Card/ElevatedCard.stylex';
import { componentTheme as filledCardTheme } from './Card/FilledCard.stylex';
import { componentTheme as outlinedCardTheme } from './Card/OutlinedCard.stylex';
import { styles as outlinedCardStyles } from './Card/OutlinedCard.styles';

export const theme: ITheme = {
  name: 'Material Design 3',
  components: {
    Template: {
      theme: templateTheme,
      vars: templateVars,
      styles: templateStyles,
    },
    ComponentShowcase: {
      theme: componentShowcaseTheme,
      vars: componentShowcaseVars,
      styles: componentShowcaseStyles,
    },
    VariantTemplate: {
      theme: variantTemplateTheme,
      styles: variantTemplateStyles,
    },
    Placeholder: {
      theme: placeholderTheme,
      vars: placeholderVars,
      styles: placeholderStyles,
    },
    Ripple: {
      theme: rippleTheme,
      vars: rippleVars,
      styles: rippleStyles,
    },
    Elevation: {
      theme: elevationTheme,
      vars: elevationVars,
      styles: elevationStyles,
    },
    FocusRing: {
      theme: focusRingTheme,
      vars: focusRingVars,
      styles: focusRingStyles,
    },
    Button: {
      theme: buttonTheme,
      styles: buttonStyles,
      vars: buttonVars,
      rippleStyles: buttonRippleStyles,
      focusRingStyles: buttonFocusRingStyles,
      elevationStyles: buttonElevationStyles,
      circularProgressIndicatorStyles: buttonCircularProgressIndicatorStyles,
    },
    ElevatedButton: { theme: elevatedButtonTheme },
    FilledButton: { theme: filledButtonTheme },
    FilledTonalButton: { theme: filledTonalButtonTheme },
    OutlinedButton: {
      theme: outlinedButtonTheme,
      styles: outlinedButtonStyles,
    },
    TextButton: { theme: textButtonTheme },
    CircularProgressIndicator: {
      theme: circularProgressIndicatorTheme,
      vars: circularProgressIndicatorVars,
      styles: circularProgressIndicatorStyles,
    },
    IndeterminateCircularProgressIndicator: {
      styles: indeterminateCircularProgressIndicatorStyles,
    },
    DeterminateCircularProgressIndicator: {
      styles: determinateCircularProgressIndicatorStyles,
    },
    Chip: {
      theme: chipTheme,
      vars: chipVars,
      styles: chipStyles,
      rippleStyles: chipRippleStyles,
      focusRingStyles: chipFocusRingStyles,
      elevationStyles: chipElevationStyles,
      trailingActionFocusRingStyles: chipTrailingActionFocusRingStyles,
      trailingActionRippleStyles: chipTrailingActionRippleStyles,
      circularProgressIndicatorStyles: chipCircularProgressIndicatorStyles,
    },
    AssistChip: { theme: assistChipTheme },
    FilterChip: { theme: filterChipTheme },
    InputChip: { theme: inputChipTheme },
    SuggestionChip: { theme: suggestionChipTheme },
    Fab: {
      theme: fabTheme,
      vars: fabVars,
      styles: fabStyles,
      rippleStyles: fabRippleStyles,
      focusRingStyles: fabFocusRingStyles,
      elevationStyles: fabElevationStyles,
      circularProgressIndicatorStyles: fabCircularProgressIndicatorStyles,
    },
    SurfaceFab: { theme: surfaceFabTheme },
    PrimaryFab: { theme: primaryFabTheme },
    SecondaryFab: { theme: secondaryFabTheme },
    TertiaryFab: { theme: tertiaryFabTheme },
    BrandedFab: { theme: brandedFabTheme },
    IconButton: {
      theme: iconButtonTheme,
      vars: iconButtonVars,
      styles: iconButtonStyles,
      rippleStyles: iconButtonRippleStyles,
      focusRingStyles: iconButtonFocusRingStyles,
      circularProgressIndicatorStyles:
        iconButtonCircularProgressIndicatorStyles,
    },
    StandardIconButton: { theme: standardIconButtonTheme },
    FilledIconButton: { theme: filledIconButtonTheme },
    FilledTonalIconButton: { theme: filledTonalIconButtonTheme },
    OutlinedIconButton: {
      theme: outlinedIconButtonTheme,
      styles: outlinedIconButtonStyles,
    },
    Switch: {
      theme: switchTheme,
      vars: switchVars,
      styles: switchStyles,
      rippleStyles: switchRippleStyles,
      focusRingStyles: switchFocusRingStyles,
      circularProgressIndicatorStyles: switchCircularProgressIndicatorStyles,
    },
    Field: {
      theme: textFieldTheme,
      styles: fieldSharedStyles,
    },
    FilledField: {
      theme: filledTextFieldTheme,
      styles: fieldFilledStyles,
    },
    OutlinedField: {
      theme: outlinedTextFieldTheme,
      styles: fieldOutlinedStyles,
    },
    TextField: {
      theme: textFieldTheme,
      vars: textFieldVars,
      styles: textFieldStyles,
      fieldStyles: textFieldFieldStyles,
    },
    FilledTextField: { theme: filledTextFieldTheme },
    OutlinedTextField: { theme: outlinedTextFieldTheme },
    Radio: {
      theme: radioTheme,
      styles: radioStyles,
      vars: radioVars,
      rippleStyles: radioRippleStyles,
      focusRingStyles: radioFocusRingStyles,
    },
    Checkbox: {
      theme: checkboxTheme,
      styles: checkboxStyles,
      vars: checkboxVars,
      rippleStyles: checkboxRippleStyles,
      focusRingStyles: checkboxFocusRingStyles,
    },
    Item: {
      theme: itemTheme,
      styles: itemStyles,
      vars: itemVars,
    },
    ListItem: {
      theme: listItemTheme,
      styles: listItemStyles,
      vars: listItemVars,
      itemStyles: listItemItemStyles,
      rippleStyles: listItemRippleStyles,
      focusRingStyles: listItemFocusRingStyles,
    },
    List: {
      theme: listTheme,
      styles: listStyles,
      vars: listVars,
    },
    Icon: {
      theme: iconTheme,
      styles: iconStyles,
      vars: iconVars,
    },
    Divider: {
      theme: dividerTheme,
      styles: dividerStyles,
      vars: dividerVars,
    },
    Card: {
      theme: cardTheme,
      styles: cardStyles,
      vars: cardVars,
      rippleStyles: cardRippleStyles,
      focusRingStyles: cardFocusRingStyles,
      elevationStyles: cardElevationStyles,
    },
    ElevatedCard: { theme: elevatedCardTheme },
    FilledCard: { theme: filledCardTheme },
    OutlinedCard: {
      theme: outlinedCardTheme,
      styles: outlinedCardStyles,
    },
  },
};
