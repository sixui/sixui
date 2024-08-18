import stylex from '@stylexjs/stylex';
import { appShellTokens } from '../AppShell.stylex';

export type IAppShellAsideStylesKey = keyof typeof appShellAsideStyles;
export const appShellAsideStyles = stylex.create({
  host: {
    height: '100vh',
    width: `min(${appShellTokens.asideWidth}, ${appShellTokens.asideMaxWidth})`,
    flexShrink: 0,
    position: 'sticky',
    top: 0,
  },
  aside: {
    height: '100%',
    width: `min(${appShellTokens.asideWidth}, ${appShellTokens.asideMaxWidth})`,
  },
});
