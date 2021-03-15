import {FileData} from './FileData'

export function CrossReference(
  diskExamples: FileData[],
  cargoExamples: FileData[],
  readmeExamples: FileData[]
): void {
  // let issueList = new Array()

  for (const diskEntry of diskExamples) {
    let cargoEntry = undefined
    if (cargoExamples.length > 0) {
      cargoEntry = FindMatchingElement(diskEntry, cargoExamples)
      if (cargoEntry !== null) {
        cargoExamples.splice(cargoEntry.index, 1)
        if (cargoEntry.match.name !== diskEntry.name) {
          console.log(
            `Issue: Cargo name does not match: 
                        \nSource name: ${diskEntry.name} : Target name: ${cargoEntry.match.name}`
          )
        }
        if (cargoEntry.match.path !== diskEntry.path) {
          console.log(
            `Issue: Cargo path does not match: 
                        \nSource path: ${diskEntry.path} : Target path: ${cargoEntry.match.path}`
          )
        }
      }
    }

    let readmeEntry = undefined
    if (readmeExamples.length > 0) {
      readmeEntry = FindMatchingElement(diskEntry, readmeExamples)
      if (readmeEntry !== null) {
        readmeExamples.splice(readmeEntry.index, 1)
        if (readmeEntry.match.name !== diskEntry.name) {
          console.log(
            `Issue: Readme name does not match: 
                        \nSource name: ${diskEntry.name} : Target name: ${readmeEntry.match.name}`
          )
        }
        if (readmeEntry.match.path !== diskEntry.path) {
          console.log(
            `Issue: Readme path does not match: 
                        \nSource path: ${diskEntry.path} : Target path: ${readmeEntry.match.path}`
          )
        }
      }
    }
  }

  if (cargoExamples.length > 0) {
    for (const leftOverCargoEntry of cargoExamples) {
      console.log(
        `Issue: Entry found in Cargo but not in source: ${leftOverCargoEntry.path}`
      )
    }
  }

  if (readmeExamples.length > 0) {
    for (const leftOverReadme of readmeExamples) {
      console.log(
        `Issue: Entry found in Readme but not in source: ${leftOverReadme.path}`
      )
    }
  }
  // return issueList
}

// function GetValidFlags(
//     disk: FileData | undefined,
//     cargo: FileData | undefined,
//     readme: FileData | undefined
// ) {
//     let diskName = false
//     let cargoName = false
//     let readmeName = false

//     // if (disk !== undefined) diskName = true;
//     // if (cargo !== undefined) cargoName = disk?.name
//     return {
//         names: disk?.name === cargo?.name && disk?.name === readme?.name,
//         paths: disk?.path === cargo?.path && disk?.path === readme?.path
//     }
// }

//     if (enableReadmeCheck) {
//         let inReadme = false;
//         let validReadmePath = false;
//         let validReadmeName = false;

//         let fromReadme = PopElementByPath(readmeExamples, diskExample.path);
//         if (fromReadme === undefined) {
//             fromReadme = PopElementByName(readmeExamples, diskExample.name);
//         }

//         if (fromReadme !== undefined) {
//             inReadme = true;
//             validReadmeName = fromReadme.name === diskExample.name;
//             validReadmePath = fromReadme.path === diskExample.path;
//         }
//     }

//     if (enableCargoCheck) {
//         let inCargo = false;
//         let validCargoPath = false;
//         let validCargoName = false;
//         let fromCargo = PopElementByPath(cargoExamples, diskExample.path);
//         if (fromCargo === undefined) {
//             fromCargo = PopElementByName(cargoExamples, diskExample.name);
//         }

//         if (fromCargo !== undefined) {
//             inCargo = true;
//             validCargoName = fromCargo.name === diskExample.name;
//             validCargoPath = fromCargo.path === diskExample.path;
//         }
//     }

//     if (!(inReadme && validReadmePath && validReadmeName && inCargo && validCargoPath && validCargoName)) {
//         issueList.push({
//             name: diskExample.name,
//             path: diskExample.path,
//             inDisk: true,
//             inCargo: inCargo,
//             inReadme: inReadme,
//             validCargoName: validCargoName,
//             validCargoPath: validCargoPath,
//             validReadmeName: validReadmeName,
//             validReadmePath: validReadmePath
//         });
//     }
// }

// if (readmeExamples.length > 0) {
//     for (const example of readmeExamples) {
//         let inCargo = false;
//         let validCargoPath = false;
//         let validCargoName = false;
//         let fromCargo = PopElementByPath(cargoExamples, example.path);
//         if (fromCargo === undefined) {
//             fromCargo = PopElementByName(cargoExamples, example.name);
//         }

//         if (fromCargo !== undefined) {
//             inCargo = true;
//             validCargoName = fromCargo.name === diskExample.name;
//             validCargoPath = fromCargo.path === diskExample.path;
//         }

//         if (!(inCargo && validCargoPath && validCargoName)) {
//             issueList.push({
//                 name: example.name,
//                 path: example.path,
//                 inDisk: false,
//                 inCargo: inCargo,
//                 inReadme: true,
//                 validCargoName: validCargoName,
//                 validCargoPath: validCargoPath,
//                 validReadmeName: true,
//                 validReadmePath: true
//             });
//         }
//     }
// }

// if (cargoExamples.length > 0) {
//     for (const example of cargoExamples) {
//         let inReadme = false;
//         let validReadmePath = false;
//         let validReadmeName = false;

//         let fromReadme = PopElementByPath(readmeExamples, example.path);
//         if (fromReadme === undefined) {
//             fromReadme = PopElementByName(readmeExamples, example.name);
//         }

//         if (fromReadme !== undefined) {
//             inReadme = true;
//             validReadmeName = fromReadme.name === example.name;
//             validReadmePath = fromReadme.path === example.path;
//         }

//         if (!(inReadme && validReadmeName && validReadmePath)) {
//             issueList.push({
//                 name: example.name,
//                 path: example.path,
//                 inDisk: false,
//                 inCargo: true,
//                 inReadme: inReadme,
//                 validCargoName: true,
//                 validCargoPath: true,
//                 validReadmeName: validReadmeName,
//                 validReadmePath: validReadmePath
//             });
//         }
// }
// }

function FindMatchingElement(
  data: FileData,
  listToSearchThrough: FileData[]
): {match: FileData; index: number} | null {
  const match =
    listToSearchThrough.find(e => e.path === data.path) ??
    listToSearchThrough.find(e => e.name === data.name)
  if (match !== undefined) {
    const index = listToSearchThrough.indexOf(match)
    return {match, index}
  } else {
    return null
  }
}
