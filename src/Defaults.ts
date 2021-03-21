import { ITarget } from './Interfaces';
import { LinkStyle } from './LinkStyle';

export const defaultSource = './__tests__/testData/examples/';
export const defaultFileTypes = ['rs', 'ico'];
export const defaultExcludeFiles = ['./__tests__/testData/examples/also_decoy.rs'];
export const defaultExcludeFolders = ['./__tests__/testData/examples/decoy', './__tests__/testData/examples/excludefolder'];

export const defaultTargets: ITarget[] = [
    { Path: './__tests__/testData/examples/README.md', Style: LinkStyle.Markdown },
    { Path: './__tests__/testData/Cargo.toml', Style: LinkStyle.TOML_Path_Value }
];
