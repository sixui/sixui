import type { ITheme } from '../theme.types';

import { darkColorRoles, darkColorRolesTheme } from './vars/darkColorsRoles';

import { componentTheme as templateTheme } from './Template/Template.stylex';
import { styles as templateStyles } from './Template/Template.styles';
import { componentTheme as variantTemplateTheme } from './Template/VariantTemplate.stylex';
import { styles as variantTemplateStyles } from './Template/VariantTemplate.styles';

import { componentTheme as componentShowcaseTheme } from './ComponentShowcase/ComponentShowcase.stylex';
import { styles as componentShowcaseStyles } from './ComponentShowcase/ComponentShowcase.styles';

import { styles as placeholderStyles } from './Placeholder/Placeholder.styles';
import { componentTheme as placeholderTheme } from './Placeholder/Placeholder.stylex';

import { styles as stateLayerStyles } from './StateLayer/StateLayer.styles';
import { componentTheme as statelayerTheme } from './StateLayer/StateLayer.stylex';

import { styles as elevationStyles } from './Elevation/Elevation.styles';
import { componentTheme as elevationTheme } from './Elevation/Elevation.stylex';

import { styles as focusRingStyles } from './FocusRing/FocusRing.styles';
import { componentTheme as focusRingTheme } from './FocusRing/FocusRing.stylex';

import { componentTheme as buttonTheme } from './Button/Button.stylex';
import {
  styles as buttonStyles,
  stateLayerStyles as buttonStateLayerStyles,
  elevationStyles as buttonElevationStyles,
  focusRingStyles as buttonFocusRingStyles,
  circularProgressIndicatorStyles as buttonCircularProgressIndicatorStyles,
} from './Button/Button.styles';
import { styles as buttonBaseStyles } from './Button/ButtonBase.styles';
import { componentTheme as elevatedButtonTheme } from './Button/ElevatedButton.stylex';
import { componentTheme as filledButtonTheme } from './Button/FilledButton.stylex';
import { componentTheme as filledTonalButtonTheme } from './Button/FilledTonalButton.stylex';
import { componentTheme as outlinedButtonTheme } from './Button/OutlinedButton.stylex';
import { componentTheme as textButtonTheme } from './Button/TextButton.stylex';

import { styles as circularProgressIndicatorStyles } from './CircularProgressIndicator/CircularProgressIndicator.styles';
import { componentTheme as circularProgressIndicatorTheme } from './CircularProgressIndicator/CircularProgressIndicator.stylex';
import { styles as indeterminateCircularProgressIndicatorStyles } from './CircularProgressIndicator/IndeterminateCircularProgressIndicator.styles';
import { styles as determinateCircularProgressIndicatorStyles } from './CircularProgressIndicator/DeterminateCircularProgressIndicator.styles';

import { componentTheme as chipTheme } from './Chip/Chip.stylex';
import {
  styles as chipStyles,
  stateLayerStyles as chipStateLayerStyles,
  elevationStyles as chipElevationStyles,
  focusRingStyles as chipFocusRingStyles,
  trailingActionFocusRingStyles as chipTrailingActionFocusRingStyles,
  trailingActionStateLayerStyles as chipTrailingActionStateLayerStyles,
  circularProgressIndicatorStyles as chipCircularProgressIndicatorStyles,
} from './Chip/Chip.styles';
import { componentTheme as assistChipTheme } from './Chip/AssistChip.stylex';
import { componentTheme as filterChipTheme } from './Chip/FilterChip.stylex';
import { componentTheme as inputChipTheme } from './Chip/InputChip.stylex';
import { componentTheme as suggestionChipTheme } from './Chip/SuggestionChip.stylex';

import { styles as fabStyles } from './Fab/Fab.styles';
import { componentTheme as fabTheme } from './Fab/Fab.stylex';
import { componentTheme as surfaceFabTheme } from './Fab/SurfaceFab.stylex';
import { componentTheme as primaryFabTheme } from './Fab/PrimaryFab.stylex';
import { componentTheme as secondaryFabTheme } from './Fab/SecondaryFab.stylex';
import { componentTheme as tertiaryFabTheme } from './Fab/TertiaryFab.stylex';
import { componentTheme as brandedFabTheme } from './Fab/BrandedFab.stylex';

import { styles as iconButtonStyles } from './IconButton/IconButton.styles';
import { componentTheme as iconButtonTheme } from './IconButton/IconButton.stylex';
import { componentTheme as standardIconButtonTheme } from './IconButton/StandardIconButton.stylex';
import { componentTheme as filledIconButtonTheme } from './IconButton/FilledIconButton.stylex';
import { componentTheme as filledTonalIconButtonTheme } from './IconButton/FilledTonalIconButton.stylex';
import { componentTheme as outlinedIconButtonTheme } from './IconButton/OutlinedIconButton.stylex';

import {
  styles as switchStyles,
  stateLayerStyles as switchStateLayerStyles,
  focusRingStyles as switchFocusRingStyles,
  circularProgressIndicatorStyles as switchCircularProgressIndicatorStyles,
} from './Switch/Switch.styles';
import { componentTheme as switchTheme } from './Switch/Switch.stylex';

import { styles as fieldBaseStyles } from './FieldBase/FieldBase.styles';
import { componentTheme as fieldBaseTheme } from './FieldBase/FieldBase.stylex';
import { styles as filledFieldBaseStyles } from './FieldBase/FilledFieldBase.styles';
import { componentTheme as filledFieldBaseTheme } from './FieldBase/FilledFieldBase.stylex';
import { styles as outlinedFieldBaseStyles } from './FieldBase/OutlinedFieldBase.styles';
import { componentTheme as outlinedFieldBaseTheme } from './FieldBase/OutlinedFieldBase.stylex';

import { styles as fieldStyles } from './Field/Field.styles';

import {
  styles as textFieldStyles,
  fieldStyles as textFieldFieldStyles,
} from './TextField/TextField.styles';
import { componentTheme as textFieldTheme } from './TextField/TextField.stylex';

import { componentTheme as radioTheme } from './Radio/Radio.stylex';
import {
  styles as radioStyles,
  stateLayerStyles as radioStateLayerStyles,
  focusRingStyles as radioFocusRingStyles,
} from './Radio/Radio.styles';
import { componentTheme as checkboxTheme } from './Checkbox/Checkbox.stylex';
import {
  styles as checkboxStyles,
  stateLayerStyles as checkboxStateLayerStyles,
  focusRingStyles as checkboxFocusRingStyles,
  circularProgressIndicatorStyles as checkboxCircularProgressIndicatorStyles,
} from './Checkbox/Checkbox.styles';

import { styles as itemStyles } from './Item/Item.styles';
import { componentTheme as itemTheme } from './Item/Item.stylex';

import { styles as listStyles } from './List/List.styles';
import { componentTheme as listItemTheme } from './ListItem/ListItem.stylex';
import {
  styles as listItemStyles,
  itemStyles as listItemItemStyles,
  stateLayerStyles as listItemStateLayerStyles,
  focusRingStyles as listItemFocusRingStyles,
} from './ListItem/ListItem.styles';

import { componentTheme as dividerTheme } from './Divider/Divider.stylex';
import { styles as dividerStyles } from './Divider/Divider.styles';

import { componentTheme as paperTheme } from './Paper/Paper.stylex';
import {
  styles as paperStyles,
  elevationStyles as paperElevationStyles,
} from './Paper/Paper.styles';
import { componentTheme as filledPaperTheme } from './Paper/FilledPaper.stylex';
import { componentTheme as outlinedPaperTheme } from './Paper/OutlinedPaper.stylex';

import { componentTheme as cardTheme } from './Card/Card.stylex';
import {
  styles as cardStyles,
  elevationStyles as cardElevationStyles,
  stateLayerStyles as cardStateLayerStyles,
  focusRingStyles as cardFocusRingStyles,
} from './Card/Card.styles';
import { componentTheme as elevatedCardTheme } from './Card/ElevatedCard.stylex';
import { componentTheme as filledCardTheme } from './Card/FilledCard.stylex';
import { componentTheme as outlinedCardTheme } from './Card/OutlinedCard.stylex';
import { styles as outlinedCardStyles } from './Card/OutlinedCard.styles';

import { componentTheme as cardHeaderTheme } from './CardHeader/CardHeader.stylex';

import { componentTheme as cardMediaTheme } from './CardMedia/CardMedia.stylex';
import { styles as cardMediaStyles } from './CardMedia/CardMedia.styles';

import { componentTheme as cardContentTheme } from './CardContent/CardContent.stylex';
import { styles as cardContentStyles } from './CardContent/CardContent.styles';

import { componentTheme as cardTitleTheme } from './CardTitle/CardTitle.stylex';
import { styles as cardTitleStyles } from './CardTitle/CardTitle.styles';

import { styles as cardActionsStyles } from './CardActions/CardActions.styles';

import { componentTheme as tabTheme } from './Tab/Tab.stylex';
import {
  styles as tabStyles,
  stateLayerStyles as tabStateLayerStyles,
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

import { componentTheme as avatarTheme } from './Avatar/Avatar.stylex';
import { styles as avatarStyles } from './Avatar/Avatar.styles';

import { componentTheme as scrimTheme } from './Scrim/Scrim.stylex';
import { styles as scrimStyles } from './Scrim/Scrim.styles';

import { componentTheme as dialogTheme } from './Dialog/Dialog.stylex';
import { styles as dialogStyles } from './Dialog/Dialog.styles';

import { componentTheme as menuListTheme } from './MenuList/MenuList.stylex';
import {
  styles as menuListStyles,
  elevationStyles as menuListElevationStyles,
  focusRingStyles as menuListFocusRingStyles,
} from './MenuList/MenuList.styles';

import { styles as DisclosureStyles } from './Disclosure/Disclosure.styles';

import { componentTheme as disclosureButtonTheme } from './DisclosureButton/DisclosureButton.stylex';
import {
  styles as disclosureButtonStyles,
  itemStyles as disclosureButtonItemStyles,
  circularProgressIndicatorStyles as disclosureButtonCircularProgressIndicatorStyles,
} from './DisclosureButton/DisclosureButton.styles';

import { componentTheme as disclosurePanelTheme } from './DisclosurePanel/DisclosurePanel.stylex';
import { styles as disclosurePanelStyles } from './DisclosurePanel/DisclosurePanel.styles';

import { styles as stepperStyles } from './Stepper/Stepper.styles';

import { componentTheme as stepTheme } from './Step/Step.stylex';
import {
  styles as stepStyles,
  focusRingStyles as stepFocusRingStypes,
} from './Step/Step.styles';

import { componentTheme as stepConnectorTheme } from './StepConnector/StepConnector.stylex';
import { styles as stepConnectorStyles } from './StepConnector/StepConnector.styles';

export const theme: ITheme = {
  name: 'Material Design 3',
  colorSchemes: {
    dark: darkColorRolesTheme,
  },
  colorRoles: {
    dark: darkColorRoles,
  },
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
    ButtonBase: {
      styles: buttonBaseStyles,
    },
    Button: {
      vars: buttonTheme,
      styles: buttonStyles,
      stateLayerStyles: buttonStateLayerStyles,
      focusRingStyles: buttonFocusRingStyles,
      elevationStyles: buttonElevationStyles,
      circularProgressIndicatorStyles: buttonCircularProgressIndicatorStyles,
    },
    ElevatedButton: { vars: elevatedButtonTheme },
    FilledButton: { vars: filledButtonTheme },
    FilledTonalButton: { vars: filledTonalButtonTheme },
    OutlinedButton: { vars: outlinedButtonTheme },
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
      stateLayerStyles: chipStateLayerStyles,
      focusRingStyles: chipFocusRingStyles,
      elevationStyles: chipElevationStyles,
      trailingActionFocusRingStyles: chipTrailingActionFocusRingStyles,
      trailingActionStateLayerStyles: chipTrailingActionStateLayerStyles,
      circularProgressIndicatorStyles: chipCircularProgressIndicatorStyles,
    },
    AssistChip: { vars: assistChipTheme },
    FilterChip: { vars: filterChipTheme },
    InputChip: { vars: inputChipTheme },
    SuggestionChip: { vars: suggestionChipTheme },
    Fab: {
      vars: fabTheme,
      styles: fabStyles,
    },
    SurfaceFab: { vars: surfaceFabTheme },
    PrimaryFab: { vars: primaryFabTheme },
    SecondaryFab: { vars: secondaryFabTheme },
    TertiaryFab: { vars: tertiaryFabTheme },
    BrandedFab: { vars: brandedFabTheme },
    IconButton: {
      vars: iconButtonTheme,
      styles: iconButtonStyles,
    },
    StandardIconButton: { vars: standardIconButtonTheme },
    FilledIconButton: { vars: filledIconButtonTheme },
    FilledTonalIconButton: { vars: filledTonalIconButtonTheme },
    OutlinedIconButton: { vars: outlinedIconButtonTheme },
    Switch: {
      vars: switchTheme,
      styles: switchStyles,
      stateLayerStyles: switchStateLayerStyles,
      focusRingStyles: switchFocusRingStyles,
      circularProgressIndicatorStyles: switchCircularProgressIndicatorStyles,
    },
    FieldBase: {
      vars: fieldBaseTheme,
      styles: fieldBaseStyles,
    },
    FilledFieldBase: {
      vars: filledFieldBaseTheme,
      styles: filledFieldBaseStyles,
    },
    OutlinedFieldBase: {
      vars: outlinedFieldBaseTheme,
      styles: outlinedFieldBaseStyles,
    },
    Field: {
      styles: fieldStyles,
    },
    TextField: {
      vars: textFieldTheme,
      styles: textFieldStyles,
      fieldStyles: textFieldFieldStyles,
    },
    FilledTextField: {},
    OutlinedTextField: {},
    Radio: {
      vars: radioTheme,
      styles: radioStyles,
      stateLayerStyles: radioStateLayerStyles,
      focusRingStyles: radioFocusRingStyles,
    },
    Checkbox: {
      vars: checkboxTheme,
      styles: checkboxStyles,
      stateLayerStyles: checkboxStateLayerStyles,
      focusRingStyles: checkboxFocusRingStyles,
      circularProgressIndicatorStyles: checkboxCircularProgressIndicatorStyles,
    },
    Item: {
      vars: itemTheme,
      styles: itemStyles,
    },
    ListItem: {
      vars: listItemTheme,
      styles: listItemStyles,
      itemStyles: listItemItemStyles,
      stateLayerStyles: listItemStateLayerStyles,
      focusRingStyles: listItemFocusRingStyles,
    },
    List: {
      styles: listStyles,
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
    OutlinedPaper: { vars: outlinedPaperTheme },
    Card: {
      vars: cardTheme,
      styles: cardStyles,
      elevationStyles: cardElevationStyles,
      stateLayerStyles: cardStateLayerStyles,
      focusRingStyles: cardFocusRingStyles,
    },
    CardHeader: {
      vars: cardHeaderTheme,
    },
    CardMedia: {
      vars: cardMediaTheme,
      styles: cardMediaStyles,
    },
    CardContent: {
      vars: cardContentTheme,
      styles: cardContentStyles,
    },
    CardTitle: {
      vars: cardTitleTheme,
      styles: cardTitleStyles,
    },
    CardActions: {
      styles: cardActionsStyles,
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
      stateLayerStyles: tabStateLayerStyles,
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
    Avatar: {
      vars: avatarTheme,
      styles: avatarStyles,
    },
    Scrim: {
      vars: scrimTheme,
      styles: scrimStyles,
    },
    Dialog: {
      vars: dialogTheme,
      styles: dialogStyles,
    },
    MenuList: {
      vars: menuListTheme,
      styles: menuListStyles,
      focusRingStyles: menuListFocusRingStyles,
      elevationStyles: menuListElevationStyles,
    },
    Disclosure: {
      styles: DisclosureStyles,
    },
    DisclosureButton: {
      vars: disclosureButtonTheme,
      styles: disclosureButtonStyles,
      itemStyles: disclosureButtonItemStyles,
      circularProgressIndicatorStyles:
        disclosureButtonCircularProgressIndicatorStyles,
    },
    DisclosurePanel: {
      vars: disclosurePanelTheme,
      styles: disclosurePanelStyles,
    },
    Stepper: {
      styles: stepperStyles,
    },
    Step: {
      vars: stepTheme,
      styles: stepStyles,
      focusRingStyles: stepFocusRingStypes,
    },
    StepConnector: {
      vars: stepConnectorTheme,
      styles: stepConnectorStyles,
    },
  },
};
