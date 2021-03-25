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

        console.log('======= Getting source data =======');
        const sourceData: FileDetails[] = GetSourceData(config.Source, config);
        if (sourceData.length > 0) {
            console.log(`Found ${sourceData.length} entries in ${config.Source}`);
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
            if (crossChecker.MissingFromTargets.length > 0) {
                console.log(`Following files in source was not found in the following target(s):\n`);
                crossChecker.MissingFromTargets.forEach(issue => {
                    console.log(`=>\tFile: ${issue.Path} \n\tMissing from targets: ${issue.MissingTargets}\n`);
                });
                console.log('Please add them to the remaining targets or remove them from disk\n');
            }
            if (crossChecker.MissingFromSource.length > 0) {
                console.log(`Following links was found in target(s) but could not find corresponding file in source:\n`);
                crossChecker.MissingFromSource.forEach(issue => {
                    console.log(`=>\tFile: ${issue.Path}\n\tIn target: ${issue.InTarget} : ${issue.Line}\n`);
                });
                console.log('Please remove them from the target or make sure the link points to the correct file.');
                console.log('Note: This often might indicate a typo in the link.\n')
            }
            core.setFailed('Cross referencing found issues, see output log to fix them');
        }
    } catch (error) {
        core.setFailed(error.message);
    }
}

// eslint:enable: no-console
run();
