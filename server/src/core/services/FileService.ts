import * as fs from "fs/promises";
import * as path from "path";

export interface IFileService {
  createFile: (
    filePath: string,
    buffer: Buffer,
    filename: string
  ) => Promise<void>;
}

export class FileService implements IFileService {
  async createFile(
    filePath: string,
    buffer: Buffer,
    filename: string
  ): Promise<void> {
    const fullPath = path.join(filePath, filename);
    await fs.writeFile(fullPath, Buffer.from(buffer));
  }
}
