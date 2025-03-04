import { globalLayer } from '@vanilla-extract/css';

export const cssLayers = {
  reset: globalLayer('sixui-reset'),
  base: globalLayer('sixui-base'),
  theme: globalLayer('sixui-theme'),
  components: globalLayer('sixui-components'),
  sprinkles: globalLayer('sixui-sprinkles'),
};
