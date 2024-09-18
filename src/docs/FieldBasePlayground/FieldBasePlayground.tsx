import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import type { IPlaceholderProps } from '~/components/Placeholder';
import type { IPlaygroundSections } from '~/docs/Playground';
import type { IFieldBasePlaygroundDemoProps } from './FieldBasePlaygroundDemo';
import { Placeholder } from '~/components/Placeholder';
import { Playground } from '~/docs/Playground';
import { FieldBasePlaygroundDemo } from './FieldBasePlaygroundDemo';

export const FieldBasePlaceholder: React.FC<IPlaceholderProps> = (props) => (
  <Placeholder {...props} surface="onSurface" disabled expand corner="none" />
);

export const fieldBasePlaygroundSections: IPlaygroundSections<IFieldBasePlaygroundDemoProps> =
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
        },
        {
          label: 'Focused',
          props: {
            visualState: {
              focused: true,
            },
          },
        },
        {
          label: 'Start slot',
          props: {
            start: <FieldBasePlaceholder />,
          },
        },
        {
          label: 'Leading icon',
          props: {
            leadingIcon: <FontAwesomeIcon icon={faMagnifyingGlass} />,
          },
        },
        {
          label: 'Content slot',
          props: {
            children: <FieldBasePlaceholder />,
            populated: true,
          },
        },
        {
          label: 'Trailing icon',
          props: {
            trailingIcon: <FontAwesomeIcon icon={faXmark} />,
          },
        },
        {
          label: 'End slot',
          props: {
            end: <FieldBasePlaceholder />,
          },
        },
        {
          label: 'Supporting text',
          input: {
            type: 'string',
            value: 'Supporting Text',
            targetProp: 'supportingText',
          },
        },
        {
          label: 'Has error',
          props: {
            hasError: true,
          },
        },
        {
          label: 'Error text',
          input: {
            type: 'string',
            value: 'Error text',
            targetProp: 'errorText',
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
        },
        {
          label: 'Required',
          props: {
            required: true,
          },
        },
        {
          label: 'Disabled',
          props: {
            disabled: true,
          },
        },
      ],
    },
  };

export const FieldBasePlayground: React.FC = (props) => {
  return (
    <Playground<IFieldBasePlaygroundDemoProps>
      {...props}
      defaultSections={fieldBasePlaygroundSections}
      componentRenderer={(props) => <FieldBasePlaygroundDemo {...props} />}
    />
  );
};
