import { FileDetails } from './FileDetails';
import { LinkStyle } from './LinkStyle';

export interface ITarget {
    Path: string;
    Style: LinkStyle;
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

export interface IIssue {
    Path: string;
}
// export interface IIssueNotInAny extends IIssue {}
export interface IIssueNotInAll extends IIssue {
    MissingTargets: string[];
}
export interface IIssueNotInSource extends IIssue {
    InTarget: string;
    Line: number;
}
export interface ITargetIssue extends IIssue {
    OriginalMatch: string;
    Target: string;
}
