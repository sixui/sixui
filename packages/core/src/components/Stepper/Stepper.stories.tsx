import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faChevronUp,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createSequence } from '@olivierpascal/helpers';
import { assignInlineVars } from '@vanilla-extract/dynamic';

import type { IStepperProps } from './Stepper.types';
import type { IStepperStepProps } from './StepperStep';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { Flex } from '~/components/Flex';
import { IconButton } from '~/components/IconButton';
import { isFunction } from '~/utils/isFunction';
import { sbHandleEvent } from '~/utils/sbHandleEvent';
import { Stepper } from './Stepper';

const meta = {
  component: Stepper,
} satisfies Meta<typeof Stepper>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<IStepperProps>;

const StepperShowcase = componentShowcaseFactory(Stepper);

const makeSteps = (
  props?: IStepperStepProps | ((index: number) => IStepperStepProps),
  count = 4,
): Array<React.ReactElement> =>
  createSequence(count).map((index) => (
    <Stepper.Step
      onClick={(...args) => sbHandleEvent('onClick', args, 1000)}
      {...(isFunction(props) ? props(index) : props)}
      key={index}
    />
  ));

const InteractiveStepper: React.FC<IStepperProps> = (props) => {
  const stepCount = 4;

  const [activeStep, setActiveStep] = useState(0);
  const nextStep = (): void => {
    setActiveStep((current) => Math.min(current + 1, stepCount));
  };
  const prevStep = (): void => {
    setActiveStep((current) => Math.max(current - 1, 0));
  };
  const completed = activeStep === stepCount;

  return (
    <Flex
      direction="column"
      align={props.orientation === 'vertical' ? undefined : 'center'}
    >
      <Stepper
        {...props}
        activeStep={activeStep}
        completed={completed}
        onStepClick={setActiveStep}
      />
      {props.orientation === 'vertical' ? (
        <Flex direction="column">
          <IconButton
            icon={<FontAwesomeIcon icon={faChevronUp} />}
            onClick={prevStep}
          />
          <IconButton
            icon={<FontAwesomeIcon icon={faChevronDown} />}
            onClick={nextStep}
          />
        </Flex>
      ) : (
        <Flex>
          <IconButton
            icon={<FontAwesomeIcon icon={faChevronLeft} />}
            onClick={prevStep}
          />
          <IconButton
            icon={<FontAwesomeIcon icon={faChevronRight} />}
            onClick={nextStep}
          />
        </Flex>
      )}
    </Flex>
  );
};

const InteractiveStepperShowcase = componentShowcaseFactory(InteractiveStepper);

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
                  labelPosition={
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
              style: assignInlineVars({
                [Stepper.theme.tokens.connector.space]: '0px',
              }),
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
              style: assignInlineVars({
                [Stepper.theme.tokens.connector.space]: '0px',
              }),
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
    activeStep: 1,
    w: '$160',
  } as IStepperProps,
};

export const HorizontalInteractive: IStory = {
  render: (props) => (
    <InteractiveStepperShowcase props={props} horizontalAlign="start" />
  ),
  args: {
    ...defaultArgs,
    w: '$160',
    children: makeSteps(
      (index) => ({
        label: 'Lorem ipsum',
        supportingText: index % 2 === 0 ? undefined : 'Supporting text',
      }),
      4,
    ),
    labelPosition: 'right',
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
            style: assignInlineVars({
              [Stepper.theme.tokens.connector.space]: '0px',
            }),
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
    h: '$128',
    activeStep: 1,
  } as IStepperProps,
};

export const VerticalInteractive: IStory = {
  render: (props) => (
    <InteractiveStepperShowcase props={props} horizontalAlign="start" />
  ),
  args: {
    ...defaultArgs,
    orientation: 'vertical',
    miw: '$32',
    h: '$128',
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
      }),
      4,
    ),
  },
};

export default meta;
