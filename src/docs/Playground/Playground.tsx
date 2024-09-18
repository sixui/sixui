import { useState } from 'react';

import type { IPlaygroundProps } from './Playground.types';
import { Base } from '~/components/Base';
import { Density } from '~/components/Density';
import { fixedForwardRef } from '~/helpers/fixedForwardRef';
import { useStyles } from '~/hooks/useStyles';
import { playgroundStyles } from './Playground.styles';
import { PlaygroundSections } from './PlaygroundSections';

const convertValue = (
  value: unknown,
  type: 'string' | 'number' | 'boolean',
): unknown => {
  switch (type) {
    case 'string':
      return value as string;
    case 'number':
      return Number(value);
    case 'boolean':
      return Boolean(value);
    default:
      return value;
  }
};

export const Playground = fixedForwardRef(function Playground<
  TSectionsProps extends Record<string, object>,
>(
  props: IPlaygroundProps<TSectionsProps>,
  forwardedRef?: React.Ref<HTMLDivElement>,
) {
  const {
    styles,
    sx,
    componentRenderer,
    defaultSections,
    initialProps,
    ...other
  } = props;

  const { combineStyles, getStyles, globalStyles } = useStyles({
    componentName: 'Playground',
    styles: [playgroundStyles, styles],
  });

  const [sections, setSections] = useState(defaultSections);

  const sectionsProps = Object.keys(sections).reduce(
    (sectionPropsAcc, sectionKey) => {
      const section = sections[sectionKey];
      const sectionProps = {
        ...initialProps?.[sectionKey],
        ...section.props,
        ...section.options.reduce((optionPropsAcc, option) => {
          if (
            option.modifiers?.disabled ||
            (!option.modifiers?.required && !option.modifiers?.on)
          ) {
            return {
              ...optionPropsAcc,
            };
          }

          return {
            ...optionPropsAcc,
            ...option.props,
            ...option.getProps?.({
              ...sectionPropsAcc,
              [sectionKey]: optionPropsAcc,
            }),
            ...(option.input?.value
              ? {
                  [option.input.targetProp]: option.input.getValue
                    ? option.input.getValue(option.input.value)
                    : convertValue(option.input.value, option.input.type),
                }
              : undefined),
          };
        }, {}),
      };

      return {
        ...sectionPropsAcc,
        [sectionKey]: {
          ...sectionProps,
          ...section.getProps?.({
            ...sectionPropsAcc,
            [sectionKey]: sectionProps,
          }),
        },
      };
    },
    {} as TSectionsProps,
  );

  return (
    <Base
      {...other}
      sx={[globalStyles, combineStyles('host'), sx]}
      ref={forwardedRef}
    >
      <div {...getStyles('componentPanel')}>
        <div {...getStyles('componentWrapper')}>
          {componentRenderer(sectionsProps)}
        </div>
      </div>

      <Density density={-2}>
        <div {...getStyles('optionsPanel')}>
          <PlaygroundSections<TSectionsProps>
            sections={sections}
            onSectionsChange={setSections}
            sectionsProps={sectionsProps}
          />
        </div>
      </Density>
    </Base>
  );
});
