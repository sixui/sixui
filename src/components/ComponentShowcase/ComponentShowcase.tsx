import type { IComponentShowcaseThemeFactory } from './ComponentShowcase.css';
import type {
  IComponentPresentation,
  IComponentShowcaseFactory,
} from './ComponentShowcase.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Box } from '../Box';
import { componentShowcaseTheme } from './ComponentShowcase.css';

const COMPONENT_NAME = 'ComponentShowcase';
const DUMMY_TEXT = '.';

export const makeComponentShowcase = <TComponentProps,>(
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
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const { getStyles } = useComponentTheme<IComponentShowcaseThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      theme: componentShowcaseTheme,
      variant,
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
        {...other}
        {...getStyles(['root', 'cols', 'gap$md'])}
        ref={forwardedRef}
      >
        {shouldShowRowLegends && rowLegendPosition === 'start' ? (
          <div {...getStyles(['rows', 'gap$lg'])}>
            {shouldShowColLegends ? (
              <div {...getStyles(['legendText', 'invisible'])} aria-hidden>
                {DUMMY_TEXT}
              </div>
            ) : null}

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
        ) : null}

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
                  {shouldShowColLegends && groupIndex === 0 ? (
                    <div
                      {...getStyles(['legendText', !col.legend && 'invisible'])}
                    >
                      {col.legend ?? DUMMY_TEXT}
                    </div>
                  ) : null}

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
                        row.legend ? (
                          <div {...getStyles('legendText')}>{row.legend}</div>
                        ) : null}

                        <div
                          {...getStyles([
                            'flex',
                            'cols',
                            'gap$md',
                            `align$${verticalAlign}`,
                          ])}
                        >
                          <Component
                            {...componentProps}
                            {...group.props}
                            {...col.props}
                            {...row.props}
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

        {shouldShowGroupLegends ? (
          <div {...getStyles(['rows', 'gap$lg'])}>
            {shouldShowColLegends ? (
              <div {...getStyles(['legendText', 'invisible'])} aria-hidden>
                {DUMMY_TEXT}
              </div>
            ) : null}

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
        ) : null}
      </Box>
    );
  });

  ComponentShowcase.theme = componentShowcaseTheme;
  ComponentShowcase.displayName = `@sixui/${COMPONENT_NAME}`;

  return ComponentShowcase;
};
