import { Dirent, readdirSync } from 'fs';
import { Config } from './Config';
import { FileDetails } from './FileDetails';
import { IncludeFile, IncludeFolder } from './InclusionController';

export function GetSourceData(path: string, config: Config): FileDetails[] {
    let files: FileDetails[] = [];

    const dirs: Dirent[] = readdirSync(path, { withFileTypes: true });

    for (const element of dirs) {
        if (element.isDirectory()) {
            if (IncludeFolder(path+element.name, config)) {
                files = files.concat(GetSourceData(`${path}${element.name}/`, config));
            } else {
                console.log(`Folder excluded: ${path}${element.name}`);
            }
        } else {
            const fileDetails = new FileDetails(path + element.name);
            // Only check files that are whitelisted and not excluded
            if (IncludeFile(fileDetails, config)) {
                files.push(fileDetails);
            }
        }
    }

    return files;
}
