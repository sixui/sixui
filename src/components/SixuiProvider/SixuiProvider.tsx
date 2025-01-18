import type { ISixuiProviderProps } from './SixuiProvider.types';
import { ThemeProvider } from '../ThemeProvider';
import { ResponsiveStyles } from './ResponsiveStyles';
import { ISixuiContextValue, SixuiContext } from './SixuiProvider.context';

export const SixuiProvider: React.FC<ISixuiProviderProps> = (props) => {
  const { children, settings, ...other } = props;
  const contextValue: ISixuiContextValue = {
    settings,
  };

  return (
    <SixuiContext.Provider value={contextValue}>
      <ThemeProvider {...other}>
        <ResponsiveStyles />
        {children}
      </ThemeProvider>
    </SixuiContext.Provider>
  );
};
