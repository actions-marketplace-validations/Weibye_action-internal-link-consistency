import { Config } from './Config';
import { IIssueNotInAll } from './Interfaces';

export class IssueLogger {
    private SourceIssueOutput: string;
    public IssueCount: number;
    private issueIter = 1;

    public constructor(config: Config, sourceIssues: IIssueNotInAll[]) {
        this.IssueCount = sourceIssues.length;
        this.SourceIssueOutput = '';

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
        output += `\n${this.SourceIssueOutput}`;
        output += `\nNote: If none of the above fixes are relevant, consider adding the file/folder to this action's ignore-list, but ONLY do so when absolutly necessary.`;
        output += `\n▲ ▲ ▲ ▲ End of ${this.IssueCount === 1 ? 'issue' : 'issues'} ▲ ▲ ▲ ▲`;
        return output;
    }

    private GetIssueNumber(): string {
        return `[${this.issueIter++}/${this.IssueCount}] =>`;
    }
}
