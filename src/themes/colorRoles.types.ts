/**
 * Use primary roles for the most prominent components across the UI, such as the FAB, high-emphasis buttons, and active states.
 * https://m3.material.io/styles/color/roles#41f55188-5c63-4107-ac41-822ebca8ae1b
 */
export type IColorRolesPrimary = {
  /**
   * High-emphasis fills, texts, and icons against surface
   */
  primary: string;

  /**
   * Text and icons against primary
   */
  onPrimary: string;

  /**
   * Standout fill color against surface, for key components like FAB
   */
  primaryContainer: string;

  /**
   * Text and icons against primary container
   */
  onPrimaryContainer: string;
};

/**
 * Use secondary roles for less prominent components in the UI such as filter chips.
 * https://m3.material.io/styles/color/roles#290bcc49-b728-414c-8cc5-04336c1c799c
 */
export type IColorRolesSecondary = {
  /**
   * Less prominent fills, text, and icons against surface
   */
  secondary: string;

  /**
   * Text and icons against secondary
   */
  onSecondary: string;

  /**
   * Less prominent fill color against surface, for recessive components like tonal buttons
   */
  secondaryContainer: string;

  /**
   * Text and icons against secondary container
   */
  onSecondaryContainer: string;
};

/**
 * Use tertiary roles for contrasting accents that balance primary and secondary colors or bring heightened attention to an element such as an input field.
 * https://m3.material.io/styles/color/roles#727a0bf8-c95f-4f83-bc43-290d20f24e8e
 */
export type IColorRolesTertiary = {
  /**
   * Complementary fills, text, and icons against surface
   */
  tertiary: string;

  /**
   * Text and icons against tertiary
   */
  onTertiary: string;

  /**
   * Complementary container color against surface, for components like input fields
   */
  tertiaryContainer: string;

  /**
   * Text and icons against tertiary container
   */
  onTertiaryContainer: string;
};

/**
 * Use error roles to communicate error states, such as an incorrect password entered into a text field.
 * https://m3.material.io/styles/color/roles#47a25970-8a80-43be-8307-c12e0f7a2b43
 */
export type IColorRolesError = {
  /**
   * Attention-grabbing color against surface for fills, icons, and text, indicating urgency
   */
  error: string;

  /**
   * Text and icons against error
   */
  onError: string;

  /**
   * Attention-grabbing fill color against surface
   */
  errorContainer: string;

  /**
   * Text and icons against error container
   */
  onErrorContainer: string;
};

/**
 * Inverse roles are applied selectively to components to achieve colors that are the reverse of those in the surrounding UI, creating a contrasting effect.
 * https://m3.material.io/styles/color/roles#7fc6b47e-db22-4e98-8359-7649a099e4a1
 */
export type IColorRolesSurfaceInverse = {
  /**
   * Background fills for elements which contrast against surface
   */
  inverseSurface: string;

  /**
   * Text and icons against inverse surface
   */
  inverseOnSurface: string;

  /**
   * Actionable elements, such as text buttons, against inverse surface
   */
  inversePrimary: string;
};

/**
 * Use surface roles for more neutral backgrounds, and container colors for components like cards, sheets, and dialogs.
 * https://m3.material.io/styles/color/roles#89f972b1-e372-494c-aabc-69aea34ed591
 */
export type IColorRolesSurface = IColorRolesSurfaceInverse & {
  /**
   * Default color for backgrounds
   */
  surface: string;

  /**
   * Text and icons against any surface color
   */
  onSurface: string;

  /**
   * Lower-emphasis color for text and icons against any surface color
   */
  onSurfaceVariant: string;

  /**
   * Lowest-emphasis container color
   */
  surfaceContainerLowest: string;

  /**
   * Low-emphasis container color
   */
  surfaceContainerLow: string;

  /**
   * Default container color
   */
  surfaceContainer: string;

  /**
   * High-emphasis container color
   */
  surfaceContainerHigh: string;

  /**
   * Highest-emphasis container color
   */
  surfaceContainerHighest: string;
};

/**
 * https://m3.material.io/styles/color/roles#e7d72e44-72e2-4ce9-a18d-df07b1433d18
 */
export type IColorRolesOutline = {
  /**
   * Important boundaries, such as a text field outline
   */
  outline: string;

  /**
   * Decorative elements, such as dividers
   */
  outlineVariant: string;
};

/**
 * Primary fixed, secondary fixed, and tertiary fixed are fill colors used against surface. These colors maintain the same tone in light and dark themes, as opposed to regular container colors, which change in tone between these themes. The fixed color role may be used instead of the equivalent container role in situations where such fixed behavior is desired.
 */
export type IColorRolesAddOnsFixed = {
  primaryFixed: string;
  secondaryFixed: string;
  tertiaryFixed: string;
};

/**
 * The primary fixed dim, secondary fixed dim, and tertiary fixed dim roles provide a stronger, more emphasized tone relative to the equivalent fixed color. They may be used where a deeper color but the same fixed behavior is desired.
 */
export type IColorRolesAddOnsDim = {
  primaryFixedDim: string;
  secondaryFixedDim: string;
  tertiaryFixedDim: string;

  /**
   * Placeholder text color
   */
  dim: string;
};

/**
 * On fixed colors are used for text and icons which sit on top of the corresponding Fixed color. For example, on primary fixed is used for text and icons against the primary fixed color. The same usage applies for the equivalent secondary and tertiary colors.
 */
export type IColorRolesAddOnsOnFixed = {
  onPrimaryFixed: string;
  onSecondaryFixed: string;
  onTertiaryFixed: string;
};

/**
 * On fixed variant colors are used for text and icons needing lower emphasis against the corresponding fixed color. For example, on primary fixed variant is used for low emphasis text and icons against the primary fixed color. The same usage applies for the equivalent secondary and tertiary colors.
 */
export type IColorRolesAddOnsOnFixedVariant = {
  onPrimaryFixedVariant: string;
  onSecondaryFixedVariant: string;
  onTertiaryFixedVariant: string;
};

/**
 * Most products won't need to use these add-on color roles. However, some products require the greater flexibility and control that add-on roles provide. If you aren't sure whether your product should use the add-on roles, it probably shouldn't and you can ignore them.
 * https://m3.material.io/styles/color/roles#a5f6ea3d-d457-4c5d-94f4-55f3cdf6470b
 */
export type IColorRolesAddOns = IColorRolesAddOnsFixed &
  IColorRolesAddOnsDim &
  IColorRolesAddOnsOnFixed &
  IColorRolesAddOnsOnFixedVariant & {
    /**
     * Dimmest surface color in light and dark themes
     */
    surfaceDim: string;

    /**
     * Brightest surface color in light and dark themes
     */
    surfaceBright: string;

    /**
     * Placeholder container color
     */
    surfacePlaceholder: string;
  };

/**
 * Color roles are like the "numbers" in a paint-by-number canvas. They're the connective tissue between elements of the UI and what color goes where.
 * https://m3.material.io/styles/color/roles#e9fc5b00-8355-4641-b35f-58b0bac639f3
 */
export type IColorRoles = IColorRolesPrimary &
  IColorRolesSecondary &
  IColorRolesTertiary &
  IColorRolesError &
  IColorRolesSurface &
  IColorRolesOutline &
  IColorRolesAddOns & {
    /**
     * Shadows can express the degree of elevation between surfaces in ways that other techniques cannot.
     * Both a shadow’s size and amount of softness or diffusion express the degree of distance between two surfaces. For example, a surface with a shadow that is small and sharp indicates a surface’s close proximity to the surface behind it. Larger, softer shadows express more distance.
     * https://m3.material.io/styles/elevation/applying-elevation#93fa8972-65fe-4073-9f03-7de12d47db8d
     */
    shadow: string;

    /**
     * A scrim can bring focus to specific elements by increasing the visual contrast of a large layered surface. Use the scrim beneath elements like modals and expanded navigation menus.
     * Scrims use the scrim color role at an opacity of 32%.
     * https://m3.material.io/styles/elevation/applying-elevation#92b9fb39-f0c4-4829-8e4d-97ac512976aa
     */
    scrim: string;

    surfaceSelection: string;
  };
