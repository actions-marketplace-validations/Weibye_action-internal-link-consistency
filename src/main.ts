// eslint:disable: no-console

import * as core from '@actions/core';
// const github = require('@actions/github');
import { GetExamplesFromCargo } from './CargoExamples';
import { GetExamplesFromReadme } from './ReadmeExamples';

import { GetSourceData } from './SourceData';
import { FileData } from './FileData';


import { Setup } from './Setup';
import { FileDetails } from './FileDetails';

let targets: string[];

const foldersToExclude = ['__tests__/testData/examples/ios/', '__tests__/testData/examples/excludefolder/'];
const filesToExclude = ['lib.rs'];

async function run(): Promise<void> {
    try {
        console.log('======= Starting Job =======');
        console.log('======= Getting config =======');

        const config = new Setup().Config;
        console.log(`Running job with config: \n${config.ToString()}`);

        // Get examples from directories
        console.log('======= Getting source data =======');
        const sourceData: FileDetails[] = GetSourceData(config.Source, config);
        if (sourceData.length > 0) {
            console.log(`Found ${sourceData.length} entries in ${config.Source}`);
            // for (const example of diskExamples) {
            //     console.log(example);
            // }
        } else {
            core.setFailed('Found no entries in source');
        }

        // console.log('======= Getting target data =======');
        // let targetData;
        // for (const target of targets) {
            
        // }
        // // Get examples listed in the Cargo.toml
        // console.log('======= CARGO =======');
        // const cargoExamples: FileData[] = checkCargo ? GetExamplesFromCargo(targetsPaths[0], filesToExclude, foldersToExclude) : [];
        // if (cargoExamples.length > 0) {
        //     console.log(`Found ${cargoExamples.length} examples in ${pathToCargo}`);
        //     // for (const example of cargoExamples) {
        //     //     console.log(example);
        //     // }
        // } else {
        //     if (checkCargo) core.setFailed('Found no examples in Cargo.toml');
        // }

        // // Get examples listed in the README
        // console.log('======= README =======');
        // const readmeExamples: FileData[] = checkReadme ? GetExamplesFromReadme(targetsPaths[1], filesToExclude, foldersToExclude) : [];
        // if (readmeExamples.length > 0) {
        //     console.log(`Found ${readmeExamples.length} examples in ${pathToReadme}`);
        //     // for (const example of readmeExamples) {
        //     //     console.log(example);
        //     // }
        // } else {
        //     if (checkReadme) core.setFailed('Found no examples in README');
        // }

        // console.log("======= Cross referencing issues =======");
        // const issues = CrossReference(diskExamples, cargoExamples, readmeExamples);
        // if (issues.length > 0) {
        //     for (const issue of issues) {
        //         console.log(issue);
        //     }
        // }
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
