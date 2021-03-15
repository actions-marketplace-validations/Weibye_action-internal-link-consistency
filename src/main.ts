// eslint:disable: no-console

import * as core from '@actions/core'
// const github = require('@actions/github');
import {GetExamplesFromCargo} from './CargoExamples'
import {GetExamplesFromDisk} from './DiskExamples'
import {FileData} from './FileData'
import {IsValidPath} from './IoOperations'
import {GetExamplesFromReadme} from './ReadmeExamples'
// import { wait } from './wait'

// Make sure all source files

// Config
const sourcePath = '__tests__/testData/examples/'
const whiteListFileTypes: string[] = ['.rs'] // If this is empty, look for all files
const targetsPaths = [
  '__tests__/testData/Cargo.toml',
  '__tests__/testData/examples/README.md'
]

const pathToReadme = `${sourcePath}README.md`
const pathToCargo = 'Cargo.toml'

const foldersToExclude: string[] = [
  '__tests__/testData/examples/ios/',
  '__tests__/testData/examples/excludefolder/'
]
const filesToExclude: string[] = ['lib.rs']

// Not needed when we move to target approach
const checkReadme = true
const checkCargo = true

async function run(): Promise<void> {
  try {
    console.log('Getting input')
    console.log(`Source Path: ${core.getInput('source_path')}`)
    console.log(`Target Path: ${core.getInput('target_paths')}`)

    console.log('======= Starting Job =======')

    if (!checkCargo && !checkReadme) {
      core.setFailed(
        'Error with configuration: Both Cargo and README checks are disabled meaning this script will do nothing. At least one should be enabled'
      )
      return
    }

    // Check that the example directory exists
    if (!IsValidPath(sourcePath)) {
      core.setFailed(`Examples directory not found: ${sourcePath}`)
      return
    }

    // Check that the Cargo.toml exist
    if (checkCargo && !IsValidPath(targetsPaths[0])) {
      core.setFailed(`Cargo.toml not found: ${targetsPaths[0]}`)
      return
    }

    // Check that the readme exists
    if (checkReadme && !IsValidPath(targetsPaths[1])) {
      core.setFailed(`Examples README not found: ${targetsPaths[1]}`)
      return
    }

    // Collect the data from the various sources and normalize them for comparison

    // Get examples from directories
    console.log('======= DISK =======')
    const diskExamples: FileData[] = GetExamplesFromDisk(
      sourcePath,
      filesToExclude,
      foldersToExclude
    )
    if (diskExamples.length > 0) {
      console.log(`Found ${diskExamples.length} examples in ${sourcePath}`)
      // for (const example of diskExamples) {
      //     console.log(example);
      // }
    } else {
      core.setFailed('Found no examples on disk')
    }

    // Get examples listed in the Cargo.toml
    console.log('======= CARGO =======')
    const cargoExamples: FileData[] = checkCargo
      ? GetExamplesFromCargo(targetsPaths[0], filesToExclude, foldersToExclude)
      : []
    if (cargoExamples.length > 0) {
      console.log(`Found ${cargoExamples.length} examples in ${pathToCargo}`)
      // for (const example of cargoExamples) {
      //     console.log(example);
      // }
    } else {
      if (checkCargo) core.setFailed('Found no examples in Cargo.toml')
    }

    // Get examples listed in the README
    console.log('======= README =======')
    const readmeExamples: FileData[] = checkReadme
      ? GetExamplesFromReadme(targetsPaths[1], filesToExclude, foldersToExclude)
      : []
    if (readmeExamples.length > 0) {
      console.log(`Found ${readmeExamples.length} examples in ${pathToReadme}`)
      // for (const example of readmeExamples) {
      //     console.log(example);
      // }
    } else {
      if (checkReadme) core.setFailed('Found no examples in README')
    }

    // console.log("======= Cross referencing issues =======");
    // const issues = CrossReference(diskExamples, cargoExamples, readmeExamples);
    // if (issues.length > 0) {
    //     for (const issue of issues) {
    //         console.log(issue);
    //     }
    // }
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
