import type { ISixuiProviderProps } from './SixuiProvider.types';
import { LayersProvider } from '~/components/Layers';
import { Responsive } from '~/components/Responsive';
import { ThemeProvider } from '~/components/Theme';
import { ISixuiContextValue, SixuiContext } from './SixuiProvider.context';

export const SixuiProvider: React.FC<ISixuiProviderProps> = (props) => {
  const { children, settings, ...other } = props;
  const contextValue: ISixuiContextValue = {
    settings,
  };

  return (
    <SixuiContext.Provider value={contextValue}>
      <ThemeProvider stylesTarget={document.documentElement} {...other}>
        <LayersProvider>
          <Responsive>{children}</Responsive>
        </LayersProvider>
      </ThemeProvider>
    </SixuiContext.Provider>
  );
};
