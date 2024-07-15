import type { ITheme } from '../theme.types';

import { darkColorRoles, darkColorRolesTheme } from './vars/darkColorRoles';

import { componentTheme as templateTheme } from './Template/Template.stylex';
import { styles as templateStyles } from './Template/Template.styles';
import { componentTheme as variantTemplateTheme } from './Template/VariantTemplate.stylex';
import { styles as variantTemplateStyles } from './Template/VariantTemplate.styles';

import { componentTheme as componentShowcaseTheme } from './ComponentShowcase/ComponentShowcase.stylex';
import { styles as componentShowcaseStyles } from './ComponentShowcase/ComponentShowcase.styles';

import { styles as stateLayerStyles } from './StateLayer/StateLayer.styles';
import { componentTheme as statelayerTheme } from './StateLayer/StateLayer.stylex';

import { styles as elevationStyles } from './Elevation/Elevation.styles';
import { componentTheme as elevationTheme } from './Elevation/Elevation.stylex';

import { styles as focusRingStyles } from './FocusRing/FocusRing.styles';
import { componentTheme as focusRingTheme } from './FocusRing/FocusRing.stylex';

import {
  styles as switchStyles,
  stateLayerStyles as switchStateLayerStyles,
  focusRingStyles as switchFocusRingStyles,
  circularProgressIndicatorStyles as switchCircularProgressIndicatorStyles,
} from './Switch/Switch.styles';
import { componentTheme as switchTheme } from './Switch/Switch.stylex';

import {
  styles as textFieldBaseStyles,
  fieldStyles as textFieldBaseFieldStyles,
} from './TextFieldBase/TextFieldBase.styles';
import { componentTheme as textFieldTheme } from './TextFieldBase/TextFieldBase.stylex';

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
    Switch: {
      vars: switchTheme,
      styles: switchStyles,
      stateLayerStyles: switchStateLayerStyles,
      focusRingStyles: switchFocusRingStyles,
      circularProgressIndicatorStyles: switchCircularProgressIndicatorStyles,
    },
    TextFieldBase: {
      vars: textFieldTheme,
      styles: textFieldBaseStyles,
      fieldStyles: textFieldBaseFieldStyles,
    },
    FilledTextField: {},
    OutlinedTextField: {},
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
  },
};
