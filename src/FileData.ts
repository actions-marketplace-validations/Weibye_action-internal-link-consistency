export interface FileData {
    name: string;
    fileName: string;
    path: string;
    description?: string;
    category?: string;
}
export interface ValidatedFileData extends FileData {
    validName?: ValidFlags;
    validPath?: ValidFlags;
}

export interface ValidFlags {
    disk: boolean;
    readme: boolean;
    cargo: boolean;
}
