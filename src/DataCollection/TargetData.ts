import { join } from 'path';
import { Config } from '../Config';
import { FileDetails } from '../FileDetails';
import { ExcludeFile } from '../InclusionController';
import { ITarget, ITargetData, ITargetOutput } from '../Interfaces';
import { ReadFileFromPath } from '../IoOperations';

export class TargetDataCollector {
    public TargetData: ITargetOutput[];

    public constructor(config: Config) {
        this.TargetData = [];

        for (const target of config.Targets) {
            const data = this.GetTargetData(target, config);
            if (data.length >= 0) {
                this.TargetData.push({ Target: target.FullPath, Data: data });
            }
        }
    }

    private GetTargetData(target: ITarget, config: Config): ITargetData[] {
        const output: ITargetData[] = [];

        // Read the contents of the file
        const content = ReadFileFromPath(target.FullPath);
        if (content.length <= 0) return [];

        const preProcessor: { Orig: string; Link: string; Target: ITarget; Line: number }[] = [];
        const matches = content.matchAll(target.Pattern);

        // Scan through the document and parse any links contained therein
        for (const match of matches) {
            if (match.index === undefined) {
                throw new Error('Could not index of match. Something is wrong somewhere');
            } else {
                preProcessor.push({ Orig: match[0], Link: match[1], Target: target, Line: GetLineNr(content, match.index) });
            }
        }

        // Parse through the links
        for (const data of preProcessor) {
            if (this.IgnoreLink(data.Link)) {
                continue;
            } else {
                const rootPath = join(data.Target.Dir, data.Link);
                if (!ExcludeFile(rootPath, config.ExcludeFiles, config.ExcludeFolders)) {
                    output.push({
                        Details: new FileDetails(rootPath),
                        RelativePath: data.Link,
                        OriginalMatch: data.Orig,
                        ParentFile: data.Target,
                        LineNr: data.Line
                    });
                }
            }
        }
        return output;
    }

    private IgnoreLink(link: string): boolean {
        return this.WebLink(link) || this.DocLink(link);
    }
    private InTargetScope(path: string, scope: string): boolean {
        return path.includes(scope);
    }

    private WebLink(link: string): boolean {
        const webLinks = /^https*:\/\//gm;
        return webLinks.exec(link) !== null;
    }

    private DocLink(link: string): boolean {
        const docLink = /^#/gm;
        return docLink.exec(link) !== null;
    }
}

function GetLineNr(content: string, charIndex: number): number {
    const subString = content.substring(0, charIndex);
    return subString.split('\n').length;
}
