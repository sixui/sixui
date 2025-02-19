import type { IComponentShowcaseThemeFactory } from './ComponentShowcase.css';
import type {
  IComponentPresentation,
  IComponentShowcaseFactory,
} from './ComponentShowcase.types';
import { Box } from '~/components/Box';
import { useComponentTheme, useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { deepMerge } from '~/utils/deepMerge';
import { COMPONENT_NAME } from './ComponentShowcase.constants';
import { componentShowcaseTheme } from './ComponentShowcase.css';

const DUMMY_TEXT = '.';

export const componentShowcaseFactory = <TComponentProps extends object>(
  component: React.FC<TComponentProps>,
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
) => {
  const ComponentShowcase = componentFactory<
    IComponentShowcaseFactory<TComponentProps>
  >((props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      props: componentProps,
      groups,
      cols,
      rows,
      horizontalAlign = 'center',
      verticalAlign = 'end',
      rowLegendPosition = 'start',
      fullWidth,
      propsCombinationStrategy = 'replace',
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const { getStyles } = useComponentTheme<IComponentShowcaseThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: componentShowcaseTheme,
    });

    const shouldShowRowLegends = rows?.some(({ legend }) => !!legend);
    const shouldShowColLegends = cols?.some(({ legend }) => !!legend);
    const shouldShowGroupLegends = groups?.some(({ legend }) => !!legend);

    const placeholder: IComponentPresentation = {};
    const nonEmptyGroups = groups ?? [placeholder];
    const nonEmptyCols = cols ?? [placeholder];
    const nonEmptyRows = rows ?? [placeholder];

    return (
      <Box
        {...getStyles(['root', 'cols', 'gap$md'])}
        ref={forwardedRef}
        {...other}
      >
        {shouldShowRowLegends && rowLegendPosition === 'start' && (
          <div {...getStyles(['rows', 'gap$lg'])}>
            {shouldShowColLegends && (
              <div {...getStyles(['legendText', 'invisible'])} aria-hidden>
                {DUMMY_TEXT}
              </div>
            )}

            <div {...getStyles(['flex', 'groupRows'])}>
              {nonEmptyGroups.map((_, groupIndex) => (
                <div
                  {...getStyles(['flex', 'rows', 'gap$lg'])}
                  key={`$legend-${groupIndex}`}
                >
                  {nonEmptyRows.map((row, rowIndex) => (
                    <div
                      {...getStyles([
                        'flex',
                        'legendRow',
                        'justifyEnd',
                        'textRight',
                        'legendText',
                        !row.legend && 'invisible',
                      ])}
                      key={`$legend-${groupIndex}-${rowIndex}`}
                    >
                      {row.legend ?? DUMMY_TEXT}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        <div
          {...getStyles(['cols', 'gap$md', 'align$start', fullWidth && 'flex'])}
        >
          {nonEmptyCols.map((col, colIndex) => (
            <div
              {...getStyles(['groupRows', fullWidth && 'flex'])}
              key={colIndex}
            >
              {nonEmptyGroups.map((group, groupIndex) => (
                <div
                  key={`${colIndex}-${groupIndex}`}
                  {...getStyles([
                    'rows',
                    'gap$lg',
                    `align$${horizontalAlign}`,
                    'flex',
                  ])}
                >
                  {shouldShowColLegends && groupIndex === 0 && (
                    <div
                      {...getStyles(['legendText', !col.legend && 'invisible'])}
                    >
                      {col.legend ?? DUMMY_TEXT}
                    </div>
                  )}

                  {nonEmptyRows.map((row, rowIndex) => {
                    const Component =
                      row.component ??
                      col.component ??
                      group.component ??
                      component;
                    const hidden =
                      row.hiddenIndexes?.includes(colIndex) ?? false;

                    return (
                      <div
                        key={`${colIndex}-${groupIndex}-${rowIndex}`}
                        {...getStyles([
                          'flex',
                          'rows',
                          fullWidth && 'w100',
                          hidden && 'invisible',
                        ])}
                      >
                        {shouldShowRowLegends &&
                          rowLegendPosition === 'top' &&
                          row.legend && (
                            <div {...getStyles('legendText')}>{row.legend}</div>
                          )}

                        <div
                          {...getStyles([
                            'flex',
                            'cols',
                            'gap$md',
                            `align$${verticalAlign}`,
                          ])}
                        >
                          <Component
                            {...(propsCombinationStrategy === 'merge'
                              ? deepMerge(
                                  componentProps,
                                  group.props,
                                  col.props,
                                  row.props,
                                )
                              : {
                                  ...componentProps,
                                  ...group.props,
                                  ...col.props,
                                  ...row.props,
                                })}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          ))}
        </div>

        {shouldShowGroupLegends && (
          <div {...getStyles(['rows', 'gap$lg'])}>
            {shouldShowColLegends && (
              <div {...getStyles(['legendText', 'invisible'])} aria-hidden>
                {DUMMY_TEXT}
              </div>
            )}

            <div {...getStyles(['flex', 'groupRows'])}>
              {nonEmptyGroups.map((group, groupIndex) => (
                <div
                  {...getStyles(['flex', 'rows', 'gap$lg'])}
                  key={`$legend-${groupIndex}`}
                >
                  <div
                    {...getStyles([
                      'flex',
                      'legendRow',
                      'justifyStart',
                      'legendText',
                      'leftBorder',
                      !group.legend && 'invisible',
                    ])}
                    key={`$legend-${groupIndex}`}
                  >
                    {group.legend ?? DUMMY_TEXT}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Box>
    );
  });

  ComponentShowcase.theme = componentShowcaseTheme;
  ComponentShowcase.displayName = `@sixui/core/${COMPONENT_NAME}`;

  return ComponentShowcase;
};
