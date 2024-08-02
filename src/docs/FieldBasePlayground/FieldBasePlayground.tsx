import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';

import type { IPlaygroundSections } from '~/docs/Playground';
import { Playground } from '~/docs/Playground';
import { Placeholder, type IPlaceholderProps } from '~/components/Placeholder';
import {
  FieldBasePlaygroundDemo,
  IFieldBasePlaygroundDemoProps,
} from './FieldBasePlaygroundDemo';

const FieldBasePlaceholder: React.FC<IPlaceholderProps> = (props) => (
  <Placeholder {...props} surface='onSurface' disabled expand />
);

export const fieldbasePlaygroundSections: IPlaygroundSections<IFieldBasePlaygroundDemoProps> =
  {
    fieldBase: {
      title: 'Field Base',
      options: [
        {
          label: 'Variant',
          input: {
            type: 'string',
            value: 'filled',
            items: [
              { label: 'Filled', value: 'filled' },
              { label: 'Outlined', value: 'outlined' },
            ],
            targetProp: 'variant',
          },
          modifiers: {
            required: true,
          },
        },
        {
          label: 'Label',
          input: {
            type: 'string',
            value: 'Label',
            targetProp: 'label',
          },
          modifiers: {
            off: true,
          },
        },
        {
          label: 'Focused',
          props: {
            visualState: {
              focused: true,
            },
          },
          modifiers: {
            off: true,
          },
        },
        {
          label: 'Start slot',
          props: {
            start: <FieldBasePlaceholder />,
          },
          modifiers: {
            off: true,
          },
        },
        {
          label: 'Leading icon',
          props: {
            leadingIcon: <FontAwesomeIcon icon={faMagnifyingGlass} />,
          },
          modifiers: {
            off: true,
          },
        },
        {
          label: 'Content slot',
          props: {
            children: <FieldBasePlaceholder />,
            populated: true,
          },
          modifiers: {
            off: true,
          },
        },
        {
          label: 'Trailing icon',
          props: {
            trailingIcon: <FontAwesomeIcon icon={faXmark} />,
          },
          modifiers: {
            off: true,
          },
        },
        {
          label: 'End slot',
          props: {
            end: <FieldBasePlaceholder />,
          },
          modifiers: {
            off: true,
          },
        },
        {
          label: 'Supporting text',
          input: {
            type: 'string',
            value: 'Supporting Text',
            targetProp: 'supportingText',
          },
          modifiers: {
            off: true,
          },
        },
        {
          label: 'Has error',
          props: {
            hasError: true,
          },
          modifiers: {
            off: true,
          },
        },
        {
          label: 'Error text',
          input: {
            type: 'string',
            value: 'Error text',
            targetProp: 'errorText',
          },
          modifiers: {
            off: true,
          },
          getModifiers: (sectionsProps) => ({
            disabled: !sectionsProps?.fieldBase.hasError,
          }),
        },
        {
          label: 'Loading',
          props: {
            loading: true,
          },
          modifiers: {
            off: true,
          },
        },
        {
          label: 'Required',
          props: {
            required: true,
          },
          modifiers: {
            off: true,
          },
        },
        {
          label: 'Disabled',
          props: {
            disabled: true,
          },
          modifiers: {
            off: true,
          },
        },
      ],
    },
  };

export const FieldBasePlayground: React.FC = (props) => {
  return (
    <Playground<IFieldBasePlaygroundDemoProps>
      {...props}
      defaultSections={fieldbasePlaygroundSections}
      componentRenderer={(props) => <FieldBasePlaygroundDemo {...props} />}
    />
  );
};
