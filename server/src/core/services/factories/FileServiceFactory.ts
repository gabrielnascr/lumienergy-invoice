import { FileService, IFileService } from "../FileService";

export class FileServiceFactory {
  static create(): IFileService {
    return new FileService();
  }
}
