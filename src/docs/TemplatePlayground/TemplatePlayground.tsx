import type { IPlaygroundSections } from '~/docs/Playground';
import { Playground } from '~/docs/Playground';
import { TemplateDemo, ITemplateDemoProps } from './TemplateDemo';

const defaultSections: IPlaygroundSections<ITemplateDemoProps> = [
  {
    title: 'Props',
    options: [
      {
        label: 'Children',
        input: {
          type: 'string',
          value: 'Hello, world!',
          targetProp: 'children',
        },
      },
    ],
  },
];

export const TemplatePlayground: React.FC = (props) => {
  return (
    <Playground<ITemplateDemoProps>
      {...props}
      defaultSections={defaultSections}
      componentRenderer={(componentProps) => (
        <TemplateDemo {...componentProps} />
      )}
    />
  );
};
