import { FileDetails } from './FileDetails';

interface IPath {
    Path: string;
}

export interface ITargetData {
    OriginalMatch: string;
    RelativePath: string;
    // MatchIndex: number;
    Details: FileDetails;
    ParentFile: ITarget;
    LineNr: number;
}

export interface ITargetOutput {
    Target: string; // Path
    Data: ITargetData[];
}

export interface IIssueNotInAll extends IPath {
    MissingTargets: string[];
}
export interface ITargetIssue extends IPath {
    OriginalMatch: string;
    Target: string;
}

export interface IExt {
    Ext: string;
}
export interface IFileDetails extends IExt {
    FullPath: string;
    Dir: string;
    Base: string;
    Name: string;
    Root: string;
}
export interface IMatchPattern {
    Pattern: RegExp;
}

export interface ITarget extends IFileDetails, IMatchPattern {}

export interface ISupportedFormat extends IExt, IMatchPattern {}
