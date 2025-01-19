import type { ISixuiProviderProps } from './SixuiProvider.types';
import { Responsive } from '../Responsive';
import { ThemeProvider } from '../ThemeProvider';
import { ISixuiContextValue, SixuiContext } from './SixuiProvider.context';

export const SixuiProvider: React.FC<ISixuiProviderProps> = (props) => {
  const { children, settings, ...other } = props;
  const contextValue: ISixuiContextValue = {
    settings,
  };

  return (
    <SixuiContext.Provider value={contextValue}>
      <ThemeProvider {...other}>
        <Responsive id="sixui-root">{children}</Responsive>
      </ThemeProvider>
    </SixuiContext.Provider>
  );
};
