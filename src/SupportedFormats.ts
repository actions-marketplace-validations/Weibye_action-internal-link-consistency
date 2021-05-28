import { ISupportedFormat } from './Interfaces';

export const SupportedFormats: ISupportedFormat[] = [
    {
        Ext: '.md',
        Pattern: /^(?!<!--).*\[[^[]+\]\(([^)]+)\)/gm
    },
    {
        Ext: '.toml',
        Pattern: /^(?!#).*path\s=\s"(.*)"$/gm
    }
];
