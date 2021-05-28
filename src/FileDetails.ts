import { parse, ParsedPath } from 'path';
import { IFileDetails } from './Interfaces';

export class FileDetails implements IFileDetails {
    public FullPath: string;
    public Dir: string;
    public Base: string;
    public Name: string;
    public Ext: string;
    public Root: string;

    public constructor(path: string) {
        const result: ParsedPath = parse(path);

        this.FullPath = path;
        this.Root = result.root;
        this.Dir = result.dir;
        this.Base = result.base;
        this.Name = result.name;
        this.Ext = result.ext;
    }
}
