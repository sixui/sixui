import { useRef } from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import stylex from '@stylexjs/stylex';

import type { IFocusRingProps } from './FocusRing.types';
import { shapeTokens } from '~/themes/base/shape.stylex';
import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { spacingTokens } from '~/themes/base/spacing.stylex';
import { outlineTokens } from '~/themes/base/outline.stylex';
import { ComponentShowcase } from '../ComponentShowcase';
import { Placeholder, type IPlaceholderProps } from '../Placeholder';
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

const styles = stylex.create({
  placeholder: {
    padding: spacingTokens.padding$4,
  },
  input: {
    width: '100%',
    height: '100%',
    textAlign: 'center',
    borderWidth: outlineTokens.width$sm,
    borderStyle: 'solid',
    borderColor: colorSchemeTokens.outline,
    borderRadius: shapeTokens.corner$md,
  },
});

const BasePlaceholder: React.FC<IPlaceholderProps> = (props) => (
  <Placeholder {...props} sx={styles.placeholder} width={96} height={96} />
);

export const Variants: IStory = {
  render: (props) => (
    <ComponentShowcase<IFocusRingProps>
      component={(variantArgs) => (
        <BasePlaceholder label={variantArgs.inward ? 'Inward' : 'Outward'}>
          <FocusRing {...props} {...variantArgs} />
        </BasePlaceholder>
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
        <BasePlaceholder role='button' tabIndex={0}>
          <FocusRing {...props} {...variantArgs} />
        </BasePlaceholder>
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
        <BasePlaceholder role='button' tabIndex={0}>
          <FocusRing {...props} {...variantArgs} />
        </BasePlaceholder>
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
    <BasePlaceholder>
      <FocusRing {...props} for={inputRef} />
      <input {...stylex.props(styles.input)} ref={inputRef} />
    </BasePlaceholder>
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
    <BasePlaceholder role='button' tabIndex={0}>
      <FocusRing {...props} />
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <FocusRing {...props} for={secondaryActionRef} />
        <input {...stylex.props(styles.input)} ref={secondaryActionRef} />
      </div>
    </BasePlaceholder>
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
