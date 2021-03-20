require('./sourcemap-register.js');module.exports =
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 295:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Config = void 0;
class Config {
    constructor(source, whitelistFileTypes, excludeFolders, excludeFiles, targets) {
        this.Source = source;
        this.WhitelistFileTypes = whitelistFileTypes;
        this.ExcludeFolders = excludeFolders;
        this.ExcludeFiles = excludeFiles;
        this.Targets = targets;
    }
    /**
     * ToString
     */
    ToString() {
        let output = '';
        output += `\tSource: ${this.Source}\n`;
        output += `\tWhitelist: ${this.WhitelistFileTypes}\n`;
        output += `\tExcludeFolders: ${this.ExcludeFolders}\n`;
        output += `\tExcludeFiles: ${this.ExcludeFiles}\n`;
        for (const target of this.Targets) {
            output += `\tTarget: ${target.Path} | ${target.Style}\n`;
        }
        return output;
    }
}
exports.Config = Config;
// export class Target implements ITarget {
//     public Path: string;
//     public Style: LinkStyle;
//     public constructor(path: string, linkStyle: LinkStyle) {
//         this.Path = path;
//         this.Style = linkStyle;
//     }
// }


/***/ }),

/***/ 26:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.defaultTargets = exports.defaultExcludeFolders = exports.defaultExcludeFiles = exports.defaultFileTypes = exports.defaultSource = void 0;
const LinkStyle_1 = __webpack_require__(954);
exports.defaultSource = '__tests__/testData/examples/';
exports.defaultFileTypes = ['rs', 'ico'];
exports.defaultExcludeFiles = ['__tests__/testData/examples/also_decoy.rs'];
exports.defaultExcludeFolders = ['__tests__/testData/examples/decoy', '__tests__/testData/examples/excludefolder'];
exports.defaultTargets = [{ Path: '__tests__/testData/examples/README.md', Style: LinkStyle_1.LinkMarkdown.Markdown }];


/***/ }),

/***/ 119:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FileDetails = void 0;
class FileDetails {
    constructor(path) {
        this.SourcePath = path;
        this.FileName = this.GetFileName(path);
        this.Extension = this.GetFileExtension(path);
        this.Path = this.GetPathToFile(path);
    }
    GetPathToFile(path) {
        /* eslint-disable no-useless-escape */
        const regex = /^(.+\/)*([^\/]+)*$/gm;
        /* eslint-enable no-useless-escape */
        const result = regex.exec(path);
        if (result !== null && result !== undefined && result.length > 0) {
            return result[1];
        }
        return '';
    }
    GetFileName(path) {
        /* eslint-disable no-useless-escape */
        const regex = /^(.+\/)*([^\/]+)*$/gm;
        /* eslint-enable no-useless-escape */
        const result = regex.exec(path);
        if (result !== null && result !== undefined && result.length > 0) {
            return result[2];
        }
        return '';
    }
    GetFileExtension(path) {
        const regex = /(?:\.([^.]+))?$/; // Capture file extensions
        const result = regex.exec(path);
        if (result !== null && result !== undefined && result.length > 0) {
            return result[1];
        }
        else {
            return '';
        }
    }
}
exports.FileDetails = FileDetails;


/***/ }),

/***/ 835:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IncludeFolder = exports.IncludeFile = void 0;
function IncludeFile(fileDetails, config) {
    return !ExcludeFile(fileDetails.Path, config.ExcludeFiles) && WhitelistedType(fileDetails.Extension, config.WhitelistFileTypes);
}
exports.IncludeFile = IncludeFile;
function IncludeFolder(path, config) {
    return !ExcludeDirectory(path, config.ExcludeFolders);
}
exports.IncludeFolder = IncludeFolder;
function WhitelistedType(extension, types) {
    if (types.length < 1)
        return true;
    return types.some(e => e === extension);
}
function ExcludeFile(filePath, excludeFiles) {
    return excludeFiles.some(e => e === filePath);
}
function ExcludeDirectory(dirPath, excludeDirs) {
    return excludeDirs.some(e => e === dirPath);
}


/***/ }),

/***/ 366:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ParseTargets = exports.ParseInputArray = exports.ParseInput = void 0;
const core = __importStar(__webpack_require__(186));
function ParseInput(inputName) {
    const input = core.getInput(inputName);
    if (input === undefined || input === '') {
        console.log(`Config Error: Unable to get config input ${inputName}`); // Using defaults
        return undefined;
    }
    else {
        return input;
    }
}
exports.ParseInput = ParseInput;
function ParseInputArray(inputName) {
    let result;
    const input = ParseInput(inputName);
    if (input === undefined)
        return undefined;
    try {
        result = JSON.parse(input);
        return result;
    }
    catch (_a) {
        core.setFailed(`Config Error: Unable to parse array input ${inputName}`);
        return undefined;
    }
}
exports.ParseInputArray = ParseInputArray;
function ParseTargets(inputName) {
    let result;
    const input = ParseInput(inputName);
    if (input === undefined)
        return undefined;
    try {
        result = JSON.parse(input);
        return result;
    }
    catch (_a) {
        core.setFailed(`Config Error: Unable to parse target array input ${inputName}`);
        return undefined;
    }
}
exports.ParseTargets = ParseTargets;


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

/***/ 954:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LinkMarkdown = void 0;
var LinkMarkdown;
(function (LinkMarkdown) {
    LinkMarkdown[LinkMarkdown["Markdown"] = 0] = "Markdown";
    LinkMarkdown[LinkMarkdown["TOML_Path_Value"] = 1] = "TOML_Path_Value";
})(LinkMarkdown = exports.LinkMarkdown || (exports.LinkMarkdown = {}));


/***/ }),

/***/ 275:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Setup = void 0;
const core = __importStar(__webpack_require__(186));
const Config_1 = __webpack_require__(295);
const Defaults_1 = __webpack_require__(26);
const InputParser_1 = __webpack_require__(366);
const IoOperations_1 = __webpack_require__(222);
const LinkStyle_1 = __webpack_require__(954);
class Setup {
    constructor() {
        var _a, _b, _c, _d, _e;
        const source = (_a = InputParser_1.ParseInput('source')) !== null && _a !== void 0 ? _a : Defaults_1.defaultSource;
        const whitelistedExtensions = (_b = InputParser_1.ParseInputArray('file-types')) !== null && _b !== void 0 ? _b : Defaults_1.defaultFileTypes;
        const excludeFolders = (_c = InputParser_1.ParseInputArray('exclude-folders')) !== null && _c !== void 0 ? _c : Defaults_1.defaultExcludeFolders;
        const excludeFiles = (_d = InputParser_1.ParseInputArray('exclude-files')) !== null && _d !== void 0 ? _d : Defaults_1.defaultExcludeFiles;
        const targets = (_e = InputParser_1.ParseTargets('targets')) !== null && _e !== void 0 ? _e : Defaults_1.defaultTargets;
        console.log('======= Config checks =======');
        if (source === null || source === undefined) {
            core.setFailed(`Config error: Source directory not defined`);
            process.exit(1);
        }
        // Check that the source directory exists
        if (!IoOperations_1.IsValidPath(source)) {
            core.setFailed(`Source directory not found: ${source}`);
            process.exit(1);
        }
        if (targets === null || targets === undefined || targets.length < 1) {
            core.setFailed(`Config error: No targets defined`);
            process.exit(1);
        }
        for (const target of targets) {
            if (!IoOperations_1.IsValidPath(target.Path)) {
                core.setFailed(`Target not found: ${target.Path}`);
                process.exit(1);
            }
            if (!Object.values(LinkStyle_1.LinkMarkdown).includes(target.Style)) {
                core.setFailed(`Invalid Style not found: ${target.Style}`);
                process.exit(1);
            }
        }
        this.Config = new Config_1.Config(source, whitelistedExtensions, excludeFolders, excludeFiles, targets);
    }
}
exports.Setup = Setup;


/***/ }),

/***/ 14:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetSourceData = void 0;
const fs_1 = __webpack_require__(747);
const FileDetails_1 = __webpack_require__(119);
const InclusionController_1 = __webpack_require__(835);
function GetSourceData(path, config) {
    let files = [];
    const dirs = fs_1.readdirSync(path, { withFileTypes: true });
    for (const element of dirs) {
        if (element.isDirectory()) {
            if (InclusionController_1.IncludeFolder(path + element.name, config)) {
                files = files.concat(GetSourceData(`${path}${element.name}/`, config));
            }
            else {
                console.log(`Folder excluded: ${path}${element.name}`);
            }
        }
        else {
            const fileDetails = new FileDetails_1.FileDetails(path + element.name);
            // Only check files that are whitelisted and not excluded
            if (InclusionController_1.IncludeFile(fileDetails, config)) {
                files.push(fileDetails);
            }
        }
    }
    return files;
}
exports.GetSourceData = GetSourceData;


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
// import { GetExamplesFromCargo } from './CargoExamples';
// import { GetExamplesFromReadme } from './ReadmeExamples';
const Setup_1 = __webpack_require__(275);
const SourceData_1 = __webpack_require__(14);
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('======= Starting Job =======');
            console.log('======= Getting config =======');
            const config = new Setup_1.Setup().Config;
            console.log(`Running job with config: \n${config.ToString()}`);
            // Get examples from directories
            console.log('======= Getting source data =======');
            const sourceData = SourceData_1.GetSourceData(config.Source, config);
            if (sourceData.length > 0) {
                console.log(`Found ${sourceData.length} entries in ${config.Source}`);
                // for (const data of sourceData) {
                //     console.log(data);
                // }
            }
            else {
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
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}
// eslint:enable: no-console
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