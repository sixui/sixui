import type { Meta, StoryObj } from '@storybook/react';
import stylex from '@stylexjs/stylex';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { isFunction } from 'lodash';

import type { IStepperProps } from './Stepper.types';
import { Step, type IStepProps } from '@/components/atoms/Step';
import { sbHandleEvent } from '@/helpers/sbHandleEvent';
import { ComponentShowcase } from '@/components/utils/ComponentShowcase';
import { stepTokens } from '@/components/atoms/Step/Step.stylex';
import { createSequence } from '@olivierpascal/helpers';
import { StepConnector } from '@/components/atoms/StepConnector';
import { Stepper } from './Stepper';

const meta = {
  component: Stepper,
} satisfies Meta<typeof Stepper>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: 'Stepper',
  activeStep: 1,
} satisfies Partial<IStepperProps>;

const styles = stylex.create({
  horizontal: {
    minWidth: 750,
  },
  vertical: {
    minWidth: 128,
  },
  step$noSpace: {
    // TODO: waiting for a fix
    // https://github.com/facebook/stylex/issues/529
    [stepTokens.bulletPointSpace]: '0.0px',
  },
});

const makeSteps = (
  props?: IStepProps | ((index: number) => IStepProps),
  count = 4,
): Array<React.ReactElement> =>
  createSequence(count).map((index) => (
    <Step
      onClick={(...args) => void sbHandleEvent('click', args)}
      {...(isFunction(props) ? props(index) : props)}
      key={index}
    />
  ));

export const Horizontal: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={(props) => <Stepper {...props} />}
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
                <StepConnector
                  textPosition={
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
                </StepConnector>
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
              nextConnector: <StepConnector />,
              sx: styles.step$noSpace,
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
              sx: styles.step$noSpace,
            })),
            labelPosition: 'bottom',
          },
        },
      ]}
      horizontalAlign='start'
    />
  ),
  args: {
    ...defaultArgs,
    sx: styles.horizontal,
  },
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
              nextConnector: <StepConnector>Lorem ipsum</StepConnector>,
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
              <Step
                key={0}
                onClick={(...args) => void sbHandleEvent('click', args)}
                label='Lorem ipsum'
              >
                Lorem ipsum dolor sit amet.
              </Step>,
              <Step
                key={1}
                onClick={(...args) => void sbHandleEvent('click', args)}
                label='Lorem ipsum'
                supportingText='Supporting text'
                nextConnector={<StepConnector>Lorem ipsum</StepConnector>}
              >
                Lorem ipsum dolor sit amet.
                <br />
                Lorem ipsum dolor sit amet.
                <br />
                Lorem ipsum dolor sit amet.
              </Step>,
              <Step
                key={2}
                onClick={(...args) => void sbHandleEvent('click', args)}
                label='Lorem ipsum'
              >
                Lorem ipsum dolor sit amet.
              </Step>,
            ],
          },
        },
        {
          legend: 'No space',
          props: {
            children: [
              <Step
                key={0}
                onClick={(...args) => void sbHandleEvent('click', args)}
                sx={styles.step$noSpace}
              />,
              <Step
                key={1}
                onClick={(...args) => void sbHandleEvent('click', args)}
                label='Lorem ipsum'
                sx={styles.step$noSpace}
                supportingText='Supporting text'
                nextConnector={<StepConnector>Lorem ipsum</StepConnector>}
              >
                Lorem ipsum dolor sit amet.
                <br />
                Lorem ipsum dolor sit amet.
                <br />
                Lorem ipsum dolor sit amet.
              </Step>,
              <Step
                key={2}
                onClick={(...args) => void sbHandleEvent('click', args)}
                label='Lorem ipsum'
                sx={styles.step$noSpace}
              >
                Lorem ipsum dolor sit amet.
              </Step>,
            ],
          },
        },
      ]}
      verticalAlign='stretch'
      horizontalAlign='start'
    />
  ),
  args: {
    ...defaultArgs,
    orientation: 'vertical',
    sx: styles.vertical,
  },
};

export default meta;
