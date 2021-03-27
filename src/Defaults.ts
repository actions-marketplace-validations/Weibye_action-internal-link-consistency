import { ITarget } from './Interfaces';
import { LinkStyle } from './LinkStyle';

export const defaultSource = './__tests__/validData/data/';
export const defaultFileTypes = ['test'];
export const defaultExcludeFiles = ['./__tests__/validData/data/should_be_ignored.test'];
export const defaultExcludeFolders = ['./__tests__/validData/data/ignorefolder'];

export const defaultTargets: ITarget[] = [
    { Path: './__tests__/validData/ValidReadme.md', Style: LinkStyle.Markdown },
    { Path: './__tests__/validData/ValidToml.toml', Style: LinkStyle.TOML_Path_Value }
];
