import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import type { IPlaygroundSections } from '~/docs/Playground';
import { Playground } from '~/docs/Playground';
import {
  FabPlaygroundDemo,
  type IFabPlaygroundDemoProps,
} from './FabPlaygroundDemo';

const svgColorIcon = (
  <svg viewBox='0 0 36 36'>
    <path fill='#4285F4' d='M30 16H20l-4 4h14z'></path>
    <path fill='#FBBC05' d='M6 16v4h10l4-4z'></path>
    <path fill='#34A853' d='M16 16v14h4V20z'></path>
    <path fill='#EA4335' d='M20 16V6h-4v14z'></path>
    <path fill='none' d='M0 0h36v36H0z'></path>
  </svg>
);

export const fabPlaygroundSections: IPlaygroundSections<IFabPlaygroundDemoProps> =
  {
    fab: {
      title: 'Fab',
      getProps: (sectionProps) => ({
        children:
          sectionProps?.fab.variant === 'branded' ? (
            svgColorIcon
          ) : (
            <FontAwesomeIcon icon={faPaperPlane} />
          ),
      }),
      options: [
        {
          label: 'Variant',
          input: {
            type: 'string',
            value: 'surface',
            items: [
              { label: 'Surface', value: 'surface' },
              { label: 'Primary', value: 'primary' },
              { label: 'Secondary', value: 'secondary' },
              { label: 'Tertiary', value: 'tertiary' },
              { label: 'Branded', value: 'branded' },
            ],
            targetProp: 'variant',
          },
          modifiers: {
            required: true,
          },
        },
        {
          label: 'Size',
          input: {
            type: 'string',
            value: 'md',
            items: [
              { label: 'Small', value: 'sm' },
              { label: 'Medium', value: 'md' },
              { label: 'Large', value: 'lg' },
            ],
            targetProp: 'size',
          },
          modifiers: {
            required: true,
          },
        },
        {
          label: 'Disabled',
          props: {
            disabled: true,
          },
        },
        {
          label: 'Loading',
          props: {
            loading: true,
          },
        },
        {
          label: 'Loading text',
          input: {
            type: 'string',
            value: 'Wait...',
            targetProp: 'loadingText',
          },
          getModifiers: (sectionProps) => ({
            disabled: !sectionProps?.fab.loading,
          }),
        },
      ],
    },
  };

export const FabPlayground: React.FC = (props) => {
  return (
    <Playground<IFabPlaygroundDemoProps>
      {...props}
      defaultSections={fabPlaygroundSections}
      componentRenderer={(props) => <FabPlaygroundDemo {...props} />}
    />
  );
};
