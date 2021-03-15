import {FileData} from './FileData'
import {ReadFileFromPath} from './IoOperations'

export function GetExamplesFromCargo(
  path: string,
  ignoreFiles: string[],
  ignoreFolders: string[]
): FileData[] {
  const rawData: string = ReadFileFromPath(path)

  const examplePattern = /(?<=\[\[example\]\]).+?name\s=\s\\"(.+?)\\".+?path\s=\s\\"(.+?)\\"/gm

  const matches = rawData.matchAll(examplePattern)

  const outputData = []
  for (const match of matches) {
    const file = match[2].split('/')
    outputData.push({
      name: match[1],
      fileName: file[file.length - 1],
      path: match[2]
    })
  }
  return outputData
}
