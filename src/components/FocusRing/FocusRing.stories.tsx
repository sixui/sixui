import type { Meta, StoryObj } from '@storybook/react';

import type { IFocusRingVariant } from './FocusRing.types';
import type { IBoxProps } from '../Box';
import { makeComponentShowcase } from '../ComponentShowcase';
import { Placeholder, type IPlaceholderOwnProps } from '../Placeholder';
import { FocusRing } from './FocusRing';
import { useInteractions, type IInteractions } from '~/hooks/useInteractions';

// https://github.com/material-components/material-web/blob/main/focus/demo/stories.ts

type IDemoProps = IBoxProps &
  IPlaceholderOwnProps & {
    className?: string;
    interactions?: IInteractions;
    variant?: IFocusRingVariant;
    disabled?: boolean;
    children?: React.ReactNode;
  };

const FocusRingDemo: React.FC<IDemoProps> = (props) => {
  const {
    className,
    label,
    interactions,
    variant,
    disabled,
    children,
    ...other
  } = props;
  const interactionsContext = useInteractions({
    events: {
      focus: true,
    },
    baseState: interactions,
    disabled,
  });

  return (
    <Placeholder
      w='$24'
      h='$24'
      corner='$md'
      role='button'
      tabIndex={0}
      className={className}
      label={label}
      disabled={disabled}
      {...interactionsContext.triggerProps}
      {...other}
    >
      <FocusRing variant={variant} interactions={interactionsContext.state} />
      {children}
    </Placeholder>
  );
};

const meta = {
  component: FocusRingDemo,
} satisfies Meta<typeof FocusRingDemo>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<IDemoProps>;

const FocusRingShowcase = makeComponentShowcase(FocusRingDemo);

export const Variants: IStory = {
  render: (props) => (
    <FocusRingShowcase
      props={props}
      cols={[
        { props: { label: 'Unfocused' } },
        {
          props: {
            interactions: {
              focused: true,
            },
            variant: 'inward',
            label: 'Inward',
          },
        },
        {
          props: {
            interactions: {
              focused: true,
            },
            variant: 'outward',
            label: 'Outward',
          },
        },
      ]}
    />
  ),
  args: defaultArgs,
};

export const Outward: IStory = {
  render: (props) => (
    <FocusRingShowcase
      props={props}
      cols={[
        { props: { label: '1' } },
        { props: { label: '2' } },
        { props: { label: '3' } },
      ]}
    />
  ),
  args: {
    ...defaultArgs,
    variant: 'outward',
  },
};

export const Inward: IStory = {
  render: (props) => (
    <FocusRingShowcase
      props={props}
      cols={[
        { props: { label: '1' } },
        { props: { label: '2' } },
        { props: { label: '3' } },
      ]}
    />
  ),
  args: {
    ...defaultArgs,
    variant: 'inward',
  },
};

const FocusRingShowcase2 = makeComponentShowcase((props: IDemoProps) => (
  <FocusRingDemo {...props}>
    <FocusRingDemo
      {...props}
      surface='$primaryContainer'
      w='$12'
      h='$12'
      corner='$sm'
    />
  </FocusRingDemo>
));

export const MultiAction: IStory = {
  render: (props) => <FocusRingShowcase2 props={props} cols={[{}, {}, {}]} />,
  args: defaultArgs,
};

export default meta;
