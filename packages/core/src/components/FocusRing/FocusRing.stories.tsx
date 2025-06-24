import type { Meta, StoryObj } from '@storybook/react-vite';
import { capitalizeFirstLetter } from '@olivierpascal/helpers';

import type { IBoxProps } from '~/components/Box';
import type { IPlaceholderOwnProps } from '~/components/Placeholder';
import type { IFocusRingVariant } from './FocusRing.types';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { Placeholder } from '~/components/Placeholder';
import { useInteractions } from '~/hooks/useInteractions';
import { FocusRing } from './FocusRing';
import { focusRingVariants } from './FocusRing.types';

type IDemoProps = IBoxProps &
  IPlaceholderOwnProps & {
    className?: string;
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
      w="96px"
      h="96px"
      shape="$md"
      role="button"
      tabIndex={0}
      className={className}
      label={label}
      disabled={disabled}
      {...interactionsContext.triggerProps}
      {...other}
    >
      <FocusRing
        variant={variant}
        visible={interactionsContext.state.focused}
      />
      {children}
    </Placeholder>
  );
};

const meta = {
  component: FocusRingDemo,
} satisfies Meta<typeof FocusRingDemo>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<IDemoProps>;

const FocusRingShowcase = componentShowcaseFactory(FocusRingDemo);

export const Variants: IStory = {
  render: (props) => (
    <FocusRingShowcase
      props={props}
      cols={[
        { props: { label: 'Unfocused' } },
        ...focusRingVariants.map((variant) => ({
          props: {
            interactions: {
              focused: true,
            },
            variant,
            label: capitalizeFirstLetter(variant),
          },
        })),
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

const FocusRingShowcase2 = componentShowcaseFactory((props: IDemoProps) => (
  <FocusRingDemo {...props}>
    <FocusRingDemo
      {...props}
      surface="$primaryContainer"
      w="48px"
      h="48px"
      shape="$sm"
    />
  </FocusRingDemo>
));

export const MultiAction: IStory = {
  render: (props) => <FocusRingShowcase2 props={props} cols={[{}, {}, {}]} />,
  args: defaultArgs,
};

export default meta;
