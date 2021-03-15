import { readFileSync, existsSync } from 'fs';

export function IsValidPath(path: string): boolean {
    return existsSync(path);
}

export function ReadFileFromPath(path: string): string {
    const content: string = readFileSync(path, { encoding: 'utf8' });
    return JSON.stringify(content);
}
