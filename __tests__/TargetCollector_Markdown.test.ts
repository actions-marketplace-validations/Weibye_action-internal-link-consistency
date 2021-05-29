import { Config } from '../src/Config';
import { TargetDataCollector } from '../src/DataCollection/TargetData';

const sourcePath = './__tests__/data/source_data/';

/**
 * This tests are specifically for Markdown
 */

test('Should read from a valid file', async () => {
    const data = new TargetDataCollector(new Config(sourcePath, ['./__tests__/data/ValidReadme.md']));
    expect(data).toBeDefined();
    expect(data.TargetData).toBeDefined();
    expect(data.TargetData.length).toBeGreaterThan(0);
    for (const targetData of data.TargetData) {
        expect(targetData.Data).toBeDefined();
        expect(targetData.Data.length).toBeGreaterThan(0);
        for (const linkData of targetData.Data) {
            expect(linkData).toBeDefined();
            expect(linkData.OriginalMatch).toBeDefined();
            expect(linkData.ParentFile).toBeDefined();
            expect(linkData.RelativePath).toBeDefined();
            expect(linkData.LineNr).toBeDefined();
            expect(linkData.Details).toBeDefined();
        }
    }
});

test('Empty document should report no results', async () => {
    const data = new TargetDataCollector(new Config(sourcePath, ['./__tests__/data/EmptyReadme.md']));
    expect(data).toBeDefined();
    expect(data.TargetData).toBeDefined();
    expect(data.TargetData.length).toEqual(1);
    for (const targetData of data.TargetData) {
        expect(targetData.Data).toBeDefined();
        expect(targetData.Data.length).toEqual(0);
    }
});

test('Document with content but no relative links should report no results', async () => {
    const data = new TargetDataCollector(new Config(sourcePath, ['./__tests__/data/MarkdownExample.md']));
    expect(data).toBeDefined();
    expect(data.TargetData).toBeDefined();
    expect(data.TargetData.length).toEqual(1);
    for (const targetData of data.TargetData) {
        expect(targetData.Data).toBeDefined();
        expect(targetData.Data.length).toEqual(0);
    }
});

test('Should pick up links outside the scope of source', async () => {
    // Scope is ./__tests__/validData/data/*
    const data = new TargetDataCollector(new Config('./__tests__/data/source_data/', ['./__tests__/data/OutOfScope.md']));
    expect(data).toBeDefined();
    expect(data.TargetData).toBeDefined();
    // Should have 1 target
    expect(data.TargetData.length).toEqual(1);
    for (const targetData of data.TargetData) {
        expect(targetData.Data).toBeDefined();
        // Both links in this document should be counted
        expect(targetData.Data.length).toEqual(2);
    }
});

test('Should not pick up external links from document', async () => {
    const data = new TargetDataCollector(new Config(sourcePath, ['./__tests__/data/ExternalLinks.md']));
    expect(data).toBeDefined();
    expect(data.TargetData).toBeDefined();
    expect(data.TargetData.length).toEqual(1);
    for (const targetData of data.TargetData) {
        expect(targetData.Data).toBeDefined();
        expect(targetData.Data.length).toEqual(0);
    }
});

test('Should not pick up doc links to titles / other sections of the document', async () => {
    const data = new TargetDataCollector(new Config(sourcePath, ['./__tests__/data/DocLinks.md']));
    expect(data).toBeDefined();
    expect(data.TargetData).toBeDefined();
    expect(data.TargetData.length).toEqual(1);
    for (const targetData of data.TargetData) {
        expect(targetData.Data).toBeDefined();
        expect(targetData.Data.length).toEqual(0);
    }
});

test('Links to ignored files should be ignored', async () => {
    const data = new TargetDataCollector(
        new Config(
            sourcePath,
            ['./__tests__/data/IgnoreFiles.md'],
            [],
            [],
            ['./__tests__/data/source_data/ignorefolder/07.test', './__tests__/data/source_data/ignorefolder/should_be_ignored.sample']
        )
    );
    expect(data).toBeDefined();
    expect(data.TargetData).toBeDefined();
    expect(data.TargetData.length).toEqual(1);
    for (const targetData of data.TargetData) {
        expect(targetData.Data).toBeDefined();
        expect(targetData.Data.length).toEqual(0);
    }
});

test('Links to files in ignored folders should be ignored', async () => {
    const data = new TargetDataCollector(new Config(sourcePath, ['./__tests__/data/IgnoreFiles.md'], [], ['./__tests__/data/source_data/ignorefolder'], []));
    expect(data).toBeDefined();
    expect(data.TargetData).toBeDefined();
    expect(data.TargetData.length).toEqual(1);
    for (const targetData of data.TargetData) {
        expect(targetData.Data).toBeDefined();
        expect(targetData.Data.length).toEqual(0);
    }
});

test('Should not pick up links that are commented out', async () => {
    const data = new TargetDataCollector(new Config(sourcePath, ['./__tests__/data/Comments.md']));
    expect(data).toBeDefined();
    expect(data.TargetData).toBeDefined();
    expect(data.TargetData.length).toEqual(1);
    for (const targetData of data.TargetData) {
        expect(targetData.Data).toBeDefined();
        expect(targetData.Data.length).toEqual(0);
    }
});
