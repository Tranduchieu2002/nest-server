import fs from 'fs';
import nodePath from 'path';
import { parse, stringify } from 'yaml'
export const SystemFileUtils = {
  jsonFileReader: async (filePath: string): Promise<any> => {
    const fileContent =
      (await SystemFileUtils.fileAsStringReader(filePath)) ?? '';
    return JSON.parse(fileContent);
  },
  fileAsStringReader: async (filePath: string): Promise<string | undefined> => {
    try {
      const fileContent = await SystemFileUtils.fileReader(filePath);
      return (
        fileContent as { toString: (fileContent: string) => string | undefined }
      ).toString('utf8');
    } catch (e) {
      return undefined;
    }
  },
  fileReader: (path: string) =>
    new Promise((resolve, reject) => {
      fs.readFile(path, 'utf8', (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    }),
  getConfigs: (fileName: string) => {
    const filePath = nodePath.join(__dirname, `../configs/${fileName}`);
    return SystemFileUtils.jsonFileReader(filePath);
  },
  readYamlFilesFromFixtures: (folderName: string = 'admin') => {
    const organizationDir = nodePath.join(__dirname, `../../fixtures/${folderName}`);
    const files = fs.readdirSync(organizationDir);
    const result = new Array<unknown>()
    for (const file of files) {
      if (file.endsWith(".yml")) {
        const sourceFile = nodePath.join(organizationDir, file);
        const yamlObject: any = parse(fs.readFileSync(sourceFile, "utf8"));
        result.push(yamlObject)
      }
    }
    return result
  }
};
