import type { ITheme } from '../theme.types';

import { darkColorRoles, darkColorRolesTheme } from './vars/darkColorRoles';

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
import { componentTheme as dangerIconButtonTheme } from './IconButton/DangerIconButton.stylex';
import { componentTheme as snackbarIconButtonTheme } from './IconButton/SnackbarIconButton.stylex';

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
  styles as textFieldBaseStyles,
  fieldStyles as textFieldBaseFieldStyles,
} from './TextFieldBase/TextFieldBase.styles';
import { componentTheme as textFieldTheme } from './TextFieldBase/TextFieldBase.stylex';

import { componentTheme as radioTheme } from './Radio/Radio.stylex';
import {
  styles as radioStyles,
  stateLayerStyles as radioStateLayerStyles,
  focusRingStyles as radioFocusRingStyles,
} from './Radio/Radio.styles';

import { styles as itemStyles } from './Item/Item.styles';
import { componentTheme as itemTheme } from './Item/Item.stylex';

import { styles as listStyles } from './List/List.styles';
import { componentTheme as listItemTheme } from './ListItem/ListItem.stylex';
import { componentTheme as standardListItemTheme } from './ListItem/StandardListItem.stylex';
import { componentTheme as dangerListItemTheme } from './ListItem/DangerListItem.stylex';
import {
  styles as listItemStyles,
  itemStyles as listItemItemStyles,
  stateLayerStyles as listItemStateLayerStyles,
  focusRingStyles as listItemFocusRingStyles,
} from './ListItem/ListItem.styles';

import { componentTheme as paperTheme } from './Paper/Paper.stylex';
import {
  styles as paperStyles,
  elevationStyles as paperElevationStyles,
} from './Paper/Paper.styles';
import { componentTheme as filledPaperTheme } from './Paper/FilledPaper.stylex';
import { componentTheme as outlinedPaperTheme } from './Paper/OutlinedPaper.stylex';

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

import { styles as anchoredStyles } from './Anchored/Anchored.styles';

import { componentTheme as scrimTheme } from './Scrim/Scrim.stylex';
import { styles as scrimStyles } from './Scrim/Scrim.styles';

import { componentTheme as menuListTheme } from './MenuList/MenuList.stylex';
import {
  styles as menuListStyles,
  elevationStyles as menuListElevationStyles,
  listStyles as menuListListStyles,
} from './MenuList/MenuList.styles';

import { styles as stepperStyles } from './Stepper/Stepper.styles';

import { componentTheme as stepTheme } from './Step/Step.stylex';
import {
  styles as stepStyles,
  focusRingStyles as stepFocusRingStypes,
  circularProgressIndicatorStyles as stepCircularProgressIndicatorStyles,
} from './Step/Step.styles';

import { componentTheme as stepConnectorTheme } from './StepConnector/StepConnector.stylex';
import { styles as stepConnectorStyles } from './StepConnector/StepConnector.styles';

import { componentTheme as elementWithLabelTheme } from './ElementWithLabel/ElementWithLabel.stylex';
import { styles as elementWithLabelStyles } from './ElementWithLabel/ElementWithLabel.styles';

import { componentTheme as skeletonTheme } from './Skeleton/Skeleton.stylex';
import { styles as skeletonStyles } from './Skeleton/Skeleton.styles';

import { componentTheme as snackbarTheme } from './Snackbar/Snackbar.stylex';
import { styles as snackbarStyles } from './Snackbar/Snackbar.styles';

import { componentTheme as snackbarContentTheme } from './SnackbarContent/SnackbarContent.stylex';
import {
  styles as snackbarContentStyles,
  elevationStyles as snackbarContentElevationStyles,
} from './SnackbarContent/SnackbarContent.styles';

import { componentTheme as plainTooltipContentTheme } from './PlainTooltipContent/PlainTooltipContent.stylex';
import { styles as plainTooltipContentStyles } from './PlainTooltipContent/PlainTooltipContent.styles';

import { componentTheme as richTooltipContentTheme } from './RichTooltipContent/RichTooltipContent.stylex';
import {
  styles as richTooltipContentStyles,
  elevationStyles as richTooltipElevationStyles,
} from './RichTooltipContent/RichTooltipContent.styles';

import { componentTheme as fluidButtonTheme } from './FluidButton/FluidButton.stylex';
import {
  styles as fluidButtonStyles,
  buttonBaseStyles as fluidButtonButtonBaseStyles,
  stateLayerStyles as fluidButtonStateLayerStyles,
  focusRingStyles as fluidButtonFocusRingStyles,
} from './FluidButton/FluidButton.styles';

import { componentTheme as optionCardTheme } from './OptionCard/OptionCard.stylex';
import {
  styles as optionCardStyles,
  cardStyles as optionCardCardStyles,
} from './OptionCard/OptionCard.styles';

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
    DangerIconButton: { vars: dangerIconButtonTheme },
    SnackbarIconButton: { vars: snackbarIconButtonTheme },
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
    TextFieldBase: {
      vars: textFieldTheme,
      styles: textFieldBaseStyles,
      fieldStyles: textFieldBaseFieldStyles,
    },
    FilledTextField: {},
    OutlinedTextField: {},
    Radio: {
      vars: radioTheme,
      styles: radioStyles,
      stateLayerStyles: radioStateLayerStyles,
      focusRingStyles: radioFocusRingStyles,
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
    StandardListItem: { vars: standardListItemTheme },
    DangerListItem: { vars: dangerListItemTheme },
    List: {
      styles: listStyles,
    },
    Paper: {
      vars: paperTheme,
      styles: paperStyles,
      elevationStyles: paperElevationStyles,
    },
    FilledPaper: { vars: filledPaperTheme },
    OutlinedPaper: { vars: outlinedPaperTheme },
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
    Anchored: {
      styles: anchoredStyles,
    },
    Scrim: {
      vars: scrimTheme,
      styles: scrimStyles,
    },
    MenuList: {
      vars: menuListTheme,
      styles: menuListStyles,
      elevationStyles: menuListElevationStyles,
      listStyles: menuListListStyles,
    },
    Stepper: {
      styles: stepperStyles,
    },
    Step: {
      vars: stepTheme,
      styles: stepStyles,
      focusRingStyles: stepFocusRingStypes,
      circularProgressIndicatorStyles: stepCircularProgressIndicatorStyles,
    },
    StepConnector: {
      vars: stepConnectorTheme,
      styles: stepConnectorStyles,
    },
    ElementWithLabel: {
      vars: elementWithLabelTheme,
      styles: elementWithLabelStyles,
    },
    Skeleton: {
      vars: skeletonTheme,
      styles: skeletonStyles,
    },
    Snackbar: {
      vars: snackbarTheme,
      styles: snackbarStyles,
    },
    SnackbarContent: {
      vars: snackbarContentTheme,
      styles: snackbarContentStyles,
      elevationStyles: snackbarContentElevationStyles,
    },
    PlainTooltipContent: {
      vars: plainTooltipContentTheme,
      styles: plainTooltipContentStyles,
    },
    RichTooltipContent: {
      vars: richTooltipContentTheme,
      styles: richTooltipContentStyles,
      elevationStyles: richTooltipElevationStyles,
    },
    FluidButton: {
      vars: fluidButtonTheme,
      styles: fluidButtonStyles,
      buttonBaseStyles: fluidButtonButtonBaseStyles,
      focusRingStyles: fluidButtonFocusRingStyles,
      stateLayerStyles: fluidButtonStateLayerStyles,
    },
    OptionCard: {
      vars: optionCardTheme,
      styles: optionCardStyles,
      cardStyles: optionCardCardStyles,
    },
  },
};
