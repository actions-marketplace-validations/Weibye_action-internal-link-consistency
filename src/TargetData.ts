import { Config } from './Config';
import { FileDetails } from './FileDetails';
import { ITarget, ITargetData } from './Interfaces';
import { ReadFileFromPath } from './IoOperations';
import { LinkStyle } from './LinkStyle';

export function GetTargetData(target: ITarget, config: Config): ITargetData[] {
    // console.log(`Getting data from: ${target.Path}`);
    let output: ITargetData[] = [];

    // Read the contents of the file
    const content = ReadFileFromPath(target.Path);
    if (content.length <= 0) return [];

    let pattern: RegExp;
    let matches: IterableIterator<RegExpMatchArray>;

    const preProcessor: { Orig: string, Link: string, Target: ITarget }[] = []

    switch (target.Style) {
        case LinkStyle.Markdown:
            pattern = /\[([^\[]+)\]\(([^\)]+)\)/gm;
            matches = content.matchAll(pattern);
            for (const match of matches) {
                preProcessor.push({ Orig: match[0], Link: match[2], Target: target });
            }
            break;

        case LinkStyle.TOML_Path_Value:
            pattern = /^path\s=\s"(.*)"$/gm;
            matches = content.matchAll(pattern);
            for (const match of matches) {
                preProcessor.push({ Orig: match[0], Link: match[1], Target: target });
            }
            break;
        default:
            throw new Error('No Style defined');
    }

    for (const data of preProcessor) {
        if (!ExcludeLink(data.Link)) {
            const rootPath = GetRootPath(data.Target.Path, data.Link);
            output.push({
                Details: new FileDetails(rootPath),
                RelativePath: data.Link,
                OriginalMatch: data.Orig,
                ParentFile: data.Target
            });
        }
    }
    return output;
}

function ExcludeLink(link: string) : boolean {
    // external links
    const webLinks = /^https*:\/\//gm;
    const webResult = webLinks.exec(link);
    if (webResult !== null) return true;

    const markdownSection = /^#/gm;
    const sectionResult = markdownSection.exec(link);
    if (sectionResult !== null) return true;

    return false;
}



function GetRootPath(targetPath: string, filePath: string): string {
    // Source goes from root -> document
    // Target goes from document -> file
    const targetPattern = /^(.+\/)/gm;
    const rootToTarget = Array.from(targetPath.matchAll(targetPattern))[0][1];

    // If prefixed with './' remove it.
    const filePattern = /^(.\/)*(.*)$/gm;
    const TargetToFile = Array.from(filePath.matchAll(filePattern))[0][2];

    return `${rootToTarget}${TargetToFile}`;
}

// function IsValidRelativePath(path: string): boolean {
//     const relative = /^\.\//gm;
//     return relative.exec(path) !== null;
// }


