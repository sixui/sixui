import {
  getResponsiveRules,
  type IResponsiveRule,
} from '~/helpers/getResponsiveRules';
import { useThemeContext } from '../Theme';

const serializeResponsiveRule = (rule: IResponsiveRule): string => `
    @media ${rule.query} {
      body {
        container-type: inline-size;
        container-name: ${rule.containerNames.join(' ')};
      }
    }
  `;

const serializeResponsiveRules = (rules: Array<IResponsiveRule>): string => {
  const sortedRules = rules.sort(
    (ruleA, ruleB) => ruleA.minWidth - ruleB.minWidth,
  );

  return sortedRules.map(serializeResponsiveRule).join('\n');
};

export const ResponsiveStyles: React.FC = () => {
  const { theme } = useThemeContext();

  const rules = getResponsiveRules(theme.windowSizeClasses);
  const serializedRules = serializeResponsiveRules(rules);

  return (
    <style
      type='text/css'
      dangerouslySetInnerHTML={{ __html: serializedRules }}
    />
  );
};
