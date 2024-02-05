import type { ITheme } from '../theme.types';

import { componentTheme as templateTheme } from './Template/Template.stylex';
import { styles as templateStyles } from './Template/Template.styles';
import { componentTheme as variantTemplateTheme } from './Template/VariantTemplate.stylex';
import { styles as variantTemplateStyles } from './Template/VariantTemplate.styles';

import { componentTheme as componentShowcaseTheme } from './ComponentShowcase/ComponentShowcase.stylex';
import { styles as componentShowcaseStyles } from './ComponentShowcase/ComponentShowcase.styles';

import { styles as placeholderStyles } from './Placeholder/Placeholder.styles';
import { componentTheme as placeholderTheme } from './Placeholder/Placeholder.stylex';

import { styles as rippleStyles } from './Ripple/Ripple.styles';
import { componentTheme as rippleTheme } from './Ripple/Ripple.stylex';

import { styles as elevationStyles } from './Elevation/Elevation.styles';
import { componentTheme as elevationTheme } from './Elevation/Elevation.stylex';

import { styles as focusRingStyles } from './FocusRing/FocusRing.styles';
import { componentTheme as focusRingTheme } from './FocusRing/FocusRing.stylex';

import { componentTheme as buttonTheme } from './Button/Button.stylex';
import {
  styles as buttonStyles,
  rippleStyles as buttonRippleStyles,
  elevationStyles as buttonElevationStyles,
  focusRingStyles as buttonFocusRingStyles,
  circularProgressIndicatorStyles as buttonCircularProgressIndicatorStyles,
} from './Button/Button.styles';
import { styles as buttonBaseStyles } from './Button/ButtonBase.styles';
import { componentTheme as elevatedButtonTheme } from './Button/ElevatedButton.stylex';
import { componentTheme as filledButtonTheme } from './Button/FilledButton.stylex';
import { componentTheme as filledTonalButtonTheme } from './Button/FilledTonalButton.stylex';
import { componentTheme as outlinedButtonTheme } from './Button/OutlinedButton.stylex';
import { styles as outlinedButtonStyles } from './Button/OutlinedButton.styles';
import { componentTheme as textButtonTheme } from './Button/TextButton.stylex';

import { styles as circularProgressIndicatorStyles } from './CircularProgressIndicator/CircularProgressIndicator.styles';
import { componentTheme as circularProgressIndicatorTheme } from './CircularProgressIndicator/CircularProgressIndicator.stylex';
import { styles as indeterminateCircularProgressIndicatorStyles } from './CircularProgressIndicator/IndeterminateCircularProgressIndicator.styles';
import { styles as determinateCircularProgressIndicatorStyles } from './CircularProgressIndicator/DeterminateCircularProgressIndicator.styles';

import { componentTheme as chipTheme } from './Chip/Chip.stylex';
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
import { componentTheme as fabTheme } from './Fab/Fab.stylex';
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
import { componentTheme as iconButtonTheme } from './IconButton/IconButton.stylex';
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
import { componentTheme as switchTheme } from './Switch/Switch.stylex';

import { styles as fieldSharedStyles } from './Field/Field.styles';
import { styles as fieldFilledStyles } from './Field/FilledField.styles';
import { styles as fieldOutlinedStyles } from './Field/OutlinedField.styles';

import { componentTheme as textFieldTheme } from './TextField/TextField.stylex';
import {
  styles as textFieldStyles,
  fieldStyles as textFieldFieldStyles,
} from './TextField/TextField.styles';
import { componentTheme as filledTextFieldTheme } from './TextField/FilledTextField.stylex';
import { componentTheme as outlinedTextFieldTheme } from './TextField/OutlinedTextField.stylex';

import { componentTheme as radioTheme } from './Radio/Radio.stylex';
import {
  styles as radioStyles,
  rippleStyles as radioRippleStyles,
  focusRingStyles as radioFocusRingStyles,
} from './Radio/Radio.styles';
import { componentTheme as checkboxTheme } from './Checkbox/Checkbox.stylex';
import {
  styles as checkboxStyles,
  rippleStyles as checkboxRippleStyles,
  focusRingStyles as checkboxFocusRingStyles,
} from './Checkbox/Checkbox.styles';

import { styles as itemStyles } from './Item/Item.styles';
import { componentTheme as itemTheme } from './Item/Item.stylex';

import { styles as listStyles } from './List/List.styles';
import { componentTheme as listTheme } from './List/List.stylex';
import { componentTheme as listItemTheme } from './Item/ListItem.stylex';
import {
  styles as listItemStyles,
  itemStyles as listItemItemStyles,
  rippleStyles as listItemRippleStyles,
  focusRingStyles as listItemFocusRingStyles,
} from './Item/ListItem.styles';

import { componentTheme as iconTheme } from './Icon/Icon.stylex';
import { styles as iconStyles } from './Icon/Icon.styles';

import { componentTheme as dividerTheme } from './Divider/Divider.stylex';
import { styles as dividerStyles } from './Divider/Divider.styles';

import { componentTheme as paperTheme } from './Paper/Paper.stylex';
import {
  styles as paperStyles,
  elevationStyles as paperElevationStyles,
} from './Paper/Paper.styles';
import { componentTheme as filledPaperTheme } from './Paper/FilledPaper.stylex';
import { componentTheme as outlinedPaperTheme } from './Paper/OutlinedPaper.stylex';
import { styles as outlinedPaperStyles } from './Paper/OutlinedPaper.styles';

import { componentTheme as cardTheme } from './Card/Card.stylex';
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

import { componentTheme as tabTheme } from './Tab/Tab.stylex';
import {
  styles as tabStyles,
  rippleStyles as tabRippleStyles,
  elevationStyles as tabElevationStyles,
  focusRingStyles as tabFocusRingStyles,
} from './Tab/Tab.styles';
import { componentTheme as primaryTabTheme } from './Tab/PrimaryTab.stylex';
import { styles as primaryTabStyles } from './Tab/PrimaryTab.styles';
import { componentTheme as secondaryTabTheme } from './Tab/SecondaryTab.stylex';

import { styles as tabListStyles } from './TabList/TabList.styles';

import { styles as typographyStyles } from './Typography/Typography.styles';

import { componentTheme as breadcrumbsTheme } from './Breadcrumbs/Breadcrumbs.stylex';
import {
  styles as breadcrumbsStyles,
  expandButtonStyles as breadcrumbsExpandButtonStyles,
  expandButtonFocusRingStyles as breadcrumbsExpandButtonFocusRingStyles,
} from './Breadcrumbs/Breadcrumbs.styles';

import { styles as anchoredStyles } from './Anchored/Anchored.styles';

import { componentTheme as badgeTheme } from './Badge/Badge.stylex';
import { styles as badgeStyles } from './Badge/Badge.styles';

export const theme: ITheme = {
  name: 'Material Design 3',
  components: {
    Template: {
      vars: templateTheme,
      styles: templateStyles,
    },
    VariantTemplate: {
      vars: variantTemplateTheme,
      styles: variantTemplateStyles,
    },
    ComponentShowcase: {
      vars: componentShowcaseTheme,
      styles: componentShowcaseStyles,
    },
    Placeholder: {
      vars: placeholderTheme,
      styles: placeholderStyles,
    },
    Ripple: {
      vars: rippleTheme,
      styles: rippleStyles,
    },
    Elevation: {
      vars: elevationTheme,
      styles: elevationStyles,
    },
    FocusRing: {
      vars: focusRingTheme,
      styles: focusRingStyles,
    },
    ButtonBase: {
      styles: buttonBaseStyles,
    },
    Button: {
      vars: buttonTheme,
      styles: buttonStyles,
      rippleStyles: buttonRippleStyles,
      focusRingStyles: buttonFocusRingStyles,
      elevationStyles: buttonElevationStyles,
      circularProgressIndicatorStyles: buttonCircularProgressIndicatorStyles,
    },
    ElevatedButton: { vars: elevatedButtonTheme },
    FilledButton: { vars: filledButtonTheme },
    FilledTonalButton: { vars: filledTonalButtonTheme },
    OutlinedButton: {
      vars: outlinedButtonTheme,
      styles: outlinedButtonStyles,
    },
    TextButton: { vars: textButtonTheme },
    CircularProgressIndicator: {
      vars: circularProgressIndicatorTheme,
      styles: circularProgressIndicatorStyles,
    },
    IndeterminateCircularProgressIndicator: {
      styles: indeterminateCircularProgressIndicatorStyles,
    },
    DeterminateCircularProgressIndicator: {
      styles: determinateCircularProgressIndicatorStyles,
    },
    Chip: {
      vars: chipTheme,
      styles: chipStyles,
      rippleStyles: chipRippleStyles,
      focusRingStyles: chipFocusRingStyles,
      elevationStyles: chipElevationStyles,
      trailingActionFocusRingStyles: chipTrailingActionFocusRingStyles,
      trailingActionRippleStyles: chipTrailingActionRippleStyles,
      circularProgressIndicatorStyles: chipCircularProgressIndicatorStyles,
    },
    AssistChip: { vars: assistChipTheme },
    FilterChip: { vars: filterChipTheme },
    InputChip: { vars: inputChipTheme },
    SuggestionChip: { vars: suggestionChipTheme },
    Fab: {
      vars: fabTheme,
      styles: fabStyles,
      rippleStyles: fabRippleStyles,
      focusRingStyles: fabFocusRingStyles,
      elevationStyles: fabElevationStyles,
      circularProgressIndicatorStyles: fabCircularProgressIndicatorStyles,
    },
    SurfaceFab: { vars: surfaceFabTheme },
    PrimaryFab: { vars: primaryFabTheme },
    SecondaryFab: { vars: secondaryFabTheme },
    TertiaryFab: { vars: tertiaryFabTheme },
    BrandedFab: { vars: brandedFabTheme },
    IconButton: {
      vars: iconButtonTheme,
      styles: iconButtonStyles,
      rippleStyles: iconButtonRippleStyles,
      focusRingStyles: iconButtonFocusRingStyles,
      circularProgressIndicatorStyles:
        iconButtonCircularProgressIndicatorStyles,
    },
    StandardIconButton: { vars: standardIconButtonTheme },
    FilledIconButton: { vars: filledIconButtonTheme },
    FilledTonalIconButton: { vars: filledTonalIconButtonTheme },
    OutlinedIconButton: {
      vars: outlinedIconButtonTheme,
      styles: outlinedIconButtonStyles,
    },
    Switch: {
      vars: switchTheme,
      styles: switchStyles,
      rippleStyles: switchRippleStyles,
      focusRingStyles: switchFocusRingStyles,
      circularProgressIndicatorStyles: switchCircularProgressIndicatorStyles,
    },
    Field: {
      vars: textFieldTheme,
      styles: fieldSharedStyles,
    },
    FilledField: {
      vars: filledTextFieldTheme,
      styles: fieldFilledStyles,
    },
    OutlinedField: {
      vars: outlinedTextFieldTheme,
      styles: fieldOutlinedStyles,
    },
    TextField: {
      vars: textFieldTheme,
      styles: textFieldStyles,
      fieldStyles: textFieldFieldStyles,
    },
    FilledTextField: { vars: filledTextFieldTheme },
    OutlinedTextField: { vars: outlinedTextFieldTheme },
    Radio: {
      vars: radioTheme,
      styles: radioStyles,
      rippleStyles: radioRippleStyles,
      focusRingStyles: radioFocusRingStyles,
    },
    Checkbox: {
      vars: checkboxTheme,
      styles: checkboxStyles,
      rippleStyles: checkboxRippleStyles,
      focusRingStyles: checkboxFocusRingStyles,
    },
    Item: {
      vars: itemTheme,
      styles: itemStyles,
    },
    ListItem: {
      vars: listItemTheme,
      styles: listItemStyles,
      itemStyles: listItemItemStyles,
      rippleStyles: listItemRippleStyles,
      focusRingStyles: listItemFocusRingStyles,
    },
    List: {
      vars: listTheme,
      styles: listStyles,
    },
    Icon: {
      vars: iconTheme,
      styles: iconStyles,
    },
    Divider: {
      vars: dividerTheme,
      styles: dividerStyles,
    },
    Paper: {
      vars: paperTheme,
      styles: paperStyles,
      elevationStyles: paperElevationStyles,
    },
    FilledPaper: { vars: filledPaperTheme },
    OutlinedPaper: {
      vars: outlinedPaperTheme,
      styles: outlinedPaperStyles,
    },
    Card: {
      vars: cardTheme,
      styles: cardStyles,
      rippleStyles: cardRippleStyles,
      focusRingStyles: cardFocusRingStyles,
      elevationStyles: cardElevationStyles,
    },
    ElevatedCard: { vars: elevatedCardTheme },
    FilledCard: { vars: filledCardTheme },
    OutlinedCard: {
      vars: outlinedCardTheme,
      styles: outlinedCardStyles,
    },
    Tab: {
      vars: tabTheme,
      styles: tabStyles,
      rippleStyles: tabRippleStyles,
      focusRingStyles: tabFocusRingStyles,
      elevationStyles: tabElevationStyles,
    },
    PrimaryTab: { vars: primaryTabTheme, styles: primaryTabStyles },
    SecondaryTab: { vars: secondaryTabTheme },
    TabList: {
      styles: tabListStyles,
    },
    Typography: {
      styles: typographyStyles,
    },
    Breadcrumbs: {
      vars: breadcrumbsTheme,
      styles: breadcrumbsStyles,
      expandButtonStyles: breadcrumbsExpandButtonStyles,
      expandButtonFocusRingStyles: breadcrumbsExpandButtonFocusRingStyles,
    },
    Anchored: {
      styles: anchoredStyles,
    },
    Badge: {
      vars: badgeTheme,
      styles: badgeStyles,
    },
  },
};
