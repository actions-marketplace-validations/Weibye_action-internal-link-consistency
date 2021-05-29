import { Config } from './Config';
import { IIssueNotInAll, IIssueNotInSource } from './Interfaces';

export class IssueLogger {
    private TargetIssueOutput: string;
    private targetIssuesCount: number;
    private SourceIssueOutput: string;
    private sourceIssuesCount: number;
    public IssueCount: number;
    private issueIter = 1;

    public constructor(config: Config, sourceIssues: IIssueNotInAll[], targetIssues: IIssueNotInSource[]) {
        this.IssueCount = sourceIssues.length + targetIssues.length;
        this.targetIssuesCount = targetIssues.length;
        this.sourceIssuesCount = sourceIssues.length;
        this.TargetIssueOutput = '';
        this.SourceIssueOutput = '';

        if (targetIssues.length > 0) {
            this.TargetIssueOutput += `Existing links issues:`;
            for (const issue of targetIssues) {
                this.TargetIssueOutput += `\n${this.GetIssueNumber()} Link: ${issue.Path}\n\tDoes not lead to file within ${config.Source} or its children.\
                \n\tFound in document: ${issue.InTarget} : Line: ${issue.Line}\n`;
            }
            this.TargetIssueOutput += `\nTo fix, do one of the following:\
                \n\t- Fix any typos in the link\
                \n\t- Make sure the file exist within ${config.Source} or its children\
                \n\t- Remove the link from the document (If no longer valid)\n`;
        }

        if (sourceIssues.length > 0) {
            this.SourceIssueOutput += `Missing links issues:`;
            for (const issue of sourceIssues) {
                this.SourceIssueOutput += `\n${this.GetIssueNumber()} File: ${issue.Path} \n\tIs missing from following document(s):`;
                for (const missingTarget of issue.MissingTargets) {
                    this.SourceIssueOutput += `\n\t\t${missingTarget}`;
                }
                this.SourceIssueOutput += `\n`;
            }
            this.SourceIssueOutput += `\nTo fix, do one of the following:\
                \n\t- Add the missing link to the document\
                \n\t- Remove the file (If no longer valid)\n`;
        }
    }

    public Ouput(): string {
        let output = `▼ ▼ ▼ ▼ ${this.IssueCount} ${this.IssueCount === 1 ? 'issue' : 'issues'} need to be fixed ▼ ▼ ▼ ▼`;
        if (this.targetIssuesCount > 0) {
            output += `\n${this.TargetIssueOutput}`;
        }
        if (this.sourceIssuesCount > 0) {
            output += `\n${this.SourceIssueOutput}`;
        }

        output += `\nNote: If none of the above fixes are relevant, consider adding the file/folder to this action's ignore-list, but ONLY do so when absolutly necessary.`;
        output += `\n▲ ▲ ▲ ▲ End of ${this.IssueCount === 1 ? 'issue' : 'issues'} ▲ ▲ ▲ ▲`;
        return output;
    }

    private GetIssueNumber(): string {
        return `[${this.issueIter++}/${this.IssueCount}] =>`;
    }
}
