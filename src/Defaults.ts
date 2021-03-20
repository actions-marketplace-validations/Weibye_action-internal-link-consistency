import { ITarget } from './Interfaces';
import { LinkMarkdown } from './LinkStyle';

export const defaultSource = '__tests__/testData/examples/';
export const defaultFileTypes = ['rs', 'ico'];
export const defaultExcludeFiles = ['__tests__/testData/examples/also_decoy.rs'];
export const defaultExcludeFolders = ['__tests__/testData/examples/decoy', '__tests__/testData/examples/excludefolder'];

export const defaultTargets: ITarget[] = [{ Path: '__tests__/testData/examples/README.md', Style: LinkMarkdown.Markdown }];
