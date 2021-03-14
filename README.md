<p align="center">
  <a href="https://github.com/actions/example_checker/actions"><img alt="example_checker status" src="https://github.com/actions/example_checker/workflows/build-test/badge.svg"></a>
</p>

# Bevy Example checker action

This action parses `./examples/` folders for `example_name.rs` files, and cross references them with both `./examples/README.md` and `./Cargo.toml` to check if they all agree on the same information. 

This to prevent people from adding new examples but forgetting to list them in the other sources, or removing examples from documents but forgetting to remove them from the source code.

TODO:
    - Make sure all examples are listed in all 3 sources
    - readme regex looks for next table and thus loses the last one
    - readme must respect exclude directory
    - cargo must respect exclude directory
    - Cargo should not capture elements that are commented out
    - Readme should not capture elements that are commented out

### Requirements / Assumptions

#### Folders
- All examples must reside within the `./examples/` folder
- All example files must have the .rs file ending
- 

#### README
- All examples must be listed as entries in a table following the given format: 
- All tables must end with an empty new line

```
Example | File | Description
--- | --- | ---
`name_of_example` | [`readme_relative_path_to_file.rs`](./readme/relative/path/to/file.rs) | Text description of the example

```
- The table must have the columns listed as `Example | File | Description`

#### Cargo
- All examples must be listed as entries with the following format
- Must start with the header `[[example]]`
- Must contain `name` and `path` fields
- Example must end with an empty new line
- The block can contain more / other information, which will be ignored by the parser
```
[[example]]
name = "name_of_example"
path = "root/relative/path/to/example"

```


/* Assumptions
 * All examples will be within the ./example folder
 * All examples are required to be listed in the examples/README.md file
 * All example are required to be listed in the Cargo.toml file
 * Every single .rs file inside the examples folder represents unique examples
 * Only example files will have the .rs file-ending
 * 
 * Potential: 
 * README
 * Check that an entry has description in readme
 * 
 * 
 * README:
 * Assumes 1 empty line between the end of a table and the header of whatever next section
    
TODO: 
    - Make sure all examples are listed in all 3 sources
    - readme regex looks for next table and thus loses the last one
    - readme must respect exclude directory
    - cargo must respect exclude directory
    - Cargo should not capture elements that are commented out
    - Readme should not capture elements that are commented out

    <!-- --> comments in readme
    # comments in toml


 */

## Inputs

### `who-to-greet`

**Required** The name of the person to greet. Default `"World"`.

## Outputs

### `time`

The time we greeted you.

## Example usage

uses: actions/hello-world-javascript-action@v1.1
with:
  who-to-greet: 'Mona the Octocat'


=============================
# Create a JavaScript Action using TypeScript

Use this template to bootstrap the creation of a TypeScript action.:rocket:

This template includes compilation support, tests, a validation workflow, publishing, and versioning guidance.  

If you are new, there's also a simpler introduction.  See the [Hello World JavaScript Action](https://github.com/actions/hello-world-javascript-action)

## Create an action from this template

Click the `Use this Template` and provide the new repo details for your action

## Code in Main

> First, you'll need to have a reasonably modern version of `node` handy. This won't work with versions older than 9, for instance.

Install the dependencies  
```bash
$ npm install
```

Build the typescript and package it for distribution
```bash
$ npm run build && npm run package
```

Run the tests :heavy_check_mark:  
```bash
$ npm test

 PASS  ./index.test.js
  ✓ throws invalid number (3ms)
  ✓ wait 500 ms (504ms)
  ✓ test runs (95ms)

...
```

## Change action.yml

The action.yml contains defines the inputs and output for your action.

Update the action.yml with your name, description, inputs and outputs for your action.

See the [documentation](https://help.github.com/en/articles/metadata-syntax-for-github-actions)

## Change the Code

Most toolkit and CI/CD operations involve async operations so the action is run in an async function.

```javascript
import * as core from '@actions/core';
...

async function run() {
  try { 
      ...
  } 
  catch (error) {
    core.setFailed(error.message);
  }
}

run()
```

See the [toolkit documentation](https://github.com/actions/toolkit/blob/master/README.md#packages) for the various packages.

## Publish to a distribution branch

Actions are run from GitHub repos so we will checkin the packed dist folder. 

Then run [ncc](https://github.com/zeit/ncc) and push the results:
```bash
$ npm run package
$ git add dist
$ git commit -a -m "prod dependencies"
$ git push origin releases/v1
```

Note: We recommend using the `--license` option for ncc, which will create a license file for all of the production node modules used in your project.

Your action is now published! :rocket: 

See the [versioning documentation](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md)

## Validate

You can now validate the action by referencing `./` in a workflow in your repo (see [test.yml](.github/workflows/test.yml))

```yaml
uses: ./
with:
  milliseconds: 1000
```

See the [actions tab](https://github.com/actions/typescript-action/actions) for runs of this action! :rocket:

## Usage:

After testing you can [create a v1 tag](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md) to reference the stable and latest V1 action
