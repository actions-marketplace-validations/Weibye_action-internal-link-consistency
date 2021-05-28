import { Config } from '../src/Config';

// CONFIG
test('Valid config should be valid', async () => {
    const source = '__tests__/data/source_data/';
    const fileTypes = ['file', 'types'];
    const excludeFolders = ['__tests__/data/source_data/ignorefolder'];
    const excludeFiles = ['./__tests__/data/source_data/should_be_ignored.test'];
    const targets = ['./__tests__/data/ValidReadme.md', './__tests__/data/ValidToml.toml'];
    const configObject = new Config(source, targets, fileTypes, excludeFolders, excludeFiles);

    expect(configObject).toBeDefined();
    expect(configObject.Source).toBeDefined();
    expect(configObject.FileTypes).toBeDefined();
    expect(configObject.ExcludeFiles).toBeDefined();
    expect(configObject.ExcludeFolders).toBeDefined();
    expect(configObject.Targets).toBeDefined();

    const optionalConf = new Config(source, targets);
    expect(optionalConf).toBeDefined();
    expect(optionalConf.Source).toBeDefined();
    expect(optionalConf.FileTypes).toBeDefined();
    expect(optionalConf.ExcludeFiles).toBeDefined();
    expect(optionalConf.ExcludeFolders).toBeDefined();
    expect(optionalConf.Targets).toBeDefined();

    expect(optionalConf.FileTypes).toEqual([]);
    expect(optionalConf.ExcludeFolders).toEqual([]);
    expect(optionalConf.ExcludeFiles).toEqual([]);
});

// SOURCE PATH
test('Source path must be a valid string', async () => {
    expect(() => new Config('', ['./__tests__/data/ValidReadme.md'])).toThrowError();
});
test('Source path must exist', async () => {
    expect(() => new Config('./not_existing/', ['./__tests__/data/ValidReadme.md'])).toThrowError();
});

// TARGETS
test('Target must be a valid string', async () => {
    expect(() => new Config('./__tests__/data/source_data/', [''])).toThrowError();
});
test('Target must exist', async () => {
    expect(new Config('./__tests__/data/source_data/', ['./__tests__/data/ValidReadme.md'])).toBeDefined();
    expect(() => new Config('./__tests__/data/source_data/', ['./__tests__/validData/NonExisting.md'])).toThrowError();
});
test('Target must be supported file type', async () => {
    expect(new Config('./__tests__/data/source_data/', ['./__tests__/data/ValidReadme.md'])).toBeDefined();
    expect(() => new Config('./__tests__/data/source_data/', ['./__tests__/validData/ValidReadme.notsupported'])).toThrowError();
});

// FILE TYPES
// empty file types should produce a valid config
test('No file-types is valid', async () => {
    expect(new Config('./__tests__/data/source_data/', ['./__tests__/data/ValidReadme.md'])).toBeDefined();
});
test('File-type entry should not be empty', async () => {
    expect(() => new Config('./__tests__/data/source_data/', ['./__tests__/data/ValidReadme.md'], [''])).toThrowError();
});

// EXCLUDE FOLDERS
test('No exclude folders should produce a valid config', async () => {
    expect(new Config('./__tests__/data/source_data/', ['./__tests__/data/ValidReadme.md'], [], [])).toBeDefined();
});
test('Should not matter if folder exists or not', async () => {
    expect(new Config('./__tests__/data/source_data/', ['./__tests__/data/ValidReadme.md'], [], ['./imaginary/folder/'])).toBeDefined();
    expect(new Config('./__tests__/data/source_data/', ['./__tests__/data/ValidReadme.md'], [], ['./__tests__/data/source_data/ignorefolder/'])).toBeDefined();
});

// EXCLUDE FILES
test('No exclude files is valid', async () => {
    expect(new Config('./__tests__/data/source_data/', ['./__tests__/data/ValidReadme.md'], [], [], [])).toBeDefined();
});
test('Exclude file-path must be not empty', async () => {
    expect(() => new Config('./__tests__/data/source_data/', ['./__tests__/data/ValidReadme.md'], [], [], [''])).toThrowError();
});
