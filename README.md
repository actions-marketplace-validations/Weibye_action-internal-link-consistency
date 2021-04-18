<p align="center">
    <a href="https://github.com/Weibye/action-internal-link-consistency/actions">
        <img 
            alt="action-internal-link-consistency status" 
            src="https://github.com/Weibye/action-internal-link-consistency/workflows/build-test/badge.svg">
    </a>
</p>

# Internal Link Consistency Checker

This actions takes a folder-path and a list of documents as inputs and checks if all the documents contain links to all the files within the folder-path. 

The primary user for this action is [Bevy](https://github.com/bevyengine/bevy), a game-engine written in rust, in order to make sure new files added to examples also gets added to the appropriate documentation.

### How it works

1. Looks for files recursively within `source-path` and collects data about the files (source data).
2. Looks through the documents defined in `targets` and collects data about the links within them (target data).
3. Cross references source and target data to ensure they agree on the same data.
4. The action will fail if there are any inconsistencies found.

If the action fails, the action tries to output helpful messages to guide the user to exactly what needs to be addressed. 

### Features
- Can look for specific file-types, or all files within folders.
- Can ignore specific folders or files, and will ignore them from both source or targets.
- If a folder is ignored, the action will ignore all files and sub-folders inside it. 
- Supports Mardown links and Toml 'path values' (path = "xxx/yyy/zzz")
- Ignores links currently commented out

### Limitations
- Currently only scans recursively through one folder, but could be extended / improved if needed. (Covers Bevy's use case)
- Only supports two specific document targets: `.md` & `.toml` (Covers Bevy's current use case)


## Settings & Configuration

#### `source-path`
`Required: True`
Path to the folder that should be scanned through. 
```javascript
source_path: string;
```
Set to [`./examples`](https://github.com/bevyengine/bevy/tree/main/examples)

#### `targets`
`Required: True`
List of target documents to parse and cross-reference. 
Target must be defined as:
```javascript
targets: string[];
```
Set to `["./Cargo.toml", "./examples/README.md"]`
#### Markdown
```[`readme_relative_path_to_file.rs`](./relative/path/to/file.rs)```
#### TOML Path Value
`path = "relative/path/to/file.rs"`

#### `file-types`
Whitelist of file-types to look for. 
- If empty, collects all files within source-path. 
- If this contains _any_ entries, the action will _only_ look for those file types.
Set to `['rs']`

#### `exclude-folders`
List of folders to exclude.
This setting make sure any files or folders (recursively) are ignored from consideration and cross check.
This needs to be root-relative paths to folders.

```javascript
exclude_folders: string[];
```
Set to `['./examples/ios']`

#### `exclude-files`
List of files to exclude. 
This setting make sure any file listed here is ignored from consideration and cross check. 

This needs to be an array of root-relative paths to files.
```javascript
exclude_files: string[];
```

Set to `[]`
