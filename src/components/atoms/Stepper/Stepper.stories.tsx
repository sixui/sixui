import type { Meta, StoryObj } from '@storybook/react';
import stylex from '@stylexjs/stylex';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

import type { IStepProps } from '@/components/atoms/Step';
import { sbHandleEvent } from '@/helpers/sbHandleEvent';
import { ComponentShowcase } from '@/components/utils/ComponentShowcase';
import { componentVars as stepVars } from '@/themes/base/Step/Step.stylex';
import { Stepper, type IStepperProps } from './Stepper';
import { createSequence } from '@olivierpascal/helpers';

const meta = {
  component: Stepper,
} satisfies Meta<typeof Stepper>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: 'Stepper',
  activeStep: 1,
} satisfies Partial<IStepperProps>;

const styles = stylex.create({
  vertical: {
    minWidth: 128,
  },
  step$noSpace: {
    // TODO: waiting for a fix
    // https://github.com/facebook/stylex/issues/529
    // eslint-disable-next-line @stylexjs/valid-styles
    [stepVars.bulletPointSpace]: '0.0px',
  },
});

const makeSteps = (
  props?: IStepProps | ((index: number) => IStepProps),
  count = 4,
): Array<React.ReactElement> =>
  createSequence(count).map((index) => (
    <Stepper.Step
      onClick={() => void sbHandleEvent('click')}
      {...(typeof props === 'function' ? props(index) : props)}
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
          legend: 'No space',
          props: {
            children: makeSteps((index) => ({
              label: index === 1 || index === 2 ? 'Label' : undefined,
              supportingText: index === 2 ? 'Supporting text' : undefined,
              children: 'Lorem ipsum dolor sit amet.',
              nextConnector: <Stepper.Connector />,
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
                index % 2 === 0 ? undefined : (
                  <>
                    Supporting text
                    <br />
                    Supporting text
                    <br />
                    Supporting text
                    <br />
                    Supporting text
                    <br />
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
          legend: 'No space',
          props: {
            children: [
              <Stepper.Step
                key={0}
                onClick={() => void sbHandleEvent('click')}
                sx={styles.step$noSpace}
              />,
              <Stepper.Step
                key={1}
                onClick={() => void sbHandleEvent('click')}
                label='Lorem ipsum'
                sx={styles.step$noSpace}
                supportingText='Supporting text'
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
                onClick={() => void sbHandleEvent('click')}
                label='Lorem ipsum'
                sx={styles.step$noSpace}
              >
                Lorem ipsum dolor sit amet.
              </Stepper.Step>,
            ],
          },
        },
        {
          legend: 'Content',
          props: {
            children: [
              <Stepper.Step
                key={0}
                onClick={() => void sbHandleEvent('click')}
                label='Lorem ipsum'
              >
                Lorem ipsum dolor sit amet.
              </Stepper.Step>,
              <Stepper.Step
                key={1}
                onClick={() => void sbHandleEvent('click')}
                label='Lorem ipsum'
                supportingText='Supporting text'
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
                onClick={() => void sbHandleEvent('click')}
                label='Lorem ipsum'
              >
                Lorem ipsum dolor sit amet.
              </Stepper.Step>,
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
