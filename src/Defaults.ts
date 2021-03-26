import { ITarget } from './Interfaces';
import { LinkStyle } from './LinkStyle';

export const defaultSource = './__tests__/testData/examples/';
export const defaultFileTypes = ['rs'];
export const defaultExcludeFiles = ['./__tests__/testData/examples/this_file_should_be_excluded.rs'];
export const defaultExcludeFolders = ['./__tests__/testData/examples/excludefolder', './__tests__/testData/examples/ios'];

export const defaultTargets: ITarget[] = [
    { Path: './__tests__/testData/examples/README.md', Style: LinkStyle.Markdown },
    { Path: './__tests__/testData/Cargo.toml', Style: LinkStyle.TOML_Path_Value }
];
