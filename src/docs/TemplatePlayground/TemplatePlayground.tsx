import type { IPlaygroundSections } from '~/docs/Playground';
import { Playground } from '~/docs/Playground';
import {
  TemplatePlaygroundDemo,
  ITemplatePlaygroundDemoProps,
} from './TemplatePlaygroundDemo';

export const templatePlaygroundSections: IPlaygroundSections<ITemplatePlaygroundDemoProps> =
  {
    template: {
      title: 'Template',
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
  };

export const TemplatePlayground: React.FC = (props) => {
  return (
    <Playground<ITemplatePlaygroundDemoProps>
      {...props}
      defaultSections={templatePlaygroundSections}
      componentRenderer={(props) => <TemplatePlaygroundDemo {...props} />}
    />
  );
};
