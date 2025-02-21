import type { Meta, StoryObj } from '@storybook/react';

import type { IComponentPresentation } from '~/components/ComponentShowcase';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { FocusRing } from '~/components/FocusRing';
import { Placeholder } from '~/components/Placeholder';
import { StateLayer } from './StateLayer';
import { IUseStateLayerProps, useStateLayer } from './useStateLayer';

// https://material-web.dev/components/ripple/
// https://github.com/material-components/material-web/blob/main/ripple/demo/stories.ts

type IDemoProps = IUseStateLayerProps;

const meta = {} satisfies Meta<IDemoProps>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<IDemoProps>;

const states: Array<IComponentPresentation<IDemoProps>> = [
  { legend: 'Normal' },
  { legend: 'Hovered', props: { baseState: { hovered: true } } },
  { legend: 'Pressed', props: { baseState: { pressed: true } } },
  { legend: 'Dragged', props: { baseState: { dragged: true } } },
  { legend: 'Disabled', props: { disabled: true } },
];

const rows: Array<IComponentPresentation<IDemoProps>> = [
  { legend: 'With ripple effect' },
  { legend: 'Without ripple effect', props: { withoutRippleEffect: true } },
];

const BoundedDemo: React.FC<IDemoProps> = (props) => {
  const stateLayer = useStateLayer<HTMLDivElement>(props);

  return (
    <Placeholder
      w="$24"
      h="$24"
      surface="$surface"
      shape="$md"
      outline="$xs"
      outlineStyle="solid"
      role={props.disabled || props.baseState ? undefined : 'button'}
      tabIndex={props.disabled || props.baseState ? -1 : 0}
      disabled={props.disabled}
      ref={stateLayer.triggerRef}
      style={{ cursor: 'pointer' }}
      {...stateLayer.interactionsContext.triggerProps}
    >
      <StateLayer context={stateLayer} />
      <FocusRing visible={stateLayer.interactionsContext.state.focused} />
    </Placeholder>
  );
};

const BoundedShowcase = componentShowcaseFactory(BoundedDemo);

export const Bounded: IStory = {
  render: (props) => (
    <BoundedShowcase props={props} cols={states} rows={rows} />
  ),
  args: defaultArgs,
};

const UnboundedDemo: React.FC<IDemoProps> = (props) => {
  const stateLayer = useStateLayer<HTMLDivElement>(props);

  return (
    <Placeholder
      w="$24"
      h="$24"
      surface="$surface"
      shape="$md"
      outline="$xs"
      outlineStyle="dashed"
      role="button"
      tabIndex={props.disabled || props.baseState ? -1 : 0}
      disabled={props.disabled}
      style={{ cursor: 'pointer' }}
      {...stateLayer.interactionsContext.triggerProps}
      ref={stateLayer.triggerRef}
    >
      <Placeholder
        w="$12"
        h="$12"
        surface="$transparent"
        shape="$sm"
        outline="$xs"
        outlineStyle="solid"
        style={{ cursor: 'pointer' }}
      >
        <StateLayer context={stateLayer} />
      </Placeholder>
      <FocusRing visible={stateLayer.interactionsContext.state.focused} />
    </Placeholder>
  );
};

const UnboundedShowcase = componentShowcaseFactory(UnboundedDemo);

export const Unbounded: IStory = {
  render: (props) => (
    <UnboundedShowcase props={props} cols={states} rows={rows} />
  ),
  args: defaultArgs,
};

const NestedDemo: React.FC<IDemoProps> = (props) => {
  const stateLayer = useStateLayer<HTMLDivElement>(props);
  const nestedStateLayer = useStateLayer<HTMLDivElement>(props);

  return (
    <Placeholder
      w="$24"
      h="$24"
      surface="$surface"
      shape="$md"
      outline="$xs"
      outlineStyle="solid"
      role="button"
      tabIndex={props.disabled || props.baseState ? -1 : 0}
      disabled={props.disabled}
      style={{ cursor: 'pointer' }}
      {...stateLayer.interactionsContext.triggerProps}
      ref={stateLayer.triggerRef}
    >
      <StateLayer context={stateLayer} />
      <FocusRing visible={stateLayer.interactionsContext.state.focused} />

      <Placeholder
        w="$12"
        h="$12"
        surface="$surface"
        shape="$sm"
        outline="$xs"
        outlineStyle="solid"
        role="button"
        tabIndex={props.disabled || props.baseState ? -1 : 0}
        disabled={props.disabled}
        style={{ cursor: 'pointer' }}
        {...nestedStateLayer.interactionsContext.triggerProps}
        ref={nestedStateLayer.triggerRef}
      >
        <StateLayer context={nestedStateLayer} />
        <FocusRing
          visible={nestedStateLayer.interactionsContext.state.focused}
        />
      </Placeholder>
    </Placeholder>
  );
};

const NestedShowcase = componentShowcaseFactory(NestedDemo);

export const Nested: IStory = {
  render: (props) => (
    <NestedShowcase
      props={props}
      cols={[
        { legend: 'Normal' },
        {
          legend: 'Hover within',
          props: {
            events: {
              hover: {
                within: true,
              },
            },
          },
        },
        {
          legend: 'Focus within',
          props: {
            events: {
              focus: {
                within: true,
              },
            },
          },
        },
      ]}
      rows={rows}
    />
  ),
  args: defaultArgs,
};

export default meta;
