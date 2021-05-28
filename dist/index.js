require('./sourcemap-register.js');/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 351:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.issue = exports.issueCommand = void 0;
const os = __importStar(__nccwpck_require__(87));
const utils_1 = __nccwpck_require__(278);
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
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
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
exports.getState = exports.saveState = exports.group = exports.endGroup = exports.startGroup = exports.info = exports.warning = exports.error = exports.debug = exports.isDebug = exports.setFailed = exports.setCommandEcho = exports.setOutput = exports.getBooleanInput = exports.getInput = exports.addPath = exports.setSecret = exports.exportVariable = exports.ExitCode = void 0;
const command_1 = __nccwpck_require__(351);
const file_command_1 = __nccwpck_require__(717);
const utils_1 = __nccwpck_require__(278);
const os = __importStar(__nccwpck_require__(87));
const path = __importStar(__nccwpck_require__(622));
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
 * Gets the value of an input.
 * Unless trimWhitespace is set to false in InputOptions, the value is also trimmed.
 * Returns an empty string if the value is not defined.
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
    if (options && options.trimWhitespace === false) {
        return val;
    }
    return val.trim();
}
exports.getInput = getInput;
/**
 * Gets the input value of the boolean type in the YAML 1.2 "core schema" specification.
 * Support boolean input list: `true | True | TRUE | false | False | FALSE` .
 * The return value is also in boolean type.
 * ref: https://yaml.org/spec/1.2/spec.html#id2804923
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   boolean
 */
function getBooleanInput(name, options) {
    const trueValue = ['true', 'True', 'TRUE'];
    const falseValue = ['false', 'False', 'FALSE'];
    const val = getInput(name, options);
    if (trueValue.includes(val))
        return true;
    if (falseValue.includes(val))
        return false;
    throw new TypeError(`Input does not meet YAML 1.2 "Core Schema" specification: ${name}\n` +
        `Support boolean input list: \`true | True | TRUE | false | False | FALSE\``);
}
exports.getBooleanInput = getBooleanInput;
/**
 * Sets the value of an output.
 *
 * @param     name     name of the output to set
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setOutput(name, value) {
    process.stdout.write(os.EOL);
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
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


// For internal use, subject to change.
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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.issueCommand = void 0;
// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
const fs = __importStar(__nccwpck_require__(747));
const os = __importStar(__nccwpck_require__(87));
const utils_1 = __nccwpck_require__(278);
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
exports.toCommandValue = void 0;
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
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
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
/******/ 			__webpack_modules__[moduleId].call(module.exports, module, module.exports, __nccwpck_require__);
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
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__nccwpck_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
// ESM COMPAT FLAG
__nccwpck_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/@actions/core/lib/core.js
var core = __nccwpck_require__(186);
// EXTERNAL MODULE: external "fs"
var external_fs_ = __nccwpck_require__(747);
// EXTERNAL MODULE: external "path"
var external_path_ = __nccwpck_require__(622);
;// CONCATENATED MODULE: ./src/FileDetails.ts

class FileDetails {
    constructor(path) {
        const result = (0,external_path_.parse)(path);
        this.FullPath = path;
        this.Root = result.root;
        this.Dir = result.dir;
        this.Base = result.base;
        this.Name = result.name;
        this.Ext = result.ext;
    }
}

;// CONCATENATED MODULE: ./src/SupportedFormats.ts
const SupportedFormats = [
    {
        Ext: '.md',
        Pattern: /^(?!<!--).*\[[^[]+\]\(([^)]+)\)/gm
    },
    {
        Ext: '.toml',
        Pattern: /^(?!#).*path\s=\s"(.*)"$/gm
    }
];

;// CONCATENATED MODULE: ./src/Config.ts




class Config {
    constructor(source, targets, fileTypes, excludeFolders, excludeFiles) {
        this.SupportedFormats = SupportedFormats;
        // SOURCE
        if (this.IsValidRelativePath(source)) {
            const normalizedSource = (0,external_path_.normalize)(source);
            this.Source = normalizedSource;
        }
        else {
            throw new Error(`[Config]: Source path not valid: ${source}`);
        }
        // TARGETS
        this.Targets = [];
        for (const targetPath of targets) {
            const normalizedPath = (0,external_path_.normalize)(targetPath);
            if (this.IsValidRelativePath(normalizedPath)) {
                const targetDetails = new FileDetails(normalizedPath);
                const patternData = this.SupportedFormats.find(e => e.Ext === targetDetails.Ext);
                if (patternData === undefined) {
                    throw new Error(`[Config]: Target must be a supported document type: \n Current: ${targetDetails.Ext} | Supported: ${this.SupportedFormats.map(e => e.Ext)}`);
                }
                this.Targets.push({
                    FullPath: targetDetails.FullPath,
                    Dir: targetDetails.Dir,
                    Base: targetDetails.Base,
                    Name: targetDetails.Name,
                    Ext: targetDetails.Ext,
                    Root: targetDetails.Root,
                    Pattern: patternData.Pattern
                });
            }
            else {
                throw new Error(`[Config]: Target path not valid: ${targetPath}`);
            }
        }
        // FILE TYPES
        this.FileTypes = [];
        if (fileTypes !== undefined) {
            for (const fileType of fileTypes) {
                if (fileType === '') {
                    throw new Error(`[Config]: Can't have an empty string as extension`);
                }
                else {
                    this.FileTypes.push(fileType);
                }
            }
        }
        this.ExcludeFolders = [];
        if (excludeFolders !== undefined) {
            for (const excludeFolder of excludeFolders) {
                if (excludeFolder === '') {
                    throw new Error(`[Config]: Can't have an empty exclude folder`);
                }
                const normalizedFolderPath = (0,external_path_.normalize)(excludeFolder);
                if ((0,external_path_.isAbsolute)(normalizedFolderPath)) {
                    throw new Error(`[Config]: ExcludeFolder is not a valid relative path: ${normalizedFolderPath}`);
                }
                else {
                    this.ExcludeFolders.push(normalizedFolderPath);
                }
            }
        }
        this.ExcludeFiles = [];
        if (excludeFiles !== undefined) {
            for (const excludeFile of excludeFiles) {
                if (excludeFile === '') {
                    throw new Error(`[Config]: Can't have an empty exclude file`);
                }
                const normalizedFile = (0,external_path_.normalize)(excludeFile);
                if ((0,external_path_.isAbsolute)(normalizedFile)) {
                    throw new Error(`[Config]: ExcludeFile is not a valid relative path: ${normalizedFile}`);
                }
                else {
                    this.ExcludeFiles.push(normalizedFile);
                }
            }
        }
    }
    /**
     * Returns the config in a prettified readable string.
     */
    ToString() {
        let output = '';
        output += `\tSource: ${this.Source}\n`;
        output += `\tFileTypes: ${this.FileTypes}\n`;
        output += `\tExcludeFolders: ${this.ExcludeFolders}\n`;
        output += `\tExcludeFiles: ${this.ExcludeFiles}\n`;
        for (const target of this.Targets) {
            output += `\tTarget: ${target.FullPath} | Ext: ${target.Ext}\n`;
        }
        return output;
    }
    IsValidRelativePath(path) {
        if ((0,external_path_.isAbsolute)(path)) {
            throw new Error(`[Config]: Path must be relative: ${path}`);
        }
        if (!(0,external_fs_.existsSync)(path)) {
            throw new Error(`[Config]: Path does not exist: ${path}`);
        }
        return true;
    }
}

;// CONCATENATED MODULE: ./src/Defaults.ts
const defaultSource = './__tests__/data/source_data/';
const defaultFileTypes = ['.test'];
const defaultExcludeFiles = ['./__tests__/data/source_data/should_be_ignored.test'];
const defaultExcludeFolders = ['./__tests__/data/source_data/ignorefolder'];
const defaultTargets = ['./__tests__/data/ValidToml.toml', './__tests__/data/ValidReadme.md'];

;// CONCATENATED MODULE: ./src/InputParser.ts

function ParseInput(inputName) {
    const input = core.getInput(inputName);
    if (input === undefined || input === '') {
        // core.setFailed(`Config Error: Unable to get array input ${inputName}`);
        // console.log(`Config Error: Unable to get config input ${inputName}`); // Using defaults
        return undefined;
    }
    else {
        return input;
    }
}
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

;// CONCATENATED MODULE: ./src/Setup.ts



class Setup {
    constructor() {
        var _a, _b, _c, _d, _e;
        // console.log('======= Retrieve inputs =======');
        const source = (_a = ParseInput('source')) !== null && _a !== void 0 ? _a : defaultSource;
        const fileTypes = (_b = ParseInputArray('file-types')) !== null && _b !== void 0 ? _b : defaultFileTypes;
        const excludeFolders = (_c = ParseInputArray('exclude-folders')) !== null && _c !== void 0 ? _c : defaultExcludeFolders;
        const excludeFiles = (_d = ParseInputArray('exclude-files')) !== null && _d !== void 0 ? _d : defaultExcludeFiles;
        const targets = (_e = ParseTargets('targets')) !== null && _e !== void 0 ? _e : defaultTargets;
        this.Config = new Config(source, targets, fileTypes, excludeFolders, excludeFiles);
    }
}

;// CONCATENATED MODULE: ./src/InclusionController.ts
function IncludeFile(fileDetails, config) {
    return !ExcludeFile(fileDetails.FullPath, config.ExcludeFiles, config.ExcludeFolders) && WhitelistedType(fileDetails.Ext, config.FileTypes);
}
function IncludeFolder(path, config) {
    return !ExcludeDirectory(path, config.ExcludeFolders);
}
function WhitelistedType(extension, types) {
    if (types.length < 1)
        return true;
    return types.some(e => e === extension);
}
function ExcludeFile(filePath, excludeFiles, excludeDirs) {
    const excludeByDir = excludeDirs.some(dir => filePath.includes(dir));
    const excludeByFile = excludeFiles.some(e => e === filePath);
    return excludeByDir || excludeByFile;
}
function ExcludeDirectory(dirPath, excludeDirs) {
    return excludeDirs.some(e => e === dirPath);
}

;// CONCATENATED MODULE: ./src/DataCollection/SourceData.ts




class SourceDataCollector {
    constructor(config) {
        this.FileDetails = this.GetSourceData(config.Source, config);
    }
    GetSourceData(path, config) {
        let files = [];
        const dirs = (0,external_fs_.readdirSync)(path, { withFileTypes: true });
        for (const element of dirs) {
            const elementPath = (0,external_path_.join)(path, element.name);
            if (element.isDirectory()) {
                if (IncludeFolder(elementPath, config)) {
                    files = files.concat(this.GetSourceData(elementPath, config));
                }
            }
            else {
                const fileDetails = new FileDetails(elementPath);
                // Only check files that are whitelisted and not excluded
                if (IncludeFile(fileDetails, config)) {
                    files.push(fileDetails);
                }
            }
        }
        return files;
    }
}

;// CONCATENATED MODULE: ./src/IoOperations.ts

function IsValidPath(path) {
    return existsSync(path);
}
function ReadFileFromPath(path) {
    if (!(0,external_fs_.existsSync)(path))
        throw new Error('Invalid Path');
    return (0,external_fs_.readFileSync)(path, { encoding: 'utf8' });
}

;// CONCATENATED MODULE: ./src/DataCollection/TargetData.ts




class TargetDataCollector {
    constructor(config) {
        this.TargetData = [];
        for (const target of config.Targets) {
            const data = this.GetTargetData(target, config);
            if (data.length >= 0) {
                this.TargetData.push({ Target: target.FullPath, Data: data });
            }
        }
    }
    GetTargetData(target, config) {
        // console.log(`Getting data from: ${target.Path}`);
        const output = [];
        // Read the contents of the file
        const content = ReadFileFromPath(target.FullPath);
        if (content.length <= 0)
            return [];
        const preProcessor = [];
        const matches = content.matchAll(target.Pattern);
        // Scan through the document and parse any links contained therein
        for (const match of matches) {
            if (match.index === undefined) {
                throw new Error('Could not index of match. Something is wrong somewhere');
            }
            else {
                preProcessor.push({ Orig: match[0], Link: match[1], Target: target, Line: GetLineNr(content, match.index) });
            }
        }
        // Parse through the links
        for (const data of preProcessor) {
            if (this.IgnoreLink(data.Link)) {
                continue;
            }
            else {
                const rootPath = (0,external_path_.join)(data.Target.Dir, data.Link);
                if (this.InTargetScope(rootPath, config.Source) && !ExcludeFile(rootPath, config.ExcludeFiles, config.ExcludeFolders)) {
                    output.push({
                        Details: new FileDetails(rootPath),
                        RelativePath: data.Link,
                        OriginalMatch: data.Orig,
                        ParentFile: data.Target,
                        LineNr: data.Line
                    });
                }
            }
        }
        return output;
    }
    IgnoreLink(link) {
        return this.WebLink(link) || this.DocLink(link);
    }
    InTargetScope(path, scope) {
        return path.includes(scope);
    }
    WebLink(link) {
        const webLinks = /^https*:\/\//gm;
        return webLinks.exec(link) !== null;
    }
    DocLink(link) {
        const docLink = /^#/gm;
        return docLink.exec(link) !== null;
    }
}
function GetLineNr(content, charIndex) {
    const subString = content.substring(0, charIndex);
    return subString.split('\n').length;
}

;// CONCATENATED MODULE: ./src/CrossReferencer.ts
class CrossReferencer {
    constructor(sourceData, targetData) {
        this.MissingFromTargets = [];
        this.MissingFromSource = [];
        // const clonedSource = [...sourceData];
        const clonedTarget = [...targetData];
        for (const source of sourceData) {
            let matchesCount = 0;
            const missingFromTarget = [];
            for (const clonedTargetData of clonedTarget) {
                const match = clonedTargetData.Data.find(e => e.Details.FullPath === source.FullPath);
                if (match !== undefined) {
                    // Add to the match count
                    matchesCount++;
                    // Remove element from the target data list
                    clonedTargetData.Data.splice(clonedTargetData.Data.indexOf(match), 1);
                }
                else {
                    missingFromTarget.push(clonedTargetData.Target);
                }
            }
            // If we find that this source was present in all targets, we can remove it from the list
            if (matchesCount === targetData.length) {
                // Do nothing, it is present in all targets
            }
            else if (matchesCount === 0) {
                // not present in any targets
                this.MissingFromTargets.push({ Path: source.FullPath, MissingTargets: targetData.map(e => e.Target) });
            }
            else {
                // File present in some, but not all targets
                this.MissingFromTargets.push({ Path: source.FullPath, MissingTargets: missingFromTarget });
            }
        }
        for (const target of clonedTarget) {
            for (const data of target.Data) {
                this.MissingFromSource.push({
                    Path: data.Details.FullPath,
                    InTarget: data.ParentFile.FullPath,
                    Line: data.LineNr
                });
            }
        }
        this.HasIssues = this.MissingFromTargets.length + this.MissingFromSource.length > 0;
    }
}

;// CONCATENATED MODULE: ./src/IssueLogger.ts
class IssueLogger {
    constructor(sourceIssues, targetIssues) {
        this.issueIter = 1;
        this.IssueCount = sourceIssues.length + targetIssues.length;
        this.TargetIssueOutput = '';
        this.SourceIssueOutput = '';
        if (targetIssues.length > 0) {
            this.TargetIssueOutput += `Link(s) was found in document(s) but does not point to a valid file:\n`;
            for (const issue of targetIssues) {
                this.TargetIssueOutput += `\n${this.GetIssueNumber()} Link: ${issue.Path}\n\tDoes not lead to a valid file. Found in document: \n\t\t${issue.InTarget} : Line: ${issue.Line}\n`;
            }
            this.TargetIssueOutput += '\nPlease fix any typos in the link, or remove the link from the document(s).';
        }
        if (sourceIssues.length > 0) {
            this.SourceIssueOutput += `Following files in folders was not found linked in document(s):\n`;
            for (const issue of sourceIssues) {
                this.SourceIssueOutput += `\n${this.GetIssueNumber()} File: ${issue.Path} \n\tIs missing from following document(s):`;
                for (const missingTarget of issue.MissingTargets) {
                    this.SourceIssueOutput += `\n\t\t${missingTarget}`;
                }
                this.SourceIssueOutput += `\n`;
            }
            this.SourceIssueOutput += `\nPlease add them to the documents listed or remove them from folders.`;
        }
    }
    PrintIssues() {
        if (this.TargetIssueOutput === '' && this.SourceIssueOutput === '') {
            return;
        }
        console.error(`▼ ▼ ▼ ▼ ${this.IssueCount} issue(s) need to be fixed ▼ ▼ ▼\
            \n${this.TargetIssueOutput}\
            \n\n${this.SourceIssueOutput}\
            \n▲ ▲ ▲ ▲ ▲ ▲ ▲ End of issue(s) ▲ ▲ ▲ ▲ ▲ ▲ ▲`);
    }
    GetIssueNumber() {
        return `[${this.issueIter++}/${this.IssueCount}] =>`;
    }
}

;// CONCATENATED MODULE: ./src/Main.ts
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// eslint:disable: no-console

// const github = require('@actions/github');





function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('======= Running internal link consistency check =======');
            const config = new Setup().Config;
            console.log(`Running job with config: \n${config.ToString()}`);
            // console.log('======= Getting source data =======');
            const sourceData = new SourceDataCollector(config).FileDetails;
            if (sourceData.length <= 0) {
                core.setFailed('Found no entries in source');
            }
            // console.log('======= Getting target data =======');
            const targetData = new TargetDataCollector(config).TargetData;
            if (targetData.length <= 0) {
                core.setFailed('Found no entries in target(s)');
            }
            // console.log('======= Cross referencing issues =======');
            const crossChecker = new CrossReferencer(sourceData, targetData);
            if (crossChecker.HasIssues) {
                const output = new IssueLogger(crossChecker.MissingFromTargets, crossChecker.MissingFromSource);
                // core.setOutput('SourceIssues', output.SourceIssueOutput);
                output.PrintIssues();
                core.setFailed('✗ Cross referencing found issues, see output log to fix them');
            }
            else {
                console.log('✓ All checks passes.');
            }
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}
// eslint:enable: no-console
run();

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=index.js.map