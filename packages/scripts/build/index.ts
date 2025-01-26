import { loadCompilerOptions } from './loadCompilerOptions';

const x = loadCompilerOptions('./tsconfig.eslint.json');
console.log('___X', x);
