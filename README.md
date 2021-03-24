<p align="center">
  <a href="https://github.com/Weibye/example_checker/actions"><img alt="example_checker status" src="https://github.com/Weibye/example_checker/workflows/build-test/badge.svg"></a>
</p>

# Internal File Link-checker

This actions parses a folder recursively for any files and checks if links to these files are present in the defined target documents.

It's main purpose is to ensure all the target documents has valid links to all the files within these folders.

The primary user for this action at this moment is Bevy Engine, where it is used to check if all the examples are in fact listed in the Cargo and Readme documents. This to prevent people from adding new examples but forgetting to list them in the other sources, or removing examples from documents but forgetting to remove them from the source code.

TODO:
    - NOTFOUNDINANY issue is basically just notfoundinall, simply add all the targets to the missing list
    - Links found in targets should respect ignore files and directories
    - Links found in targets should capture which line they are on to make output more clear
    - Targets should not capture links that are commented out
    - Write tests for the system
## Usage




### Target

### Target Style
#### Markdown
```[`readme_relative_path_to_file.rs`](./readme/relative/path/to/file.rs)```
#### TOML Path Value
`path = "root/relative/path/to/example"`

### File Ignore

### Folder Ignore
    
