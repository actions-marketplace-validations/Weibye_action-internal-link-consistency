require('./sourcemap-register.js');module.exports =
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 841:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetExamplesFromCargo = void 0;
const IoOperations_1 = __webpack_require__(222);
function GetExamplesFromCargo(path, ignoreFiles, ignoreFolders) {
    const rawData = IoOperations_1.ReadFileFromPath(path);
    const examplePattern = /(?<=\[\[example\]\]).+?name\s=\s\\"(.+?)\\".+?path\s=\s\\"(.+?)\\"/gm;
    const matches = rawData.matchAll(examplePattern);
    const outputData = [];
    for (const match of matches) {
        const file = match[2].split('/');
        outputData.push({
            name: match[1],
            fileName: file[file.length - 1],
            path: match[2]
        });
    }
    return outputData;
}
exports.GetExamplesFromCargo = GetExamplesFromCargo;


/***/ }),

/***/ 580:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetExamplesFromDisk = void 0;
const fs_1 = __webpack_require__(747);
function GetExamplesFromDisk(path, excludeFiles, excludeDirs) {
    let filesInDirectories = [];
    const dirs = fs_1.readdirSync(path, { withFileTypes: true });
    for (const element of dirs) {
        if (element.isDirectory()) {
            if (excludeDirs.some(e => e === path + element.name)) {
                console.log(`Folder excluded: ${path}${element.name}`);
                continue;
            }
            filesInDirectories = filesInDirectories.concat(GetExamplesFromDisk(`${path}${element.name}/`, excludeFiles, excludeDirs));
        }
        else {
            // Don't look for files that should be excluded
            if (!excludeFiles.some(e => e === element.name)) {
                // Make sure the file is an .rs file
                const elementNameSplit = element.name.split('.');
                if (elementNameSplit[elementNameSplit.length - 1] === 'rs') {
                    const result = path.split('/');
                    const name = elementNameSplit[0];
                    const category = result[result.length - 2];
                    const example = {
                        name,
                        fileName: element.name,
                        path: path + element.name,
                        category
                    };
                    filesInDirectories.push(example);
                }
            }
            else {
                console.log(`File excluded: ${path}${element.name}`);
            }
        }
    }
    return filesInDirectories;
}
exports.GetExamplesFromDisk = GetExamplesFromDisk;


/***/ }),

/***/ 222:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReadFileFromPath = exports.IsValidPath = void 0;
const fs_1 = __webpack_require__(747);
function IsValidPath(path) {
    return fs_1.existsSync(path);
}
exports.IsValidPath = IsValidPath;
function ReadFileFromPath(path) {
    const content = fs_1.readFileSync(path, { encoding: 'utf8' });
    return JSON.stringify(content);
}
exports.ReadFileFromPath = ReadFileFromPath;


/***/ }),

/***/ 56:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetExamplesFromReadme = void 0;
const IoOperations_1 = __webpack_require__(222);
function GetExamplesFromReadme(path, excludeFiles, excludeFolders) {
    const output = [];
    const pathElements = path.split('/');
    let relativePath = '';
    for (let index = 0; index < pathElements.length - 1; index++) {
        relativePath += `${pathElements[index]}/`;
    }
    // console.log(relativePath);
    const data = IoOperations_1.ReadFileFromPath(path);
    const regex = /(?<=(E|e)xample\s\|\s((F|f)ile|(M|m)ain)\s\|\s(D|d)escription\\r\\n-{3}\s\|\s-{3}\s\|\s-{3}\\r\\n)(.*?)(?=\\r\\n\\r\\n#)/gm;
    // Splits the README into sections based on the tables listing examples
    const sections = [];
    const sectionMatches = data.matchAll(regex);
    for (const match of sectionMatches) {
        sections.push(match[0]);
    }
    const sectionSplit = /\\r\\n/;
    const sectionRegex = /`(.+?)`\s\|\s.*?`(.+?)`.*\((.+?)\)\s\|\s(.*?)$/gm;
    // further parse the sections into individual examples
    for (const section of sections) {
        const splitStrings = section.split(sectionSplit);
        for (const string of splitStrings) {
            const result = string.matchAll(sectionRegex);
            for (const exampleRawData of result) {
                const filePath = exampleRawData[3].split('/');
                // Ensure we construct an absolute path to the file
                let absolutePath = relativePath;
                for (let index = 1; index < filePath.length; index++) {
                    absolutePath += index === filePath.length - 1 ? filePath[index] : `${filePath[index]}/`;
                }
                const example = {
                    name: exampleRawData[1],
                    fileName: filePath[filePath.length - 1],
                    path: absolutePath,
                    description: exampleRawData[4]
                };
                output.push(example);
                // console.log(example);
            }
        }
    }
    return output;
}
exports.GetExamplesFromReadme = GetExamplesFromReadme;


/***/ }),

/***/ 109:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


// eslint:disable: no-console
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const core = __importStar(__webpack_require__(186));
// const github = require('@actions/github');
const CargoExamples_1 = __webpack_require__(841);
const DiskExamples_1 = __webpack_require__(580);
const IoOperations_1 = __webpack_require__(222);
const ReadmeExamples_1 = __webpack_require__(56);
// import { wait } from './wait'
// Make sure all source files
// Config
const sourcePath = '__tests__/testData/examples/';
const whiteListFileTypes = (/* unused pure expression or super */ null && (['.rs'])); // If this is empty, look for all files
const targetsPaths = ['__tests__/testData/Cargo.toml', '__tests__/testData/examples/README.md'];
const pathToReadme = `${sourcePath}README.md`;
const pathToCargo = 'Cargo.toml';
const foldersToExclude = ['__tests__/testData/examples/ios/', '__tests__/testData/examples/excludefolder/'];
const filesToExclude = ['lib.rs'];
// Not needed when we move to target approach
const checkReadme = true;
const checkCargo = true;
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('Getting input');
            console.log(`Source Path: ${core.getInput('source_path')}`);
            console.log(`Target Path: ${core.getInput('target_paths')}`);
            console.log('======= Starting Job =======');
            if (!checkCargo && !checkReadme) {
                core.setFailed('Error with configuration: Both Cargo and README checks are disabled meaning this script will do nothing. At least one should be enabled');
                return;
            }
            // Check that the example directory exists
            if (!IoOperations_1.IsValidPath(sourcePath)) {
                core.setFailed(`Examples directory not found: ${sourcePath}`);
                return;
            }
            // Check that the Cargo.toml exist
            if (checkCargo && !IoOperations_1.IsValidPath(targetsPaths[0])) {
                core.setFailed(`Cargo.toml not found: ${targetsPaths[0]}`);
                return;
            }
            // Check that the readme exists
            if (checkReadme && !IoOperations_1.IsValidPath(targetsPaths[1])) {
                core.setFailed(`Examples README not found: ${targetsPaths[1]}`);
                return;
            }
            // Collect the data from the various sources and normalize them for comparison
            // Get examples from directories
            console.log('======= DISK =======');
            const diskExamples = DiskExamples_1.GetExamplesFromDisk(sourcePath, filesToExclude, foldersToExclude);
            if (diskExamples.length > 0) {
                console.log(`Found ${diskExamples.length} examples in ${sourcePath}`);
                // for (const example of diskExamples) {
                //     console.log(example);
                // }
            }
            else {
                core.setFailed('Found no examples on disk');
            }
            // Get examples listed in the Cargo.toml
            console.log('======= CARGO =======');
            const cargoExamples = checkCargo ? CargoExamples_1.GetExamplesFromCargo(targetsPaths[0], filesToExclude, foldersToExclude) : [];
            if (cargoExamples.length > 0) {
                console.log(`Found ${cargoExamples.length} examples in ${pathToCargo}`);
                // for (const example of cargoExamples) {
                //     console.log(example);
                // }
            }
            else {
                if (checkCargo)
                    core.setFailed('Found no examples in Cargo.toml');
            }
            // Get examples listed in the README
            console.log('======= README =======');
            const readmeExamples = checkReadme ? ReadmeExamples_1.GetExamplesFromReadme(targetsPaths[1], filesToExclude, foldersToExclude) : [];
            if (readmeExamples.length > 0) {
                console.log(`Found ${readmeExamples.length} examples in ${pathToReadme}`);
                // for (const example of readmeExamples) {
                //     console.log(example);
                // }
            }
            else {
                if (checkReadme)
                    core.setFailed('Found no examples in README');
            }
            // console.log("======= Cross referencing issues =======");
            // const issues = CrossReference(diskExamples, cargoExamples, readmeExamples);
            // if (issues.length > 0) {
            //     for (const issue of issues) {
            //         console.log(issue);
            //     }
            // }
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}
run();


/***/ }),

/***/ 351:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const os = __importStar(__webpack_require__(87));
const utils_1 = __webpack_require__(278);
/**
 * Commands
 *
 * Command Format:
 *   ::name key=value,key=value::message
 *
 * Examples:
 *   ::warning::This is the message
 *   ::set-env name=MY_VAR::some value
 */
function issueCommand(command, properties, message) {
    const cmd = new Command(command, properties, message);
    process.stdout.write(cmd.toString() + os.EOL);
}
exports.issueCommand = issueCommand;
function issue(name, message = '') {
    issueCommand(name, {}, message);
}
exports.issue = issue;
const CMD_STRING = '::';
class Command {
    constructor(command, properties, message) {
        if (!command) {
            command = 'missing.command';
        }
        this.command = command;
        this.properties = properties;
        this.message = message;
    }
    toString() {
        let cmdStr = CMD_STRING + this.command;
        if (this.properties && Object.keys(this.properties).length > 0) {
            cmdStr += ' ';
            let first = true;
            for (const key in this.properties) {
                if (this.properties.hasOwnProperty(key)) {
                    const val = this.properties[key];
                    if (val) {
                        if (first) {
                            first = false;
                        }
                        else {
                            cmdStr += ',';
                        }
                        cmdStr += `${key}=${escapeProperty(val)}`;
                    }
                }
            }
        }
        cmdStr += `${CMD_STRING}${escapeData(this.message)}`;
        return cmdStr;
    }
}
function escapeData(s) {
    return utils_1.toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A');
}
function escapeProperty(s) {
    return utils_1.toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A')
        .replace(/:/g, '%3A')
        .replace(/,/g, '%2C');
}
//# sourceMappingURL=command.js.map

/***/ }),

/***/ 186:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const command_1 = __webpack_require__(351);
const file_command_1 = __webpack_require__(717);
const utils_1 = __webpack_require__(278);
const os = __importStar(__webpack_require__(87));
const path = __importStar(__webpack_require__(622));
/**
 * The code to exit an action
 */
var ExitCode;
(function (ExitCode) {
    /**
     * A code indicating that the action was successful
     */
    ExitCode[ExitCode["Success"] = 0] = "Success";
    /**
     * A code indicating that the action was a failure
     */
    ExitCode[ExitCode["Failure"] = 1] = "Failure";
})(ExitCode = exports.ExitCode || (exports.ExitCode = {}));
//-----------------------------------------------------------------------
// Variables
//-----------------------------------------------------------------------
/**
 * Sets env variable for this action and future actions in the job
 * @param name the name of the variable to set
 * @param val the value of the variable. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function exportVariable(name, val) {
    const convertedVal = utils_1.toCommandValue(val);
    process.env[name] = convertedVal;
    const filePath = process.env['GITHUB_ENV'] || '';
    if (filePath) {
        const delimiter = '_GitHubActionsFileCommandDelimeter_';
        const commandValue = `${name}<<${delimiter}${os.EOL}${convertedVal}${os.EOL}${delimiter}`;
        file_command_1.issueCommand('ENV', commandValue);
    }
    else {
        command_1.issueCommand('set-env', { name }, convertedVal);
    }
}
exports.exportVariable = exportVariable;
/**
 * Registers a secret which will get masked from logs
 * @param secret value of the secret
 */
function setSecret(secret) {
    command_1.issueCommand('add-mask', {}, secret);
}
exports.setSecret = setSecret;
/**
 * Prepends inputPath to the PATH (for this action and future actions)
 * @param inputPath
 */
function addPath(inputPath) {
    const filePath = process.env['GITHUB_PATH'] || '';
    if (filePath) {
        file_command_1.issueCommand('PATH', inputPath);
    }
    else {
        command_1.issueCommand('add-path', {}, inputPath);
    }
    process.env['PATH'] = `${inputPath}${path.delimiter}${process.env['PATH']}`;
}
exports.addPath = addPath;
/**
 * Gets the value of an input.  The value is also trimmed.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string
 */
function getInput(name, options) {
    const val = process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`] || '';
    if (options && options.required && !val) {
        throw new Error(`Input required and not supplied: ${name}`);
    }
    return val.trim();
}
exports.getInput = getInput;
/**
 * Sets the value of an output.
 *
 * @param     name     name of the output to set
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setOutput(name, value) {
    command_1.issueCommand('set-output', { name }, value);
}
exports.setOutput = setOutput;
/**
 * Enables or disables the echoing of commands into stdout for the rest of the step.
 * Echoing is disabled by default if ACTIONS_STEP_DEBUG is not set.
 *
 */
function setCommandEcho(enabled) {
    command_1.issue('echo', enabled ? 'on' : 'off');
}
exports.setCommandEcho = setCommandEcho;
//-----------------------------------------------------------------------
// Results
//-----------------------------------------------------------------------
/**
 * Sets the action status to failed.
 * When the action exits it will be with an exit code of 1
 * @param message add error issue message
 */
function setFailed(message) {
    process.exitCode = ExitCode.Failure;
    error(message);
}
exports.setFailed = setFailed;
//-----------------------------------------------------------------------
// Logging Commands
//-----------------------------------------------------------------------
/**
 * Gets whether Actions Step Debug is on or not
 */
function isDebug() {
    return process.env['RUNNER_DEBUG'] === '1';
}
exports.isDebug = isDebug;
/**
 * Writes debug message to user log
 * @param message debug message
 */
function debug(message) {
    command_1.issueCommand('debug', {}, message);
}
exports.debug = debug;
/**
 * Adds an error issue
 * @param message error issue message. Errors will be converted to string via toString()
 */
function error(message) {
    command_1.issue('error', message instanceof Error ? message.toString() : message);
}
exports.error = error;
/**
 * Adds an warning issue
 * @param message warning issue message. Errors will be converted to string via toString()
 */
function warning(message) {
    command_1.issue('warning', message instanceof Error ? message.toString() : message);
}
exports.warning = warning;
/**
 * Writes info to log with console.log.
 * @param message info message
 */
function info(message) {
    process.stdout.write(message + os.EOL);
}
exports.info = info;
/**
 * Begin an output group.
 *
 * Output until the next `groupEnd` will be foldable in this group
 *
 * @param name The name of the output group
 */
function startGroup(name) {
    command_1.issue('group', name);
}
exports.startGroup = startGroup;
/**
 * End an output group.
 */
function endGroup() {
    command_1.issue('endgroup');
}
exports.endGroup = endGroup;
/**
 * Wrap an asynchronous function call in a group.
 *
 * Returns the same type as the function itself.
 *
 * @param name The name of the group
 * @param fn The function to wrap in the group
 */
function group(name, fn) {
    return __awaiter(this, void 0, void 0, function* () {
        startGroup(name);
        let result;
        try {
            result = yield fn();
        }
        finally {
            endGroup();
        }
        return result;
    });
}
exports.group = group;
//-----------------------------------------------------------------------
// Wrapper action state
//-----------------------------------------------------------------------
/**
 * Saves state for current action, the state can only be retrieved by this action's post job execution.
 *
 * @param     name     name of the state to store
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function saveState(name, value) {
    command_1.issueCommand('save-state', { name }, value);
}
exports.saveState = saveState;
/**
 * Gets the value of an state set by this action's main execution.
 *
 * @param     name     name of the state to get
 * @returns   string
 */
function getState(name) {
    return process.env[`STATE_${name}`] || '';
}
exports.getState = getState;
//# sourceMappingURL=core.js.map

/***/ }),

/***/ 717:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


// For internal use, subject to change.
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
const fs = __importStar(__webpack_require__(747));
const os = __importStar(__webpack_require__(87));
const utils_1 = __webpack_require__(278);
function issueCommand(command, message) {
    const filePath = process.env[`GITHUB_${command}`];
    if (!filePath) {
        throw new Error(`Unable to find environment variable for file command ${command}`);
    }
    if (!fs.existsSync(filePath)) {
        throw new Error(`Missing file at path: ${filePath}`);
    }
    fs.appendFileSync(filePath, `${utils_1.toCommandValue(message)}${os.EOL}`, {
        encoding: 'utf8'
    });
}
exports.issueCommand = issueCommand;
//# sourceMappingURL=file-command.js.map

/***/ }),

/***/ 278:
/***/ ((__unused_webpack_module, exports) => {


// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", ({ value: true }));
/**
 * Sanitizes an input into a string so it can be passed into issueCommand safely
 * @param input input to sanitize into a string
 */
function toCommandValue(input) {
    if (input === null || input === undefined) {
        return '';
    }
    else if (typeof input === 'string' || input instanceof String) {
        return input;
    }
    return JSON.stringify(input);
}
exports.toCommandValue = toCommandValue;
//# sourceMappingURL=utils.js.map

/***/ }),

/***/ 747:
/***/ ((module) => {

module.exports = require("fs");;

/***/ }),

/***/ 87:
/***/ ((module) => {

module.exports = require("os");;

/***/ }),

/***/ 622:
/***/ ((module) => {

module.exports = require("path");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	__webpack_require__.ab = __dirname + "/";/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(109);
/******/ })()
;
//# sourceMappingURL=index.js.map