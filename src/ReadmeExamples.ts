import {FileData} from './FileData'
import {ReadFileFromPath} from './IoOperations'

export function GetExamplesFromReadme(
  path: string,
  excludeFiles: string[],
  excludeFolders: string[]
): FileData[] {
  const output = []
  const pathElements = path.split('/')
  let relativePath = ''
  for (let index = 0; index < pathElements.length - 1; index++) {
    relativePath += `${pathElements[index]}/`
  }

  // console.log(relativePath);

  const data = ReadFileFromPath(path)
  const regex = /(?<=(E|e)xample\s\|\s((F|f)ile|(M|m)ain)\s\|\s(D|d)escription\\r\\n-{3}\s\|\s-{3}\s\|\s-{3}\\r\\n)(.*?)(?=\\r\\n\\r\\n#)/gm

  // Splits the README into sections based on the tables listing examples
  const sections = []
  const sectionMatches = data.matchAll(regex)
  for (const match of sectionMatches) {
    sections.push(match[0])
  }

  const sectionSplit = /\\r\\n/
  const sectionRegex = /`(.+?)`\s\|\s.*?`(.+?)`.*\((.+?)\)\s\|\s(.*?)$/gm

  // further parse the sections into individual examples
  for (const section of sections) {
    const splitStrings = section.split(sectionSplit)
    for (const string of splitStrings) {
      const result = string.matchAll(sectionRegex)
      for (const exampleRawData of result) {
        const filePath = exampleRawData[3].split('/')

        // Ensure we construct an absolute path to the file
        let absolutePath = relativePath
        for (let index = 1; index < filePath.length; index++) {
          absolutePath +=
            index === filePath.length - 1
              ? filePath[index]
              : `${filePath[index]}/`
        }

        const example = {
          name: exampleRawData[1],
          fileName: filePath[filePath.length - 1],
          path: absolutePath,
          description: exampleRawData[4]
        }
        output.push(example)
        // console.log(example);
      }
    }
  }

  return output
}
