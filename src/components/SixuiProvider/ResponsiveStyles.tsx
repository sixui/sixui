import { getResponsiveRules } from '~/helpers/getResponsiveRules';
import { useThemeContext } from '../ThemeProvider';

export const ResponsiveStyles: React.FC = () => {
  const { theme } = useThemeContext();
  const rules = getResponsiveRules(theme.windowSizeClasses);

  return <style type="text/css" dangerouslySetInnerHTML={{ __html: rules }} />;
};
