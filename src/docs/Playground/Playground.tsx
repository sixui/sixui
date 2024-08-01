import { useMemo, useState } from 'react';

import type { IPlaygroundProps } from './Playground.types';
import { stylesCombinatorFactory } from '~/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '~/helpers/stylePropsFactory';
import { useComponentTheme } from '~/hooks/useComponentTheme';
import { fixedForwardRef } from '~/helpers/fixedForwardRef';
import { playgroundStyles } from './Playground.styles';
import { PlaygroundSections } from './PlaygroundSections';

export const Playground = fixedForwardRef(function Playground<
  TSectionsProps extends Record<string, object>,
>(
  props: IPlaygroundProps<TSectionsProps>,
  forwardedRef?: React.Ref<HTMLDivElement>,
) {
  const { styles, sx, componentRenderer, defaultSections, ...other } = props;

  const componentTheme = useComponentTheme('Playground');
  const stylesCombinator = useMemo(
    () => stylesCombinatorFactory(playgroundStyles, styles),
    [styles],
  );
  const sxf = useMemo(
    () => stylePropsFactory(stylesCombinator),
    [stylesCombinator],
  );

  const [sections, setSections] = useState(defaultSections);

  const sectionsProps = Object.keys(sections).reduce((acc, sectionKey) => {
    const section = sections[sectionKey];

    return {
      ...acc,
      [sectionKey]: section.options.reduce((acc, option) => {
        if (option.modifiers?.disabled || option.modifiers?.off) {
          return acc;
        }

        return {
          ...acc,
          ...section.props,
          ...option.props,
          ...(option.input
            ? { [option.input.targetProp]: option.input.value }
            : undefined),
        };
      }, {}),
    };
  }, {} as TSectionsProps);

  return (
    <div
      {...sxf(componentTheme.overridenStyles, 'host', sx)}
      {...other}
      ref={forwardedRef}
    >
      <div {...sxf('componentPanel')}>
        <div {...sxf('componentWrapper')}>
          {componentRenderer(sectionsProps)}
        </div>
      </div>

      <div {...sxf(stylesCombinator('optionsPanel'))}>
        <PlaygroundSections<TSectionsProps>
          sections={sections}
          onSectionsChange={setSections}
          sectionsProps={sectionsProps}
        />
      </div>
    </div>
  );
});
