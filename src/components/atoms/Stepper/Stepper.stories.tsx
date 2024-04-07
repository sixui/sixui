import type { Meta, StoryObj } from '@storybook/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

import type { IStepProps } from '@/components/atoms/Step';
import { ComponentShowcase } from '@/components/utils/ComponentShowcase';
import { Stepper, type IStepperProps } from './Stepper';
import { createSequence } from '@olivierpascal/helpers';

const meta = {
  component: Stepper,
} satisfies Meta<typeof Stepper>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: 'Stepper',
} satisfies Partial<IStepperProps>;

const makeSteps = (props?: IStepProps, count = 3): Array<React.ReactElement> =>
  createSequence(count).map((index) => <Stepper.Step {...props} key={index} />);

export const Horizontal: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Stepper}
      props={props}
      rows={[
        {
          legend: 'No label',
          props: {
            children: makeSteps(),
          },
        },
        {
          legend: 'Custom connector',
          props: {
            children: makeSteps({
              connector: <Stepper.Connector>Lorem ipsum</Stepper.Connector>,
            }),
          },
        },
        {
          legend: 'Icons',
          props: {
            children: makeSteps({
              icon: <FontAwesomeIcon icon={faLocationDot} />,
            }),
          },
        },
        {
          legend: 'Label right',
          props: {
            children: makeSteps({
              label: 'Lorem ipsum',
              supportingText: 'Supporting text',
            }),
            labelPosition: 'right',
          },
        },
        {
          legend: 'Label bottom',
          props: {
            children: makeSteps({
              label: 'Lorem ipsum',
              supportingText: 'Supporting text',
            }),
            labelPosition: 'bottom',
          },
        },
      ]}
      fullWidth
    />
  ),
  args: defaultArgs,
};

export const Vertical: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Stepper}
      props={props}
      cols={[
        {
          legend: 'No label',
          props: {
            children: makeSteps(),
          },
        },
        {
          legend: 'Custom connector',
          props: {
            children: makeSteps({
              connector: <Stepper.Connector>Lorem ipsum</Stepper.Connector>,
            }),
          },
        },
        {
          legend: 'Icons',
          props: {
            children: makeSteps({
              icon: <FontAwesomeIcon icon={faLocationDot} />,
            }),
          },
        },
        {
          legend: 'Label',
          props: {
            children: makeSteps({
              label: 'Lorem ipsum',
              supportingText: 'Supporting text',
            }),
          },
        },
        {
          legend: 'Content',
          props: {
            children: makeSteps({
              label: 'Lorem ipsum',
              supportingText: 'Supporting text',
              children: 'Lorem ipsum dolor sit amet.',
            }),
          },
        },
      ]}
      align='start'
    />
  ),
  args: {
    ...defaultArgs,
    orientation: 'vertical',
  },
};

// FIXME:
// - line color on avancement
// - handle state
// - add style vars

export default meta;
