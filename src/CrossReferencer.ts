import { FileDetails } from "./FileDetails";
import { ITargetOutput, IIssueNotInAny, IIssueNotInAll, IIssueNotInSource } from "./Interfaces";

export class CrossReferencer {
    // Rules:
    // File should be present in all targets, or there should be created an issue of the appropriate type:

    // Issue types:
    // - Only found in no or some targets: Missing target: list
    public MissingFromTargets: IIssueNotInAll[];
    // - Found in target (target(s)) but not on disk
    public MissingFromSource: IIssueNotInSource[];

    public HasIssues: boolean;
    
    public constructor(sourceData: FileDetails[], targetData: ITargetOutput[])  {
        this.MissingFromTargets = [];
        this.MissingFromSource = [];

        // const clonedSource = [...sourceData];
        const clonedTarget = [...targetData];

        for (let i = 0; i < sourceData.length; i++) {
            const source = sourceData[i];

            let matchesCount = 0;
            let missingFromTarget: string[] = [];

            for (let j = 0; j < clonedTarget.length; j++) {
                const clonedTargetData = clonedTarget[j];
                const match = clonedTargetData.Data.find(e => e.Details.SourcePath === source.SourcePath);
                if (match !== undefined) {
                    // Add to the match count
                    matchesCount++;
                    // Remove element from the target data list
                    clonedTargetData.Data.splice(clonedTargetData.Data.indexOf(match), 1);
                } else {
                    missingFromTarget.push(clonedTargetData.Target);
                }
            }
            // If we find that this source was present in all targets, we can remove it from the list
            if (matchesCount === targetData.length) {
                // Do nothing, it is present in all targets
            } else if (matchesCount === 0) {
                // not present in any targets
                this.MissingFromTargets.push({ Path: source.SourcePath, MissingTargets: targetData.map(e => e.Target) });
            } else {
                // File present in some, but not all targets
                this.MissingFromTargets.push({ Path: source.SourcePath, MissingTargets: missingFromTarget });
            }
        }

        clonedTarget.forEach(target => {
            target.Data.forEach(data => {
                this.MissingFromSource.push({ Path: data.Details.SourcePath, InTarget: data.ParentFile.Path });
                // console.log(`File in target not present in source: ${data.Details.SourcePath}`);
            });
        });

        this.HasIssues = this.MissingFromTargets.length + this.MissingFromSource.length > 0;
    }
}