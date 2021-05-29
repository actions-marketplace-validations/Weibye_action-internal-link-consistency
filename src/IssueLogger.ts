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
            // this.TargetIssueOutput +=  //`Link in document does not point to a file inside ${config.Source} or it's children:\n`;
            for (const issue of targetIssues) {
                this.TargetIssueOutput += `\n${this.GetIssueNumber()} Link: ${issue.Path}\n\tDoes not lead to file within ${config.Source} or its children.\
                \n\tFound in document: ${issue.InTarget} : Line: ${issue.Line}\n`;
            }
            this.TargetIssueOutput += `\nTo fix: Fix any typos in the link, remove the link from the document, or make sure the file exist within ${config.Source}.`;
        }

        if (sourceIssues.length > 0) {
            this.SourceIssueOutput += `Following files in folders was not found linked in document(s):\n`;
            for (const issue of sourceIssues) {
                this.SourceIssueOutput += `\n${this.GetIssueNumber()} File: ${issue.Path} \n\tIs missing from following document(s):`;
                for (const missingTarget of issue.MissingTargets) {
                    this.SourceIssueOutput += `\n\t\t${missingTarget}`;
                }
                this.SourceIssueOutput += `\n`;
            }
            this.SourceIssueOutput += `\nPlease add them to the documents listed or remove them from folders.`;
        }
    }

    public Ouput(): string {

        let output = `▼ ▼ ▼ ▼ ${this.IssueCount} ${this.IssueCount == 1 ? "issue" : "issues"} need to be fixed ▼ ▼ ▼ ▼`;
        if (this.targetIssuesCount > 0) {
            output += `\n${this.TargetIssueOutput}`;
        }
        if (this.sourceIssuesCount > 0) {
            output += `\n${this.SourceIssueOutput}`
        }
        output += `▲ ▲ ▲ ▲ End of ${this.IssueCount == 1 ? "issue" : "issues"} ▲ ▲ ▲ ▲`;
        return output;
    }

    private GetIssueNumber(): string {
        return `[${this.issueIter++}/${this.IssueCount}] =>`;
    }
}
