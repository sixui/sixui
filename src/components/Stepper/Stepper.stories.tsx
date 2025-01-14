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
      onClick={(...args) => void sbHandleEvent('click', args)}
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
              nextConnector: (
                <Stepper.Connector
                  contentPosition={
                    index === 0
                      ? 'top'
                      : index === 1
                        ? 'middle'
                        : index === 2
                          ? 'bottom'
                          : undefined
                  }
                >
                  Lorem ipsum
                </Stepper.Connector>
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
              nextConnector: <Stepper.Connector>Lorem ipsum</Stepper.Connector>,
            }),
          },
        },
        {
          legend: 'Label',
          props: {
            children: makeSteps((index) => ({
              label: 'Lorem ipsum',
              supportingText:
                index === 1 ? (
                  <>
                    Supporting text
                    <br />
                    Supporting text
                    <br />
                    Supporting text
                  </>
                ) : null,
            })),
          },
        },
        {
          legend: 'Content',
          props: {
            children: [
              <Stepper.Step
                key={0}
                onClick={(...args) => sbHandleEvent('click', args, 1000)}
                label="Lorem ipsum"
              >
                Lorem ipsum dolor sit amet.
              </Stepper.Step>,
              <Stepper.Step
                key={1}
                onClick={(...args) => sbHandleEvent('click', args, 1000)}
                label="Lorem ipsum"
                supportingText="Supporting text"
                nextConnector={
                  <Stepper.Connector>Lorem ipsum</Stepper.Connector>
                }
              >
                Lorem ipsum dolor sit amet.
                <br />
                Lorem ipsum dolor sit amet.
                <br />
                Lorem ipsum dolor sit amet.
              </Stepper.Step>,
              <Stepper.Step
                key={2}
                onClick={(...args) => sbHandleEvent('click', args, 1000)}
                label="Lorem ipsum"
              >
                Lorem ipsum dolor sit amet.
              </Stepper.Step>,
            ],
          },
        },
        {
          legend: 'No space',
          props: {
            children: [
              <Stepper.Step
                key={0}
                onClick={(...args) => sbHandleEvent('click', args, 1000)}
                // FIXME: sx={styles.step$noSpace}
              />,
              <Stepper.Step
                key={1}
                onClick={(...args) => sbHandleEvent('click', args, 1000)}
                label="Lorem ipsum"
                // FIXME: sx={styles.step$noSpace}
                supportingText="Supporting text"
                nextConnector={
                  <Stepper.Connector>Lorem ipsum</Stepper.Connector>
                }
              >
                Lorem ipsum dolor sit amet.
                <br />
                Lorem ipsum dolor sit amet.
                <br />
                Lorem ipsum dolor sit amet.
              </Stepper.Step>,
              <Stepper.Step
                key={2}
                onClick={(...args) => void sbHandleEvent('click', args)}
                label="Lorem ipsum"
                // FIXME: sx={styles.step$noSpace}
              >
                Lorem ipsum dolor sit amet.
              </Stepper.Step>,
            ],
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
