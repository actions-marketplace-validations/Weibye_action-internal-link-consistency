import { IIssueNotInAll, IIssueNotInSource } from './Interfaces';

export class IssueLogger {
    public TargetIssueOutput: string;
    public SourceIssueOutput: string;

    public constructor(sourceIssues: IIssueNotInAll[], targetIssues: IIssueNotInSource[]) {
        this.TargetIssueOutput = '';
        this.SourceIssueOutput = '';

        if (sourceIssues.length > 0) {
            this.SourceIssueOutput += `Following files in source was not found in the following target(s):\n`;
            for (const issue of sourceIssues) {
                this.SourceIssueOutput += `=>\tFile: ${issue.Path} \n\tMissing from targets: ${issue.MissingTargets}\n`;
            }
            this.SourceIssueOutput += `Please add them to the remaining targets or remove them from disk\n`;
        }

        if (targetIssues.length > 0) {
            this.TargetIssueOutput += `Following links was found in target(s) but could not find corresponding file in source:\n`;
            for (const issue of targetIssues) {
                this.TargetIssueOutput += `=>\tFile: ${issue.Path}\n\tIn target: ${issue.InTarget} : ${issue.Line}\n`;
            }
            this.TargetIssueOutput += 'Please remove them from the target or make sure the link points to the correct file.\n';
            this.TargetIssueOutput += 'Note: This often might indicate a typo in the link.\n';
        }
    }

    public PrintIssues(): void {
        console.log(this.SourceIssueOutput);
        console.log(this.TargetIssueOutput);
    }
}
