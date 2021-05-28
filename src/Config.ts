import { existsSync } from 'fs';
import { isAbsolute, normalize } from 'path';
import { FileDetails } from './FileDetails';
import { ITarget, IFileDetails, ISupportedFormat } from './Interfaces';
import { SupportedFormats } from './SupportedFormats';

export class Config {
    public Source: string;
    public Targets: ITarget[];

    public FileTypes: string[];
    public SupportedFormats: ISupportedFormat[];

    public ExcludeFolders: string[];
    public ExcludeFiles: string[];

    public constructor(source: string, targets: string[], fileTypes?: string[], excludeFolders?: string[], excludeFiles?: string[]) {
        this.SupportedFormats = SupportedFormats;

        // SOURCE
        if (this.IsValidRelativePath(source)) {
            const normalizedSource = normalize(source);
            this.Source = normalizedSource;
        } else {
            throw new Error(`[Config]: Source path not valid: ${source}`);
        }

        // TARGETS
        this.Targets = [];
        for (const targetPath of targets) {
            const normalizedPath = normalize(targetPath);
            if (this.IsValidRelativePath(normalizedPath)) {
                const targetDetails: IFileDetails = new FileDetails(normalizedPath);
                const patternData: ISupportedFormat | undefined = this.SupportedFormats.find(e => e.Ext === targetDetails.Ext);

                if (patternData === undefined) {
                    throw new Error(`[Config]: Target must be a supported document type: \n Current: ${targetDetails.Ext} | Supported: ${this.SupportedFormats.map(e => e.Ext)}`);
                }
                this.Targets.push({
                    FullPath: targetDetails.FullPath,
                    Dir: targetDetails.Dir,
                    Base: targetDetails.Base,
                    Name: targetDetails.Name,
                    Ext: targetDetails.Ext,
                    Root: targetDetails.Root,
                    Pattern: patternData.Pattern
                });
            } else {
                throw new Error(`[Config]: Target path not valid: ${targetPath}`);
            }
        }

        // FILE TYPES
        this.FileTypes = [];
        if (fileTypes !== undefined) {
            for (const fileType of fileTypes) {
                if (fileType === '') {
                    throw new Error(`[Config]: Can't have an empty string as extension`);
                } else {
                    this.FileTypes.push(fileType);
                }
            }
        }

        this.ExcludeFolders = [];
        if (excludeFolders !== undefined) {
            for (const excludeFolder of excludeFolders) {
                if (excludeFolder === '') {
                    throw new Error(`[Config]: Can't have an empty exclude folder`);
                }
                const normalizedFolderPath = normalize(excludeFolder);

                if (isAbsolute(normalizedFolderPath)) {
                    throw new Error(`[Config]: ExcludeFolder is not a valid relative path: ${normalizedFolderPath}`);
                } else {
                    this.ExcludeFolders.push(normalizedFolderPath);
                }
            }
        }

        this.ExcludeFiles = [];
        if (excludeFiles !== undefined) {
            for (const excludeFile of excludeFiles) {
                if (excludeFile === '') {
                    throw new Error(`[Config]: Can't have an empty exclude file`);
                }
                const normalizedFile = normalize(excludeFile);
                if (isAbsolute(normalizedFile)) {
                    throw new Error(`[Config]: ExcludeFile is not a valid relative path: ${normalizedFile}`);
                } else {
                    this.ExcludeFiles.push(normalizedFile);
                }
            }
        }
    }

    /**
     * Returns the config in a prettified readable string.
     */
    public ToString(): string {
        let output = '';
        output += `\tSource: ${this.Source}\n`;
        output += `\tFileTypes: ${this.FileTypes}\n`;
        output += `\tExcludeFolders: ${this.ExcludeFolders}\n`;
        output += `\tExcludeFiles: ${this.ExcludeFiles}\n`;
        for (const target of this.Targets) {
            output += `\tTarget: ${target.FullPath} | Ext: ${target.Ext}\n`;
        }
        return output;
    }

    private IsValidRelativePath(path: string): boolean {
        if (isAbsolute(path)) {
            throw new Error(`[Config]: Path must be relative: ${path}`);
        }

        if (!existsSync(path)) {
            throw new Error(`[Config]: Path does not exist: ${path}`);
        }
        return true;
    }
}
