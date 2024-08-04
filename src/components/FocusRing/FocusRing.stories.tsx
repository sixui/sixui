import { useRef } from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import stylex from '@stylexjs/stylex';

import type { IFocusRingProps } from './FocusRing.types';
import { ComponentShowcase } from '../ComponentShowcase';
import { Placeholder } from '../Placeholder';
import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { shapeTokens } from '~/themes/base/shape.stylex';
import { FocusRing } from './FocusRing';
import { focusRingTokens } from './FocusRing.stylex';

// https://github.com/material-components/material-web/blob/main/focus/demo/stories.ts

const meta = {
  component: FocusRing,
} satisfies Meta<typeof FocusRing>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  styles: stylex.create({
    host: {
      [focusRingTokens.shape]: shapeTokens.corner$md,
    },
  }),
} satisfies Partial<IFocusRingProps>;

const placeholderStyles = stylex.create({
  host: {
    width: 96,
    height: 96,
    outlineWidth: '1px',
    outlineStyle: 'solid',
    outlineColor: colorSchemeTokens.outline,
    padding: '1rem',
  },
});

const dashedPlaceholderStyles = stylex.create({
  host: {
    width: 96,
    height: 96,
    outlineWidth: '1px',
    outlineStyle: 'dashed',
    outlineColor: colorSchemeTokens.outline,
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
    borderColor: colorSchemeTokens.outline,
    borderRadius: shapeTokens.corner$md,
  },
});

export const Variants: IStory = {
  render: (props) => (
    <ComponentShowcase<IFocusRingProps>
      component={(variantArgs) => (
        <Placeholder
          styles={placeholderStyles}
          corner='md'
          label={variantArgs.inward ? 'Inward' : 'Outward'}
        >
          <FocusRing {...props} {...variantArgs} />
        </Placeholder>
      )}
      props={props}
      cols={[{ props: { inward: false } }, { props: { inward: true } }]}
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
      cols={[{}, {}, {}]}
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
      cols={[{}, {}, {}]}
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
      cols={[{}, {}, {}]}
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
      cols={[{}, {}, {}]}
    />
  ),
  args: defaultArgs,
};

export default meta;
