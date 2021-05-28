import { Dirent, readdirSync } from 'fs';
import { join } from 'path';
import { Config } from '../Config';
import { FileDetails } from '../FileDetails';
import { IncludeFile, IncludeFolder } from '../InclusionController';

export class SourceDataCollector {
    public FileDetails: FileDetails[];

    public constructor(config: Config) {
        this.FileDetails = this.GetSourceData(config.Source, config);
    }

    private GetSourceData(path: string, config: Config): FileDetails[] {
        let files: FileDetails[] = [];
        const dirs: Dirent[] = readdirSync(path, { withFileTypes: true });

        for (const element of dirs) {
            const elementPath = join(path, element.name);

            if (element.isDirectory()) {
                if (IncludeFolder(elementPath, config)) {
                    files = files.concat(this.GetSourceData(elementPath, config));
                }
            } else {
                const fileDetails = new FileDetails(elementPath);
                // Only check files that are whitelisted and not excluded
                if (IncludeFile(fileDetails, config)) {
                    files.push(fileDetails);
                }
            }
        }
        return files;
    }
}
