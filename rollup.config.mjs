import path from 'path';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import image from '@rollup/plugin-image';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import terser from '@rollup/plugin-terser';
import tsConfigPaths from 'rollup-plugin-tsconfig-paths';

import packageJson from './package.json' assert { type: "json" };
import {dts} from "rollup-plugin-dts";
const isProduction = process.env.NODE_ENV === 'production';

export default ([{
    input: 'src/index.tsx',
    output: [
        {
            file: packageJson.main,
            format: 'cjs',
            sourcemap: true,
        },
        {
            file: packageJson.module,
            format: 'esm',
            sourcemap: true,
        },
    ],
    external: [
        ...Object.keys(packageJson.dependencies || {}),
        ...Object.keys(packageJson.peerDependencies || {})
    ],
    plugins: [
        peerDepsExternal(),
        tsConfigPaths(),
        image({
            extensions: /\.(png|jpg|jpeg|gif|svg)$/,
            limit: 10000,
        }),
        resolve({
            extensions: ['.tsx', '.ts', '.jsx', '.js', '.mjs', '.json'],
            browser: true,
        }),
        commonjs(),
        typescript(),
        postcss({
            extensions: ['.css'],
        }),
        isProduction && terser(),
    ],
}, {
    input: 'dist/types/index.d.ts',
    output: { file: packageJson.types, format: "es" },
    plugins: [
        dts(),
    ],
}]);
