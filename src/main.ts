// eslint:disable: no-console

import * as core from '@actions/core';
// const github = require('@actions/github');
// import { GetExamplesFromCargo } from './CargoExamples';
// import { GetExamplesFromReadme } from './ReadmeExamples';
import { Setup } from './Setup';
import { FileDetails } from './FileDetails';
import { GetSourceData } from './SourceData';
import { GetTargetData } from './TargetData';
import { ITargetData } from './Interfaces';
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
        let targetData: ITargetData[] = [];
        for (const target of config.Targets) {

            const data = GetTargetData(target, config);
            console.log(`Found ${data.length} entries in ${target.Path}`);
            
            targetData = targetData.concat(data);
        }

        console.log("======= Cross referencing issues =======");
        const issues = new CrossReferencer(sourceData, targetData).Issues;
        // const issues = CrossReference(diskExamples, cargoExamples, readmeExamples);

        issues.diskIssues.forEach(issue => {
            console.log(`File on disk not in Target: ${issue.Path}`);
        });
        issues.targetIssues.forEach(issue => {
            console.log(`Link in target not found on disk: \nExpected file: ${issue.Path}\nMatch in target: ${issue.OriginalMatch}\nTarget: ${issue.Target}`);
        });
    } catch (error) {
        core.setFailed(error.message);
    }
}

// eslint:enable: no-console
run();
