import type {
  ICompiledStyles,
  IStyleVarGroup,
  IStyleVarsTheme,
} from '@/helpers/types';
import type {
  ITemplateStyleKey,
  ITemplateStyleVarKey,
} from '@/components/atoms/Template';
import type {
  IComponentShowcaseStyleKey,
  IComponentShowcaseStyleVarKey,
} from '@/components/molecules/ComponentShowcase';
import type {
  IPlaceholderStyleKey,
  IPlaceholderStyleVarKey,
} from '@/components/atoms/Placeholder';
import type {
  IRippleStyleKey,
  IRippleStyleVarKey,
} from '@/components/utils/Ripple';
import type {
  IElevationStyleKey,
  IElevationStyleVarKey,
} from '@/components/utils/Elevation';
import type {
  IFocusRingStyleKey,
  IFocusRingStyleVarKey,
} from '@/components/utils/FocusRing';
import type {
  IButtonStyleKey,
  IButtonStyleVarKey,
} from '@/components/atoms/Button';
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
import type { IFieldStyleKey } from '@/components/atoms/Field';
import type {
  ITextFieldStyleKey,
  ITextFieldStyleVarKey,
} from '@/components/atoms/TextField';
import type {
  IRadioStyleKey,
  IRadioStyleVarKey,
} from '@/components/atoms/Radio';
import type {
  ICheckboxStyleKey,
  ICheckboxStyleVarKey,
} from '@/components/atoms/Checkbox';
import type { IItemStyleKey, IItemStyleVarKey } from '@/components/atoms/Item';
import type { IListStyleKey, IListStyleVarKey } from '@/components/atoms/List';
import type { IListItemStyleKey } from '@/components/atoms/ListItem';
import type { IIconStyleKey, IIconStyleVarKey } from '@/components/atoms/Icon';
import type {
  IDividerStyleKey,
  IDividerStyleVarKey,
} from '@/components/atoms/Divider';
import type { ICardStyleKey, ICardStyleVarKey } from '@/components/atoms/Card';

export interface ITemplateTheme {
  theme?: IStyleVarsTheme<ITemplateStyleVarKey>;
  styles?: ICompiledStyles<ITemplateStyleKey>;
}

export interface IButtonTheme {
  theme?: IStyleVarsTheme<IButtonStyleVarKey>;
  styles?: ICompiledStyles<IButtonStyleKey>;
}

export interface IChipTheme {
  theme?: IStyleVarsTheme<IChipStyleVarKey>;
  styles?: ICompiledStyles<IChipStyleKey>;
}

export interface IChipVariantTheme extends IChipTheme {
  rippleTheme?: IStyleVarsTheme<IRippleStyleVarKey>;
}

export interface IFabTheme {
  theme?: IStyleVarsTheme<IFabStyleVarKey>;
  styles?: ICompiledStyles<IFabStyleKey>;
}

export interface IFabVariantTheme extends IFabTheme {}

export interface IIconButtonTheme {
  theme?: IStyleVarsTheme<IIconButtonStyleVarKey>;
  styles?: ICompiledStyles<IIconButtonStyleKey>;
}

export interface IIconButtonVariantTheme extends IIconButtonTheme {}

export interface IFieldTheme {
  theme?: IStyleVarsTheme<ITextFieldStyleVarKey>;
  styles?: ICompiledStyles<IFieldStyleKey>;
}

export interface ITextFieldTheme {
  theme?: IStyleVarsTheme<ITextFieldStyleVarKey>;
  styles?: ICompiledStyles<ITextFieldStyleKey>;
}

export interface ICardTheme {
  theme?: IStyleVarsTheme<ICardStyleVarKey>;
  styles?: ICompiledStyles<ICardStyleKey>;
}

export interface ITheme {
  name: string;
  components: {
    Template: ITemplateTheme & {
      vars: IStyleVarGroup<ITemplateStyleVarKey>;
    };
    ComponentShowcase: {
      theme: IStyleVarsTheme<IComponentShowcaseStyleVarKey>;
      vars: IStyleVarGroup<IComponentShowcaseStyleVarKey>;
      styles: ICompiledStyles<IComponentShowcaseStyleKey>;
    };
    VariantTemplate: ITemplateTheme;
    Placeholder: {
      theme: IStyleVarsTheme<IPlaceholderStyleVarKey>;
      vars: IStyleVarGroup<IPlaceholderStyleVarKey>;
      styles: ICompiledStyles<IPlaceholderStyleKey>;
    };
    Ripple: {
      theme?: IStyleVarsTheme<IRippleStyleVarKey>;
      vars: IStyleVarGroup<IRippleStyleVarKey>;
      styles: ICompiledStyles<IRippleStyleKey>;
    };
    Elevation: {
      theme: IStyleVarsTheme<IElevationStyleVarKey>;
      vars: IStyleVarGroup<IElevationStyleVarKey>;
      styles: ICompiledStyles<IElevationStyleKey>;
    };
    FocusRing: {
      theme: IStyleVarsTheme<IFocusRingStyleVarKey>;
      vars: IStyleVarGroup<IFocusRingStyleVarKey>;
      styles: ICompiledStyles<IFocusRingStyleKey>;
    };
    Button: IButtonTheme & {
      vars: IStyleVarGroup<IButtonStyleVarKey>;
      rippleStyles: ICompiledStyles<IRippleStyleKey>;
      focusRingStyles: ICompiledStyles<IFocusRingStyleKey>;
      elevationStyles: ICompiledStyles<IElevationStyleKey>;
      circularProgressIndicatorStyles: ICompiledStyles<ICircularProgressIndicatorStyleKey>;
    };
    ElevatedButton: IButtonTheme;
    FilledButton: IButtonTheme;
    FilledTonalButton: IButtonTheme;
    OutlinedButton: IButtonTheme;
    TextButton: IButtonTheme;
    CircularProgressIndicator: {
      theme: IStyleVarsTheme<ICircularProgressIndicatorStyleVarKey>;
      vars: IStyleVarGroup<ICircularProgressIndicatorStyleVarKey>;
      styles: ICompiledStyles<ICircularProgressIndicatorStyleKey>;
    };
    IndeterminateCircularProgressIndicator: {
      styles: ICompiledStyles<IIndeterminateCircularProgressIndicatorStyleKey>;
    };
    DeterminateCircularProgressIndicator: {
      styles: ICompiledStyles<IDeterminateCircularProgressIndicatorStyleKey>;
    };
    Chip: IChipTheme & {
      vars: IStyleVarGroup<IChipStyleVarKey>;
      rippleStyles?: ICompiledStyles<IRippleStyleKey>;
      focusRingStyles?: ICompiledStyles<IFocusRingStyleKey>;
      elevationStyles?: ICompiledStyles<IElevationStyleKey>;
      trailingActionFocusRingStyles?: ICompiledStyles<IFocusRingStyleKey>;
      trailingActionRippleStyles?: ICompiledStyles<IRippleStyleKey>;
      circularProgressIndicatorStyles?: ICompiledStyles<ICircularProgressIndicatorStyleKey>;
    };
    AssistChip: IChipVariantTheme;
    FilterChip: IChipVariantTheme;
    InputChip: IChipVariantTheme;
    SuggestionChip: IChipVariantTheme;
    Fab: IFabTheme & {
      vars: IStyleVarGroup<IFabStyleVarKey>;
      rippleStyles?: ICompiledStyles<IRippleStyleKey>;
      focusRingStyles?: ICompiledStyles<IFocusRingStyleKey>;
      elevationStyles?: ICompiledStyles<IElevationStyleKey>;
      circularProgressIndicatorStyles?: ICompiledStyles<ICircularProgressIndicatorStyleKey>;
    };
    SurfaceFab: IFabVariantTheme;
    PrimaryFab: IFabVariantTheme;
    SecondaryFab: IFabVariantTheme;
    TertiaryFab: IFabVariantTheme;
    BrandedFab: IFabVariantTheme;
    IconButton: IIconButtonTheme & {
      vars: IStyleVarGroup<IIconButtonStyleVarKey>;
      rippleStyles?: ICompiledStyles<IRippleStyleKey>;
      focusRingStyles?: ICompiledStyles<IFocusRingStyleKey>;
      circularProgressIndicatorStyles?: ICompiledStyles<ICircularProgressIndicatorStyleKey>;
    };
    StandardIconButton: IIconButtonVariantTheme;
    FilledIconButton: IIconButtonVariantTheme;
    FilledTonalIconButton: IIconButtonVariantTheme;
    OutlinedIconButton: IIconButtonVariantTheme;
    Switch: {
      theme: IStyleVarsTheme<ISwitchStyleVarKey>;
      vars: IStyleVarGroup<ISwitchStyleVarKey>;
      styles: ICompiledStyles<ISwitchStyleKey>;
      rippleStyles?: ICompiledStyles<IRippleStyleKey>;
      focusRingStyles?: ICompiledStyles<IFocusRingStyleKey>;
      circularProgressIndicatorStyles?: ICompiledStyles<ICircularProgressIndicatorStyleKey>;
    };
    Field: IFieldTheme;
    FilledField: IFieldTheme;
    OutlinedField: IFieldTheme;
    TextField: ITextFieldTheme & {
      vars: IStyleVarGroup<ITextFieldStyleVarKey>;
      fieldStyles?: ICompiledStyles<IFieldStyleKey>;
    };
    FilledTextField: ITextFieldTheme;
    OutlinedTextField: ITextFieldTheme;
    Radio: {
      theme?: IStyleVarsTheme<IRadioStyleVarKey>;
      styles?: ICompiledStyles<IRadioStyleKey>;
      vars: IStyleVarGroup<IRadioStyleVarKey>;
      rippleStyles: ICompiledStyles<IRippleStyleKey>;
      focusRingStyles: ICompiledStyles<IFocusRingStyleKey>;
    };
    Checkbox: {
      theme?: IStyleVarsTheme<ICheckboxStyleVarKey>;
      styles?: ICompiledStyles<ICheckboxStyleKey>;
      vars: IStyleVarGroup<ICheckboxStyleVarKey>;
      rippleStyles: ICompiledStyles<IRippleStyleKey>;
      focusRingStyles: ICompiledStyles<IFocusRingStyleKey>;
    };
    Item: {
      theme?: IStyleVarsTheme<IItemStyleVarKey>;
      styles?: ICompiledStyles<IItemStyleKey>;
      vars: IStyleVarGroup<IItemStyleVarKey>;
    };
    ListItem: {
      theme?: IStyleVarsTheme<IItemStyleVarKey>;
      styles?: ICompiledStyles<IListItemStyleKey>;
      vars: IStyleVarGroup<IItemStyleVarKey>;
      itemStyles?: ICompiledStyles<IItemStyleKey>;
      rippleStyles: ICompiledStyles<IRippleStyleKey>;
      focusRingStyles: ICompiledStyles<IFocusRingStyleKey>;
    };
    List: {
      theme?: IStyleVarsTheme<IListStyleVarKey>;
      styles?: ICompiledStyles<IListStyleKey>;
      vars: IStyleVarGroup<IListStyleVarKey>;
    };
    Icon: {
      theme?: IStyleVarsTheme<IIconStyleVarKey>;
      styles?: ICompiledStyles<IIconStyleKey>;
      vars: IStyleVarGroup<IIconStyleVarKey>;
    };
    Divider: {
      theme?: IStyleVarsTheme<IDividerStyleVarKey>;
      styles?: ICompiledStyles<IDividerStyleKey>;
      vars: IStyleVarGroup<IDividerStyleVarKey>;
    };
    Card: ICardTheme & {
      theme?: IStyleVarsTheme<ICardStyleVarKey>;
      styles?: ICompiledStyles<ICardStyleKey>;
      vars: IStyleVarGroup<ICardStyleVarKey>;
      rippleStyles: ICompiledStyles<IRippleStyleKey>;
      focusRingStyles: ICompiledStyles<IFocusRingStyleKey>;
      elevationStyles: ICompiledStyles<IElevationStyleKey>;
    };
    ElevatedCard: ICardTheme;
    FilledCard: ICardTheme;
    OutlinedCard: ICardTheme & {
      styles?: ICompiledStyles<ICardStyleKey>;
    };
  };
}
