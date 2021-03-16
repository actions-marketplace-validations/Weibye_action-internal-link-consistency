// eslint:disable: no-console

import * as core from '@actions/core';
// const github = require('@actions/github');
import { GetExamplesFromCargo } from './CargoExamples';
import { GetExamplesFromDisk as GetSourceData } from './DiskExamples';
import { FileData } from './FileData';
import { IsValidPath } from './IoOperations';
import { GetExamplesFromReadme } from './ReadmeExamples';

import { defaultFileTypes, defaultSource, defaultTargets } from './Defaults';
// import { wait } from './wait'

let source: string;
let targets: string[];
let fileTypes: string[];

// const pathToReadme = `${sourcePath}README.md`;
const pathToCargo = 'Cargo.toml';

const foldersToExclude = ['__tests__/testData/examples/ios/', '__tests__/testData/examples/excludefolder/'];
const filesToExclude = ['lib.rs'];

// Not needed when we move to target approach
const checkReadme = true;
const checkCargo = true;

async function run(): Promise<void> {
    try {
        console.log('======= Starting Job =======');
        console.log('======= Getting inputs =======');

        const sourceInput = core.getInput('source');
        if (sourceInput === undefined || sourceInput === '') {
            source = defaultSource;
        } else {
            source = sourceInput;
        }
        console.log(`Source: ${source}`);

        const targetsInput = core.getInput('targets');
        if (targetsInput === undefined || targetsInput === '') {
            targets = defaultTargets;
        } else {
            targets = JSON.parse(targetsInput).targets;
        }
        console.log(`Targets: ${targets}`);

        const fileTypesInput = core.getInput('file-types');
        if (fileTypesInput === undefined || fileTypesInput === '') {
            fileTypes = defaultFileTypes;
        } else {
            fileTypes = JSON.parse(fileTypesInput).fileTypes;
        }
        console.log(`File Types: ${fileTypes}`);

        console.log('======= Config sanity checks =======');
        if (source === null || source === undefined) {
            core.setFailed(`Config error: Source directory not defined`);
            return;
        }
        // Check that the source directory exists
        if (!IsValidPath(source)) {
            core.setFailed(`Source directory not found: ${source}`);
            return;
        }

        if (targets === null || targets === undefined || targets.length < 1) {
            core.setFailed(`Config error: No targets defined`);
            return;
        }

        for (const target of targets) {
            if (!IsValidPath(target)) {
                core.setFailed(`Target not found: ${target}`);
                return;
            }
        }

        // Collect the data from the various sources and normalize them for comparison

        // Get examples from directories
        console.log('======= Getting source data =======');
        const sourceData: FileData[] = GetSourceData(source, filesToExclude, foldersToExclude);
        if (sourceData.length > 0) {
            console.log(`Found ${sourceData.length} entries in ${source}`);
            // for (const example of diskExamples) {
            //     console.log(example);
            // }
        } else {
            core.setFailed('Found no entries in source');
        }

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
