import type { Meta, StoryObj } from '@storybook/react';

import type { IFocusRingVariant } from './FocusRing.types';
import { makeComponentShowcase } from '../ComponentShowcase';
import { Placeholder, type IPlaceholderOwnProps } from '../Placeholder';
import { FocusRing } from './FocusRing';
import {
  useInteractions,
  type IInteractionsState,
} from '~/hooks/useInteractions';

// https://github.com/material-components/material-web/blob/main/focus/demo/stories.ts

type IDemoProps = IPlaceholderOwnProps & {
  className?: string;
  staticInteractionState?: IInteractionsState;
  variant?: IFocusRingVariant;
  disabled?: boolean;
  children?: React.ReactNode;
};

const FocusRingDemo: React.FC<IDemoProps> = (props) => {
  const {
    className,
    label,
    staticInteractionState,
    variant,
    disabled,
    children,
    ...other
  } = props;
  const interactions = useInteractions({
    staticState: staticInteractionState,
    disabled,
  });

  return (
    <Placeholder
      width={96}
      height={96}
      corner='sm'
      role='button'
      tabIndex={0}
      className={className}
      label={label}
      interactions={interactions}
      disabled={disabled}
      {...other}
    >
      <FocusRing variant={variant} interactionsState={interactions.state} />
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
            staticInteractionState: {
              focused: true,
            },
            variant: 'inward',
            label: 'Inward',
          },
        },
        {
          props: {
            staticInteractionState: {
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
      surface='primaryContainer'
      width='50%'
      height='50%'
    />
  </FocusRingDemo>
));

export const MultiAction: IStory = {
  render: (props) => <FocusRingShowcase2 props={props} cols={[{}, {}, {}]} />,
  args: defaultArgs,
};

export default meta;
