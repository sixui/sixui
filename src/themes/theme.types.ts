import type { ICompiledStyles, IStyleVarsTheme } from '@/helpers/types';
import type { IColorRolesThemeVars } from './colorRoles.types';
import type {
  IBasicTemplateStyleKey,
  IBasicTemplateStyleVarKey,
} from '@/components/atoms/Template/BasicTemplate';
import type {
  IVariableTemplateStyleKey,
  IVariableTemplateStyleVarKey,
} from '@/components/atoms/Template/VariableTemplate';
import type {
  IComponentShowcaseStyleKey,
  IComponentShowcaseStyleVarKey,
} from '@/components/utils/ComponentShowcase';
import type {
  IPlaceholderStyleKey,
  IPlaceholderStyleVarKey,
} from '@/components/atoms/Placeholder';
import type {
  IStateLayerStyleKey,
  IStateLayerStyleVarKey,
} from '@/components/utils/StateLayer';
import type {
  IElevationStyleKey,
  IElevationStyleVarKey,
} from '@/components/utils/Elevation';
import type {
  IFocusRingStyleKey,
  IFocusRingStyleVarKey,
} from '@/components/utils/FocusRing';
import type {
  ICircularProgressIndicatorStyleKey,
  ICircularProgressIndicatorStyleVarKey,
  IIndeterminateCircularProgressIndicatorStyleKey,
  IDeterminateCircularProgressIndicatorStyleKey,
} from '@/components/atoms/CircularProgressIndicator';
import type { IChipStyleKey, IChipStyleVarKey } from '@/components/atoms/Chip';
import type { IFabStyleKey, IFabStyleVarKey } from '@/components/atoms/Fab';
import type {
  IIconButtonStyleKey,
  IIconButtonStyleVarKey,
} from '@/components/atoms/IconButton';
import type {
  ISwitchStyleKey,
  ISwitchStyleVarKey,
} from '@/components/atoms/Switch';
import type {
  IFieldBaseStyleKey,
  IFieldBaseStyleVarKey,
} from '@/components/atoms/FieldBase';
import type { IFieldStyleKey } from '@/components/atoms/Field';
import type {
  ITextFieldBaseStyleKey,
  ITextFieldBaseStyleVarKey,
} from '@/components/atoms/TextFieldBase';
import type {
  IRadioStyleKey,
  IRadioStyleVarKey,
} from '@/components/atoms/Radio';
import type { IItemStyleKey, IItemStyleVarKey } from '@/components/atoms/Item';
import type { IListStyleKey } from '@/components/atoms/List';
import type {
  IListItemStyleKey,
  IListItemStyleVarKey,
} from '@/components/atoms/ListItem';
import type {
  IDividerStyleKey,
  IDividerStyleVarKey,
} from '@/components/atoms/Divider';
import type {
  IPaperStyleKey,
  IPaperStyleVarKey,
} from '@/components/atoms/Paper';
import type { ITabStyleKey, ITabStyleVarKey } from '@/components/atoms/Tab';
import type { ITabListStyleKey } from '@/components/atoms/TabList';
import type { ITypographyStyleKey } from '@/components/atoms/Typography';
import type { IAnchoredStyleKey } from '@/components/utils/Anchored';
import type {
  IScrimStyleKey,
  IScrimStyleVarKey,
} from '@/components/atoms/Scrim';
import type { IDialogStyleKey } from '@/components/atoms/Dialog';
import type {
  IDialogContentStyleKey,
  IDialogContentStyleVarKey,
} from '@/components/atoms/DialogContent';
import type {
  IMenuListStyleKey,
  IMenuListStyleVarKey,
} from '@/components/atoms/MenuList';
import type {
  IDisclosureStyleKey,
  IDisclosureStyleVarKey,
} from '@/components/atoms/Disclosure';
import type {
  IDisclosureButtonStyleKey,
  IDisclosureButtonStyleVarKey,
} from '@/components/atoms/DisclosureButton';
import type { IStepperStyleKey } from '@/components/atoms/Stepper';
import type { IStepStyleKey, IStepStyleVarKey } from '@/components/atoms/Step';
import type {
  IStepConnectorStyleKey,
  IStepConnectorStyleVarKey,
} from '@/components/atoms/StepConnector';
import type {
  IElementWithLabelStyleKey,
  IElementWithLabelStyleVarKey,
} from '@/components/molecules/ElementWithLabel';
import type {
  ISkeletonStyleKey,
  ISkeletonStyleVarKey,
} from '@/components/atoms/Skeleton';
import type {
  ISnackbarStyleKey,
  ISnackbarStyleVarKey,
} from '@/components/atoms/Snackbar';
import type {
  ISnackbarContentStyleKey,
  ISnackbarContentStyleVarKey,
} from '@/components/atoms/SnackbarContent';
import type {
  IPlainTooltipContentStyleKey,
  IPlainTooltipContentStyleVarKey,
} from '@/components/atoms/PlainTooltipContent';
import type {
  IRichTooltipContentStyleKey,
  IRichTooltipContentStyleVarKey,
} from '@/components/atoms/RichTooltipContent';
import type {
  IFluidButtonStyleKey,
  IFluidButtonStyleVarKey,
} from '@/components/atoms/FluidButton';
import type { IButtonBaseStyleKey } from '@/components/atoms/ButtonBase';
import type {
  IOptionCardStyleKey,
  IOptionCardStyleVarKey,
} from '@/components/atoms/OptionCard';
import type { IButtonStyleKey } from '@/components/atoms/Button';
import type { ICardStyleKey } from '@/components/atoms/Card/Card.styles';

export type IBasicTemplateTheme = {
  vars?: IStyleVarsTheme<IBasicTemplateStyleVarKey>;
  styles?: ICompiledStyles<IBasicTemplateStyleKey>;
};

export type IVariableTemplateTheme = {
  vars?: IStyleVarsTheme<IVariableTemplateStyleVarKey>;
  styles?: ICompiledStyles<IVariableTemplateStyleKey>;
};

export type IListItemTheme = {
  vars?: IStyleVarsTheme<IListItemStyleVarKey>;
  styles?: ICompiledStyles<IListItemStyleKey>;
  itemStyles?: ICompiledStyles<IItemStyleKey>;
  stateLayerStyles?: ICompiledStyles<IStateLayerStyleKey>;
  focusRingStyles?: ICompiledStyles<IFocusRingStyleKey>;
};

export type IChipTheme = {
  vars?: IStyleVarsTheme<IChipStyleVarKey>;
  styles?: ICompiledStyles<IChipStyleKey>;
  stateLayerStyles?: ICompiledStyles<IStateLayerStyleKey>;
  focusRingStyles?: ICompiledStyles<IFocusRingStyleKey>;
  elevationStyles?: ICompiledStyles<IElevationStyleKey>;
  trailingActionFocusRingStyles?: ICompiledStyles<IFocusRingStyleKey>;
  trailingActionStateLayerStyles?: ICompiledStyles<IStateLayerStyleKey>;
  circularProgressIndicatorStyles?: ICompiledStyles<ICircularProgressIndicatorStyleKey>;
};

export type IChipVariantTheme = IChipTheme & {
  statelayerTheme?: IStyleVarsTheme<IStateLayerStyleVarKey>;
};

export type IFabTheme = {
  vars?: IStyleVarsTheme<IFabStyleVarKey>;
  styles?: ICompiledStyles<IFabStyleKey>;
};

export type IFabVariantTheme = IFabTheme;

export type IIconButtonTheme = {
  vars?: IStyleVarsTheme<IIconButtonStyleVarKey>;
  styles?: ICompiledStyles<IIconButtonStyleKey>;
};

export type IFieldBaseTheme = {
  vars?: IStyleVarsTheme<IFieldBaseStyleVarKey>;
  styles?: ICompiledStyles<IFieldBaseStyleKey>;
};

export type ITextFieldBaseTheme = {
  vars?: IStyleVarsTheme<ITextFieldBaseStyleVarKey>;
  styles?: ICompiledStyles<ITextFieldBaseStyleKey>;
  fieldStyles?: ICompiledStyles<IFieldBaseStyleKey>;
};

export type IPaperTheme = {
  vars?: IStyleVarsTheme<IPaperStyleVarKey>;
  styles?: ICompiledStyles<IPaperStyleKey>;
  elevationStyles?: ICompiledStyles<IElevationStyleKey>;
};

export type ITabTheme = {
  vars?: IStyleVarsTheme<ITabStyleVarKey>;
  styles?: ICompiledStyles<ITabStyleKey>;
  stateLayerStyles?: ICompiledStyles<IStateLayerStyleKey>;
  focusRingStyles?: ICompiledStyles<IFocusRingStyleKey>;
  elevationStyles?: ICompiledStyles<IElevationStyleKey>;
};

export type ITheme = {
  name: string;
  colorSchemes: {
    dark: IStyleVarsTheme<keyof IColorRolesThemeVars>;
  };
  colorRoles: {
    dark: IColorRolesThemeVars;
  };
  components: {
    Template: IBasicTemplateTheme;
    VariantTemplate: IVariableTemplateTheme;
    ComponentShowcase: {
      vars: IStyleVarsTheme<IComponentShowcaseStyleVarKey>;
      styles: ICompiledStyles<IComponentShowcaseStyleKey>;
    };
    Placeholder: {
      vars: IStyleVarsTheme<IPlaceholderStyleVarKey>;
      styles: ICompiledStyles<IPlaceholderStyleKey>;
    };
    StateLayer: {
      vars: IStyleVarsTheme<IStateLayerStyleVarKey>;
      styles: ICompiledStyles<IStateLayerStyleKey>;
    };
    Elevation: {
      vars: IStyleVarsTheme<IElevationStyleVarKey>;
      styles: ICompiledStyles<IElevationStyleKey>;
    };
    FocusRing: {
      vars: IStyleVarsTheme<IFocusRingStyleVarKey>;
      styles: ICompiledStyles<IFocusRingStyleKey>;
    };
    CircularProgressIndicator: {
      vars: IStyleVarsTheme<ICircularProgressIndicatorStyleVarKey>;
      styles: ICompiledStyles<ICircularProgressIndicatorStyleKey>;
    };
    IndeterminateCircularProgressIndicator: {
      styles: ICompiledStyles<IIndeterminateCircularProgressIndicatorStyleKey>;
    };
    DeterminateCircularProgressIndicator: {
      styles: ICompiledStyles<IDeterminateCircularProgressIndicatorStyleKey>;
    };
    Chip: IChipTheme;
    AssistChip: IChipTheme;
    FilterChip: IChipTheme;
    InputChip: IChipTheme;
    SuggestionChip: IChipTheme;
    Fab: IFabTheme;
    SurfaceFab: IFabTheme;
    PrimaryFab: IFabTheme;
    SecondaryFab: IFabTheme;
    TertiaryFab: IFabTheme;
    BrandedFab: IFabTheme;
    IconButton: IIconButtonTheme;
    StandardIconButton: IIconButtonTheme;
    FilledIconButton: IIconButtonTheme;
    FilledTonalIconButton: IIconButtonTheme;
    OutlinedIconButton: IIconButtonTheme;
    DangerIconButton: IIconButtonTheme;
    SnackbarIconButton: IIconButtonTheme;
    Switch: {
      vars: IStyleVarsTheme<ISwitchStyleVarKey>;
      styles: ICompiledStyles<ISwitchStyleKey>;
      stateLayerStyles?: ICompiledStyles<IStateLayerStyleKey>;
      focusRingStyles?: ICompiledStyles<IFocusRingStyleKey>;
      circularProgressIndicatorStyles?: ICompiledStyles<ICircularProgressIndicatorStyleKey>;
    };
    FieldBase: IFieldBaseTheme;
    FilledFieldBase: IFieldBaseTheme;
    OutlinedFieldBase: IFieldBaseTheme;
    Field: {
      styles?: ICompiledStyles<IFieldStyleKey>;
    };
    TextFieldBase: ITextFieldBaseTheme;
    FilledTextField: ITextFieldBaseTheme;
    OutlinedTextField: ITextFieldBaseTheme;
    Radio: {
      vars?: IStyleVarsTheme<IRadioStyleVarKey>;
      styles?: ICompiledStyles<IRadioStyleKey>;
      stateLayerStyles: ICompiledStyles<IStateLayerStyleKey>;
      focusRingStyles: ICompiledStyles<IFocusRingStyleKey>;
      circularProgressIndicatorStyles?: ICompiledStyles<ICircularProgressIndicatorStyleKey>;
    };
    Item: {
      vars?: IStyleVarsTheme<IItemStyleVarKey>;
      styles?: ICompiledStyles<IItemStyleKey>;
    };
    ListItem: IListItemTheme;
    StandardListItem: IListItemTheme;
    DangerListItem: IListItemTheme;
    List: {
      styles?: ICompiledStyles<IListStyleKey>;
    };
    Divider: {
      vars?: IStyleVarsTheme<IDividerStyleVarKey>;
      styles?: ICompiledStyles<IDividerStyleKey>;
    };
    Paper: IPaperTheme;
    FilledPaper: IPaperTheme;
    OutlinedPaper: IPaperTheme & {
      styles?: ICompiledStyles<IPaperStyleKey>;
    };
    Tab: ITabTheme;
    PrimaryTab: ITabTheme;
    SecondaryTab: ITabTheme;
    TabList: {
      styles?: ICompiledStyles<ITabListStyleKey>;
    };
    Typography: {
      styles?: ICompiledStyles<ITypographyStyleKey>;
    };
    Anchored: {
      styles?: ICompiledStyles<IAnchoredStyleKey>;
    };
    Scrim: {
      vars?: IStyleVarsTheme<IScrimStyleVarKey>;
      styles?: ICompiledStyles<IScrimStyleKey>;
    };
    Dialog: {
      styles?: ICompiledStyles<IDialogStyleKey>;
    };
    DialogContent: {
      vars?: IStyleVarsTheme<IDialogContentStyleVarKey>;
      styles?: ICompiledStyles<IDialogContentStyleKey>;
    };
    MenuList: {
      vars?: IStyleVarsTheme<IMenuListStyleVarKey>;
      styles?: ICompiledStyles<IMenuListStyleKey>;
      elevationStyles?: ICompiledStyles<IElevationStyleKey>;
      listStyles?: ICompiledStyles<IListStyleKey>;
    };
    Disclosure: {
      vars?: IStyleVarsTheme<IDisclosureStyleVarKey>;
      styles?: ICompiledStyles<IDisclosureStyleKey>;
    };
    DisclosureButton: {
      vars?: IStyleVarsTheme<IDisclosureButtonStyleVarKey>;
      styles?: ICompiledStyles<IDisclosureButtonStyleKey>;
      itemStyles?: ICompiledStyles<IItemStyleKey>;
      circularProgressIndicatorStyles?: ICompiledStyles<ICircularProgressIndicatorStyleKey>;
    };
    Stepper: {
      styles?: ICompiledStyles<IStepperStyleKey>;
    };
    Step: {
      vars?: IStyleVarsTheme<IStepStyleVarKey>;
      styles?: ICompiledStyles<IStepStyleKey>;
      focusRingStyles?: ICompiledStyles<IFocusRingStyleKey>;
      circularProgressIndicatorStyles?: ICompiledStyles<ICircularProgressIndicatorStyleKey>;
    };
    StepConnector: {
      vars?: IStyleVarsTheme<IStepConnectorStyleVarKey>;
      styles?: ICompiledStyles<IStepConnectorStyleKey>;
    };
    ElementWithLabel: {
      vars?: IStyleVarsTheme<IElementWithLabelStyleVarKey>;
      styles?: ICompiledStyles<IElementWithLabelStyleKey>;
    };
    Skeleton: {
      vars?: IStyleVarsTheme<ISkeletonStyleVarKey>;
      styles?: ICompiledStyles<ISkeletonStyleKey>;
    };
    Snackbar: {
      vars?: IStyleVarsTheme<ISnackbarStyleVarKey>;
      styles?: ICompiledStyles<ISnackbarStyleKey>;
    };
    SnackbarContent: {
      vars?: IStyleVarsTheme<ISnackbarContentStyleVarKey>;
      styles?: ICompiledStyles<ISnackbarContentStyleKey>;
      elevationStyles?: ICompiledStyles<IElevationStyleKey>;
      actionButtonStyles?: ICompiledStyles<IButtonStyleKey>;
    };
    PlainTooltipContent: {
      vars?: IStyleVarsTheme<IPlainTooltipContentStyleVarKey>;
      styles?: ICompiledStyles<IPlainTooltipContentStyleKey>;
    };
    RichTooltipContent: {
      vars?: IStyleVarsTheme<IRichTooltipContentStyleVarKey>;
      styles?: ICompiledStyles<IRichTooltipContentStyleKey>;
      elevationStyles?: ICompiledStyles<IElevationStyleKey>;
    };
    FluidButton: {
      vars?: IStyleVarsTheme<IFluidButtonStyleVarKey>;
      styles?: ICompiledStyles<IFluidButtonStyleKey>;
      buttonBaseStyles?: ICompiledStyles<IButtonBaseStyleKey>;
      focusRingStyles?: ICompiledStyles<IFocusRingStyleKey>;
      stateLayerStyles?: ICompiledStyles<IStateLayerStyleKey>;
    };
    OptionCard: {
      vars?: IStyleVarsTheme<IOptionCardStyleVarKey>;
      styles?: ICompiledStyles<IOptionCardStyleKey>;
      cardStyles?: ICompiledStyles<ICardStyleKey>;
    };
  };
};

export type IThemeSettings = {
  linkAs: React.ElementType;
};
