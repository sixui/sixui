import type { Meta, StoryObj } from '@storybook/react';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createSequence } from '@olivierpascal/helpers';

import type { IStepProps } from '../Step';
import type { IStepperProps } from './Stepper.types';
import { isFunction } from '~/helpers/isFunction';
import { sbHandleEvent } from '~/helpers/sbHandleEvent';
import { componentShowcaseFactory } from '../ComponentShowcase';
import { Stepper } from './Stepper';

const meta = {
  component: Stepper,
} satisfies Meta<typeof Stepper>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  activeStep: 1,
} satisfies Partial<IStepperProps>;

const StepperShowcase = componentShowcaseFactory(Stepper);

const makeSteps = (
  props?: IStepProps | ((index: number) => IStepProps),
  count = 4,
): Array<React.ReactElement> =>
  createSequence(count).map((index) => (
    <Stepper.Step
      onClick={(...args) => sbHandleEvent('click', args, 1000)}
      {...(isFunction(props) ? props(index) : props)}
      key={index}
    />
  ));

export const Horizontal: IStory = {
  render: (props) => (
    <StepperShowcase
      props={props}
      rows={[
        {
          legend: 'No label',
          props: {
            children: makeSteps(),
          },
        },
        {
          legend: 'Loading',
          props: {
            children: makeSteps(),
            loading: true,
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
          legend: 'Custom connector',
          props: {
            children: makeSteps((index) => ({
              connectorRenderer: ({ part }) => (
                <Stepper.Connector
                  label={part === 'main' && 'Lorem ipsum'}
                  contentPosition={
                    index === 0
                      ? 'top'
                      : index === 1
                        ? 'middle'
                        : index === 2
                          ? 'bottom'
                          : undefined
                  }
                />
              ),
            })),
          },
        },
        {
          legend: 'Right label',
          props: {
            children: makeSteps((index) => ({
              label: 'Lorem ipsum',
              supportingText: index % 2 === 0 ? undefined : 'Supporting text',
              children: 'Lorem ipsum dolor sit amet.',
            })),
            labelPosition: 'right',
          },
        },
        {
          legend: 'Right label and no space',
          props: {
            children: makeSteps((index) => ({
              label: index === 1 || index === 2 ? 'Label' : undefined,
              supportingText: index === 2 ? 'Supporting text' : undefined,
              children: 'Lorem ipsum dolor sit amet.',
              nextConnector: <Stepper.Connector />,
              // FIXME: sx: styles.step$noSpace,
            })),
            labelPosition: 'right',
          },
        },
        {
          legend: 'Bottom label',
          props: {
            children: makeSteps((index) => ({
              label: 'Lorem ipsum',
              supportingText: index % 2 === 0 ? undefined : 'Supporting text',
            })),
            labelPosition: 'bottom',
          },
        },
        {
          legend: 'Bottom label and no space',
          props: {
            children: makeSteps((index) => ({
              label: 'Lorem ipsum',
              supportingText: index % 2 === 0 ? undefined : 'Supporting text',
              // FIXME: styles.step$noSpace,
            })),
            labelPosition: 'bottom',
          },
        },
      ]}
      horizontalAlign="start"
    />
  ),
  args: {
    ...defaultArgs,
    miw: '$160',
  },
};

export const Vertical: IStory = {
  render: (props) => (
    <StepperShowcase
      props={props}
      cols={[
        {
          legend: 'No label',
          props: {
            children: makeSteps(),
          },
        },
        {
          legend: 'Loading',
          props: {
            children: makeSteps(),
            loading: true,
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
          legend: 'Custom connector',
          props: {
            children: makeSteps({
              connectorRenderer: ({ part }) => (
                <Stepper.Connector label={part === 'main' && 'Lorem ipsum'} />
              ),
            }),
          },
        },
        {
          legend: 'Label',
          props: {
            children: makeSteps((index) => ({
              label: 'Lorem ipsum',
              supportingText: index === 1 && (
                <>
                  Supporting text
                  <br />
                  Supporting text
                  <br />
                  Supporting text
                </>
              ),
            })),
          },
        },
        {
          legend: 'Content',
          props: {
            children: makeSteps(
              (index) => ({
                label: 'Lorem ipsum',
                supportingText: index === 1 && (
                  <>
                    Supporting text
                    <br />
                    Supporting text
                    <br />
                    Supporting text
                  </>
                ),
                children: index === 1 && (
                  <>
                    Lorem ipsum dolor sit amet.
                    <br />
                    Lorem ipsum dolor sit amet.
                    <br />
                    Lorem ipsum dolor sit amet.
                  </>
                ),
                connectorRenderer:
                  index === 1
                    ? ({ part }) => (
                        <Stepper.Connector
                          label={part === 'main' && 'Lorem ipsum'}
                        />
                      )
                    : undefined,
              }),
              3,
            ),
          },
        },
        {
          // FIXME:
          legend: 'No space',
          props: {
            children: makeSteps(
              (index) => ({
                label: 'Lorem ipsum',
                supportingText: index === 1 && (
                  <>
                    Supporting text
                    <br />
                    Supporting text
                    <br />
                    Supporting text
                  </>
                ),
                children: index === 1 && (
                  <>
                    Lorem ipsum dolor sit amet.
                    <br />
                    Lorem ipsum dolor sit amet.
                    <br />
                    Lorem ipsum dolor sit amet.
                  </>
                ),
                connectorRenderer:
                  index === 1
                    ? ({ part }) => (
                        <Stepper.Connector
                          label={part === 'main' && 'Lorem ipsum'}
                        />
                      )
                    : undefined,
              }),
              3,
            ),
          },
        },
      ]}
      verticalAlign="stretch"
      horizontalAlign="start"
    />
  ),
  args: {
    ...defaultArgs,
    orientation: 'vertical',
    miw: '$32',
  },
};

export default meta;
