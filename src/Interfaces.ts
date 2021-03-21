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
}

export interface IIssue {
    Path: string;
}
export interface ITargetIssue extends IIssue {
    OriginalMatch: string;
    Target: string;
}