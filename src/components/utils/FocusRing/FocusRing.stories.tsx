import { useRef } from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { IFocusRingStyleKey } from './FocusRing.styledefs';
import { type IFocusRingProps, FocusRing } from './FocusRing';
import { ComponentShowcase } from '@/components/utils/ComponentShowcase';
import { Placeholder } from '@/components/atoms/Placeholder';
import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';
import { shapeVars } from '@/themes/base/vars/shape.stylex';
import { componentVars } from '@/themes/base/FocusRing/FocusRing.stylex';

// https://github.com/material-components/material-web/blob/main/focus/demo/stories.ts

const meta = {
  component: FocusRing,
} satisfies Meta<typeof FocusRing>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  styles: stylex.create<IStyles<IFocusRingStyleKey>>({
    host: {
      // eslint-disable-next-line @stylexjs/valid-styles
      [componentVars.shape]: shapeVars.corner$md,
    },
  }),
} satisfies Partial<IFocusRingProps>;

const placeholderStyles = stylex.create({
  host: {
    width: '6rem',
    height: '6rem',
    outlineWidth: '1px',
    outlineStyle: 'solid',
    outlineColor: colorRolesVars.outline,
    padding: '1rem',
  },
});

const dashedPlaceholderStyles = stylex.create({
  host: {
    width: '6rem',
    height: '6rem',
    outlineWidth: '1px',
    outlineStyle: 'dashed',
    outlineColor: colorRolesVars.outline,
    padding: '1rem',
  },
});

const styles = stylex.create({
  input: {
    width: '100%',
    height: '100%',
    textAlign: 'center',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: colorRolesVars.outline,
    borderRadius: shapeVars.corner$md,
  },
});

export const Variants: IStory = {
  render: (props) => (
    <ComponentShowcase<IFocusRingProps>
      component={(variantArgs) => (
        <Placeholder
          styles={placeholderStyles}
          label={variantArgs.inward ? 'Inward' : 'Outward'}
        >
          <FocusRing {...props} {...variantArgs} />
        </Placeholder>
      )}
      props={props}
      colsProps={[{ inward: false }, { inward: true }]}
    />
  ),
  args: {
    ...defaultArgs,
    visualState: {
      focused: true,
    },
  },
};

export const Outward: IStory = {
  render: (props) => (
    <ComponentShowcase<IFocusRingProps>
      component={(variantArgs) => (
        <Placeholder styles={placeholderStyles} role='button' tabIndex={0}>
          <FocusRing {...props} {...variantArgs} />
        </Placeholder>
      )}
      props={props}
      colsProps={[{}, {}, {}]}
    />
  ),
  args: defaultArgs,
};

export const Inward: IStory = {
  render: (props) => (
    <ComponentShowcase<IFocusRingProps>
      component={(variantArgs) => (
        <Placeholder styles={placeholderStyles} role='button' tabIndex={0}>
          <FocusRing {...props} {...variantArgs} />
        </Placeholder>
      )}
      props={props}
      colsProps={[{}, {}, {}]}
    />
  ),
  args: {
    ...defaultArgs,
    inward: true,
  },
};

const AttachedComponent: React.FC<IFocusRingProps> = (props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Placeholder styles={dashedPlaceholderStyles}>
      <FocusRing {...props} for={inputRef} />
      <input {...stylex.props(styles.input)} ref={inputRef} />
    </Placeholder>
  );
};

export const Attached: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={(variantArgs) => (
        <AttachedComponent {...props} {...variantArgs} />
      )}
      props={props}
      colsProps={[{}, {}, {}]}
    />
  ),
  args: defaultArgs,
};

const MultiActionComponent: React.FC<IFocusRingProps> = (props) => {
  const secondaryActionRef = useRef<HTMLInputElement>(null);

  return (
    <Placeholder styles={placeholderStyles} role='button' tabIndex={0}>
      <FocusRing {...props} />
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <FocusRing {...props} for={secondaryActionRef} />
        <input {...stylex.props(styles.input)} ref={secondaryActionRef} />
      </div>
    </Placeholder>
  );
};

export const MultiAction: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={(variantArgs) => (
        <MultiActionComponent {...props} {...variantArgs} />
      )}
      props={props}
      colsProps={[{}, {}, {}]}
    />
  ),
  args: defaultArgs,
};

export default meta;
