import { Config } from './Config';
import { FileDetails } from './FileDetails';
import { ITarget, ITargetData } from './Interfaces';
import { ReadFileFromPath } from './IoOperations';
import { LinkStyle } from './LinkStyle';

export function GetTargetData(target: ITarget, config: Config): ITargetData[] {
    console.log(`Getting data from: ${target.Path}`);
    let output: ITargetData[] = [];

    // Read the contents of the file
    const content = ReadFileFromPath(target.Path);
    if (content.length <= 0) return [];

    let pattern: RegExp;
    let matches: IterableIterator<RegExpMatchArray>;

    switch (target.Style) {
        case LinkStyle.Markdown:
            pattern = /\[([^\[]+)\]\(([^\)]+)\)/gm;
            matches = content.matchAll(pattern);
            for (const match of matches) {
                const link = match[2];
                const orig = match[0];
                if (IsValidRelativePath(link)) {
                    const rootPath = GetRootPath(target.Path, link);
                }
            }

        case LinkStyle.TOML_Path_Value:
            pattern = /^path\s=\s"(.*)"$/gm;
            matches = content.matchAll(pattern);
            for (const match of matches) {
                const link = match[1];
                
                const orig = match[0];
                const rootPath = GetRootPath(target.Path, link);
                console.log(`Target: ${target.Path} \nLink: ${link}\nRoot: ${rootPath}`);
                // if ()
            }


        // default:
        //     return new RegExp(/.*/gm);
    }



    // const pattern = GetRelativePath(target.Style);

    // const matches = content.matchAll(pattern);

    for (const match of matches) {

        const link = match[2];
        console.log(match);
        if (link === null || link === undefined) continue;

        if (IsValidRelativePath(link)) {
            const rootPath = GetRootPath(target.Path, link);
            const fileDetails = new FileDetails(rootPath);
            // console.log(fileDetails);
            const targetData: ITargetData = {
                Details: fileDetails,
                RelativePath: link,
                OriginalMatch: match[0],
                ParentFile: target
            };
            output.push(targetData);
        }
    }

    return output;
}

// function GetRelativePath(inputContent: string, style: LinkStyle): { relativePath: string, originalMath: string } {
//     /* eslint-disable no-useless-escape */
//     switch (style) {
//         case LinkStyle.Markdown:

//             return /\[([^\[]+)\]\(([^\)]+)\)/gm;
//         case LinkStyle.TOML_Path_Value:
//             return new RegExp(/^path\s=\s"(.*)"$/gm);
//         default:
//             return new RegExp(/.*/gm);
//     }
//     /* eslint-enable no-useless-escape */
// }

function GetRootPath(fromRootPath: string, relativePath: string): string {
    /* eslint-disable no-useless-escape */
    const relPattern = /^\.\/(.*)$/gm;
    const firstPartPattern = /^(.+)\//gm;
    /* eslint-enable no-useless-escape */
    const result = relPattern.exec(relativePath);
    if (result === null) return '';

    const result2 = firstPartPattern.exec(fromRootPath);
    if (result2 === null) return '';

    const absolutePath = `${result2[1]}/${result[1]}`;

    return absolutePath;
}

function IsValidRelativePath(path: string): boolean {
    const relative = /^\.\//gm;
    return relative.exec(path) !== null;
}


