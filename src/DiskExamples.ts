import { Dirent, readdirSync } from 'fs';
import { FileData } from './FileData';

export function GetExamplesFromDisk(path: string, excludeFiles: string[], excludeDirs: string[]): FileData[] {
    let filesInDirectories: FileData[] = [];

    const dirs: Dirent[] = readdirSync(path, { withFileTypes: true });

    for (const element of dirs) {
        if (element.isDirectory()) {
            if (excludeDirs.some(e => e === path + element.name)) {
                console.log(`Folder excluded: ${path}${element.name}`);
                continue;
            }
            filesInDirectories = filesInDirectories.concat(GetExamplesFromDisk(`${path}${element.name}/`, excludeFiles, excludeDirs));
        } else {
            // Don't look for files that should be excluded
            if (!excludeFiles.some(e => e === element.name)) {
                // Make sure the file is an .rs file
                const elementNameSplit = element.name.split('.');
                if (elementNameSplit[elementNameSplit.length - 1] === 'rs') {
                    const result = path.split('/');
                    const name = elementNameSplit[0];
                    const category = result[result.length - 2];

                    const example: FileData = {
                        name,
                        fileName: element.name,
                        path: path + element.name,
                        category
                    };

                    filesInDirectories.push(example);
                }
            } else {
                console.log(`File excluded: ${path}${element.name}`);
            }
        }
    }

    return filesInDirectories;
}
