import { ITarget } from './Interfaces';

export class Config {
    public Source: string;
    public WhitelistFileTypes: string[];
    public ExcludeFolders: string[];
    public ExcludeFiles: string[];
    public Targets: ITarget[];

    public constructor(source: string, whitelistFileTypes: string[], excludeFolders: string[], excludeFiles: string[], targets: ITarget[]) {
        this.Source = source;
        this.WhitelistFileTypes = whitelistFileTypes;
        this.ExcludeFolders = excludeFolders;
        this.ExcludeFiles = excludeFiles;

        this.Targets = targets;
    }

    /**
     * ToString
     */
    public ToString(): string {
        let output = '';
        output += `\tSource: ${this.Source}\n`;
        output += `\tFileTypes: ${this.WhitelistFileTypes}\n`;
        output += `\tExcludeFolders: ${this.ExcludeFolders}\n`;
        output += `\tExcludeFiles: ${this.ExcludeFiles}\n`;
        for (const target of this.Targets) {
            output += `\tTarget: ${target.Path} | ${target.Style}\n`;
        }
        return output;
    }
}
