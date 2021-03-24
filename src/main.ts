// eslint:disable: no-console

import * as core from '@actions/core';
// const github = require('@actions/github');
import { Setup } from './Setup';
import { FileDetails } from './FileDetails';
import { GetSourceData } from './SourceData';
import { GetTargetData } from './TargetData';
import { ITargetData, ITargetOutput } from './Interfaces';
import { CrossReferencer } from './CrossReferencer';

async function run(): Promise<void> {
    try {
        console.log('======= Starting Job =======');

        const config = new Setup().Config;
        console.log(`Running job with config: \n${config.ToString()}`);

        // Get examples from directories
        console.log('======= Getting source data =======');
        const sourceData: FileDetails[] = GetSourceData(config.Source, config);
        if (sourceData.length > 0) {
            console.log(`Found ${sourceData.length} entries in ${config.Source}`);
            // for (const data of sourceData) {
            //     console.log(data);
            // }
        } else {
            core.setFailed('Found no entries in source');
        }

        console.log('======= Getting target data =======');
        let targetData: ITargetOutput[] = [];
        for (const target of config.Targets) {

            const data = GetTargetData(target, config);
            console.log(`Found ${data.length} entries in ${target.Path}`);
            const output: ITargetOutput = { Target: target.Path, Data: data };
            targetData.push(output);
        }

        console.log("======= Cross referencing issues =======");
        const crossChecker = new CrossReferencer(sourceData, targetData);
        if (crossChecker.HasIssues) {
            if (crossChecker.NotInAnyTarget.length > 0) {
                console.log(`+++++++++++\nFollowing files in source was not found in any targets:\n`);
                crossChecker.NotInAnyTarget.forEach(issue => {
                    console.log(`=>\tFile: ${issue.Path}\n`);
                });
                console.log('Make sure they are added to the sources, or ignored from the search');
            }

            if (crossChecker.NotInAllTargets.length > 0) {
                console.log(`+++++++++++\nFollowing files in source was found in some but not all targets:\n`);
                crossChecker.NotInAllTargets.forEach(issue => {
                    console.log(`=>\tFile: ${issue.Path} \n\tMissing from targets: ${issue.MissingTargets}\n`);
                });
                console.log('Please add them to the remaining targets');
            }

            if (crossChecker.NotInSource.length > 0) {
                console.log(`+++++++++++\nFollowing links found in targets but could not find corresponding file in source:\n`);
                crossChecker.NotInSource.forEach(issue => {
                    console.log(`=>\tFile: ${issue.Path} \n\tListed in target: ${issue.InTarget}\n`);
                });
                console.log('Please remove them from the target or make sure the link points to the correct file');
            }
            core.setFailed('Cross referencing found issues, see output log to deal with them');
        }

        // issues.diskIssues.forEach(issue => {
        //     console.log(`File on disk not in Target: ${issue.Path}`);
        // });
        // issues.targetIssues.forEach(issue => {
        //     console.log(`Link in target not found on disk: \nExpected file: ${issue.Path}\nMatch in target: ${issue.OriginalMatch}\nTarget: ${issue.Target}`);
        // });
    } catch (error) {
        core.setFailed(error.message);
    }
}

// eslint:enable: no-console
run();
