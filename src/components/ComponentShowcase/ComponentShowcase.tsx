import type {
  IComponentPresentation,
  IComponentShowcaseProps,
} from './ComponentShowcase.types';
import { useStyles } from '~/hooks/useStyles';
import { Base } from '../Base';
import { componentShowcaseTheme } from './ComponentShowcase.stylex';
import { componentShowcaseStyles } from './ComponentShowcase.styles';

const DUMMY_TEXT = '.';

export const ComponentShowcase = <
  TComponentProps extends object = Record<string, never>,
>(
  props: IComponentShowcaseProps<TComponentProps>,
): React.ReactNode => {
  const {
    styles,
    sx,
    component,
    props: componentProps,
    groups,
    cols,
    rows,
    horizontalAlign = 'center',
    verticalAlign = 'end',
    rowLegendPosition = 'start',
    fullWidth,
  } = props;

  const { combineStyles, getStyles, globalStyles } = useStyles({
    name: 'ComponentShowcase',
    styles: [componentShowcaseStyles, styles],
  });

  const shouldShowRowLegends = rows?.some(({ legend }) => !!legend);
  const shouldShowColLegends = cols?.some(({ legend }) => !!legend);
  const shouldShowGroupLegends = groups?.some(({ legend }) => !!legend);

  const placeholder: IComponentPresentation<TComponentProps> = {};
  const nonEmptyGroups = groups ?? [placeholder];
  const nonEmptyCols = cols ?? [placeholder];
  const nonEmptyRows = rows ?? [placeholder];

  return (
    <Base
      sx={[
        componentShowcaseTheme,
        globalStyles,
        combineStyles('host', 'cols', 'gap$md'),
        sx,
      ]}
    >
      {shouldShowRowLegends && rowLegendPosition === 'start' ? (
        <div {...getStyles('rows', 'gap$lg')}>
          {shouldShowColLegends ? (
            <div {...getStyles('legend', 'invisible')} aria-hidden>
              {DUMMY_TEXT}
            </div>
          ) : null}

          <div {...getStyles('flex', 'groupRows')}>
            {nonEmptyGroups.map((_, groupIndex) => (
              <div
                {...getStyles('flex', 'rows', 'gap$lg')}
                key={`$legend-${groupIndex}`}
              >
                {nonEmptyRows.map((row, rowIndex) => (
                  <div
                    {...getStyles(
                      'flex',
                      'legendRow',
                      'justifyEnd',
                      'textRight',
                      'legend',
                      !row.legend && 'invisible',
                    )}
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

      <div {...getStyles('cols', 'gap$md', 'align$start', fullWidth && 'flex')}>
        {nonEmptyCols.map((col, colIndex) => (
          <div {...getStyles('groupRows', fullWidth && 'flex')} key={colIndex}>
            {nonEmptyGroups.map((group, groupIndex) => (
              <div
                key={`${colIndex}-${groupIndex}`}
                {...getStyles(
                  'rows',
                  'gap$lg',
                  `align$${horizontalAlign}`,
                  'flex',
                )}
              >
                {shouldShowColLegends && groupIndex === 0 ? (
                  <div {...getStyles('legend', !col.legend && 'invisible')}>
                    {col.legend ?? DUMMY_TEXT}
                  </div>
                ) : null}

                {nonEmptyRows.map((row, rowIndex) => {
                  const Component =
                    row.component ??
                    col.component ??
                    group.component ??
                    component;
                  const hidden = row.hiddenIndexes?.includes(colIndex) ?? false;

                  return (
                    <div
                      key={`${colIndex}-${groupIndex}-${rowIndex}`}
                      {...getStyles(
                        'flex',
                        'rows',
                        fullWidth && 'w100',
                        hidden && 'invisible',
                      )}
                    >
                      {shouldShowRowLegends &&
                      rowLegendPosition === 'top' &&
                      row.legend ? (
                        <div {...getStyles('legend')}>{row.legend}</div>
                      ) : null}

                      <div
                        {...getStyles(
                          'flex',
                          'cols',
                          'gap$md',
                          `align$${verticalAlign}`,
                        )}
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
        <div {...getStyles('rows', 'gap$lg')}>
          {shouldShowColLegends ? (
            <div {...getStyles('legend', 'invisible')} aria-hidden>
              {DUMMY_TEXT}
            </div>
          ) : null}

          <div {...getStyles('flex', 'groupRows')}>
            {nonEmptyGroups.map((group, groupIndex) => (
              <div
                {...getStyles('flex', 'rows', 'gap$lg')}
                key={`$legend-${groupIndex}`}
              >
                <div
                  {...getStyles(
                    'flex',
                    'legendRow',
                    'justifyStart',
                    'legend',
                    'leftBorder',
                    !group.legend && 'invisible',
                  )}
                  key={`$legend-${groupIndex}`}
                >
                  {group.legend ?? DUMMY_TEXT}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </Base>
  );
};
