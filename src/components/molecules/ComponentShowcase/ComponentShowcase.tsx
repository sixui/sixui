import React from 'react';

import type { IContainer } from '@/helpers/Container';
import type {
  IComponentShowcaseStyleKey,
  IComponentShowcaseStyleVarKey,
} from './ComponentShowcase.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';

export type IComponentPropsWithLegend<IComponentProps> = Array<
  Partial<IComponentProps> & { $legend?: string }
>;

export interface IComponentShowcaseProps<IComponentProps>
  extends IContainer<
    IComponentShowcaseStyleKey,
    IComponentShowcaseStyleVarKey
  > {
  component: React.FC<IComponentProps>;
  props: IComponentProps;
  groupsProps?: IComponentPropsWithLegend<IComponentProps>;
  colsProps?: IComponentPropsWithLegend<IComponentProps>;
  rowsProps?: IComponentPropsWithLegend<IComponentProps>;
  align?: 'start' | 'center';
  fullWidth?: boolean;
}

const DUMMY_TEXT = '.';

export const ComponentShowcase = <IComponentProps extends object>({
  component: Component,
  props: componentProps,
  groupsProps = [{}],
  colsProps = [{}],
  rowsProps = [{}],
  align = 'center',
  fullWidth,
  ...props
}: IComponentShowcaseProps<IComponentProps>): React.ReactNode => {
  const { theme, styles } = useComponentTheme('ComponentShowcase');

  const styleProps = React.useMemo(
    () =>
      stylePropsFactory<
        IComponentShowcaseStyleKey,
        IComponentShowcaseStyleVarKey
      >(stylesCombinatorFactory(styles, props.styles)),
    [styles, props.styles],
  );

  const shouldShowRowLegends = rowsProps.some(({ $legend }) => !!$legend);
  const shouldShowColLegends = colsProps.some(({ $legend }) => !!$legend);
  const shouldShowGroupLegends = groupsProps.some(({ $legend }) => !!$legend);

  return (
    <div {...styleProps(['host', 'cols'], [theme, props.theme])}>
      {shouldShowRowLegends ? (
        <div {...styleProps(['rows'])}>
          {shouldShowColLegends ? (
            <div {...styleProps(['legend', 'invisible'])} aria-hidden='true'>
              {DUMMY_TEXT}
            </div>
          ) : null}

          <div {...styleProps(['flex', 'groupRows'])}>
            {groupsProps.map((groupProps, groupIndex) => (
              <div
                {...styleProps(['flex', 'rows'])}
                key={`$legend-${groupIndex}`}
              >
                {rowsProps.map(({ $legend: rowLegend }, rowIndex) => (
                  <div
                    {...styleProps([
                      'flex',
                      'legendRow',
                      'justifyEnd',
                      'textRight',
                      'legend',
                      !rowLegend && 'invisible',
                    ])}
                    key={`$legend-${groupIndex}-${rowIndex}`}
                  >
                    {rowLegend ?? DUMMY_TEXT}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <div {...styleProps(['cols', 'itemsStart', fullWidth && 'flex'])}>
        {colsProps.map(({ $legend: colLegend, ...colProps }, colIndex) => (
          <div
            {...styleProps(['groupRows', fullWidth && 'flex'])}
            key={colIndex}
          >
            {groupsProps.map((groupProps, groupIndex) => (
              <div
                key={`${colIndex}-${groupIndex}`}
                {...styleProps([
                  'rows',
                  align === 'start' ? 'itemsStart' : 'itemsCenter',
                  'flex',
                ])}
              >
                {shouldShowColLegends && groupIndex === 0 ? (
                  <div {...styleProps(['legend', !colLegend && 'invisible'])}>
                    {colLegend ?? DUMMY_TEXT}
                  </div>
                ) : null}

                {rowsProps.map((rowProps, rowIndex) => (
                  <div
                    key={`${colIndex}-${groupIndex}-${rowIndex}`}
                    {...styleProps([
                      'flex',
                      'cols',
                      'itemsEnd',
                      fullWidth && 'w100',
                    ])}
                  >
                    <Component
                      {...componentProps}
                      {...groupProps}
                      {...colProps}
                      {...rowProps}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>

      {shouldShowGroupLegends ? (
        <div {...styleProps(['rows'])}>
          <div {...styleProps(['legend', 'invisible'])} aria-hidden='true'>
            {DUMMY_TEXT}
          </div>

          <div {...styleProps(['flex', 'groupRows'])}>
            {groupsProps.map(({ $legend: groupLegend }, groupIndex) => (
              <div
                {...styleProps(['flex', 'rows'])}
                key={`$legend-${groupIndex}`}
              >
                <div
                  {...styleProps([
                    'flex',
                    'legendRow',
                    'justifyStart',
                    'legend',
                    'leftBorder',
                    !groupLegend && 'invisible',
                  ])}
                  key={`$legend-${groupIndex}`}
                >
                  {groupLegend ?? DUMMY_TEXT}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};
