import { FileDetails } from "./FileDetails";
import { ITargetData, IIssue, ITargetIssue } from "./Interfaces";

export class CrossReferencer {

    public Issues: { diskIssues: IIssue[], targetIssues: ITargetIssue[] };

    public constructor(sourceData: FileDetails[], targetData: ITargetData[])  {
        this.Issues = { diskIssues: [], targetIssues: [] };

        const clonedSource = [...sourceData];
        const clonedTarget = [...targetData];

        for (let i = 0; i < sourceData.length; i++) {
            const source = sourceData[i];
            // console.log(source);
            const filteredResult = clonedTarget.filter(e => e.Details.SourcePath === source.SourcePath);
            if (filteredResult.length > 0) {
                filteredResult.forEach(result => {
                    const targetIndex = clonedTarget.indexOf(result);
                    if (targetIndex > 0) {
                        clonedTarget.splice(targetIndex, 1);
                    }
                });
                const sourceIndex = clonedSource.indexOf(source);
                clonedSource.splice(sourceIndex, 1);
            }
        }

        // Disk not in target
        // console.log('Files on disk but not in targets');
        clonedSource.forEach(source => {
            this.Issues.diskIssues.push({ Path: source.SourcePath });
        });

        // Targets not on disk
        // console.log('Filed not on disk, but in targets');
        clonedTarget.forEach(data => {
            this.Issues.targetIssues.push({ Path: data.Details.SourcePath, OriginalMatch: data.OriginalMatch, Target: data.ParentFile.Path });
        });
    }
}