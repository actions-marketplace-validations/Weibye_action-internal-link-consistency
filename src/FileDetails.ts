export class FileDetails {
    public Path: string;
    public FileName: string;
    public Extension: string;
    public SourcePath: string;

    public constructor(path: string) {
        this.SourcePath = path;
        this.FileName = this.GetFileName(path);
        this.Extension = this.GetFileExtension(path);
        this.Path = this.GetPathToFile(path);
    }

    public GetPathToFile(path: string): string {
        /* eslint-disable no-useless-escape */
        const regex = /^(.+\/)*([^\/]+)*$/gm;
        /* eslint-enable no-useless-escape */
        const result = regex.exec(path);
        if (result !== null && result !== undefined && result.length > 0) {
            return result[1];
        }
        return '';
    }

    public GetFileName(path: string): string {
        /* eslint-disable no-useless-escape */
        const regex = /^(.+\/)*([^\/]+)*$/gm;
        /* eslint-enable no-useless-escape */
        const result = regex.exec(path);
        if (result !== null && result !== undefined && result.length > 0) {
            return result[2];
        }
        return '';
    }

    public GetFileExtension(path: string): string {
        const regex = /(?:\.([^.]+))?$/; // Capture file extensions
        const result = regex.exec(path);
        if (result !== null && result !== undefined && result.length > 0) {
            return result[1];
        } else {
            return '';
        }
    }
}
