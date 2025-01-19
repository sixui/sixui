import { getResponsiveRules } from '~/helpers/getResponsiveRules';
import { useWindowSizeClass } from '~/hooks/useWindowSizeClass';
import { useThemeContext } from '../ThemeProvider';

// FIXME:
export const ResponsiveStyles: React.FC = () => {
  const { theme } = useThemeContext();
  const windowSizeClass = useWindowSizeClass();
  const rules = getResponsiveRules(theme.windowSizeClasses);
  console.log('___________rules', windowSizeClass);

  return undefined;

  return <style type="text/css" dangerouslySetInnerHTML={{ __html: rules }} />;
};
