import { Config } from './Config';
import { FileDetails } from './FileDetails';

export function IncludeFile(fileDetails: FileDetails, config: Config): boolean {
    return !ExcludeFile(fileDetails.SourcePath, config.ExcludeFiles) && WhitelistedType(fileDetails.Extension, config.WhitelistFileTypes);
}

export function IncludeFolder(path: string, config: Config): boolean {
    return !ExcludeDirectory(path, config.ExcludeFolders);
}

function WhitelistedType(extension: string, types: string[]): boolean {
    if (types.length < 1) return true;

    return types.some(e => e === extension);
}

function ExcludeFile(filePath: string, excludeFiles: string[]): boolean {
    return excludeFiles.some(e => e === filePath);
}

function ExcludeDirectory(dirPath: string, excludeDirs: string[]): boolean {
    return excludeDirs.some(e => e === dirPath);
}
