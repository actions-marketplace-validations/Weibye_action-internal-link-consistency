import { IRegFormat } from './Interfaces';

export const SupportedFormats: IRegFormat[] = [
    {
        Extension: 'md',
        Pattern: /^(?!<!--).*\[[^[]+\]\(([^)]+)\)/gm
    },
    {
        Extension: 'toml',
        Pattern: /^(?!#).*path\s=\s"(.*)"$/gm
    }
];
