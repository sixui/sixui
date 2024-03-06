export const paperVariants = ['filled', 'outlined'] as const;
export type IPaperVariant = (typeof paperVariants)[number];

export type IPaperStyleKey =
  | 'host'
  | 'host$elevation0'
  | 'host$elevation1'
  | 'host$elevation2'
  | 'host$elevation3'
  | 'host$elevation4'
  | 'host$elevation5'
  | 'host$square'
  | 'outline'
  | 'background'
  | 'content';

export type IPaperStyleVarKey =
  | 'containerShape'
  | 'containerColor'
  | 'containerElevation'
  | 'outlineStyle'
  | 'outlineColor'
  | 'outlineWidth';

export type IPaperStyleStateVarKey = 'elevation';
