import type { ISixuiProviderProps } from './SixuiProvider.types';
import { Responsive } from '~/components/Responsive';
import { ThemeProvider } from '~/components/ThemeProvider';
import { ISixuiContextValue, SixuiContext } from './SixuiProvider.context';

export const SixuiProvider: React.FC<ISixuiProviderProps> = (props) => {
  const { children, settings, ...other } = props;
  const contextValue: ISixuiContextValue = {
    settings,
  };

  return (
    <SixuiContext.Provider value={contextValue}>
      <ThemeProvider stylesTarget={document.body} {...other}>
        <Responsive>{children}</Responsive>
      </ThemeProvider>
    </SixuiContext.Provider>
  );
};
