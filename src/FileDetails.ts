export class FileDetails {

    public Path: string;
    public FileName: string;
    public Extension: string;
    public SourcePath: string;

    constructor(path: string) {
        this.SourcePath = path;
        this.FileName = this.GetFileName(path);
        this.Extension = this.GetFileExtension(path);
        this.Path = this.GetPathToFile(path);

        // console.log(`Name:${this.FileName}`);
        // console.log(`Extension:${this.Extension}`);
        // console.log(`Path:${this.Path}`);
    }

    GetPathToFile(path: string): string {
        const regex = /^(.+\/)*([^\/]+)*$/gm;
        const result = regex.exec(path);
        if (result !== null && result !== undefined && result.length > 0) {
            return result[1];
        }
        return '';
    }

    GetFileName(path: string): string {
        const regex = /^(.+\/)*([^\/]+)*$/gm;
        const result = regex.exec(path);
        if (result !== null && result !== undefined && result.length > 0) {
            return result[2];
        }
        return '';
    }

    GetFileExtension(path: string): string {
        const regex = /(?:\.([^.]+))?$/; // Capture file extensions
        const result = regex.exec(path);
        if (result !== null && result !== undefined && result.length > 0) {
            return result[1];
        } else {
            return '';
        }
    }
}
