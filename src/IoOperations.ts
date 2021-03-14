import fs from "fs";

export function IsValidPath(path: string) : boolean {
    return fs.existsSync(path);
}

export function ReadFileFromPath(path: string) {
    const content: string = fs.readFileSync(path, { encoding: 'utf8' });
    return JSON.stringify(content);
}