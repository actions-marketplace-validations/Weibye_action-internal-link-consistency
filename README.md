<p align="center">
  <a href="https://github.com/Weibye/example_checker/actions"><img alt="example_checker status" src="https://github.com/Weibye/example_checker/workflows/build-test/badge.svg"></a>
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