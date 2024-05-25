import {
  ref,
  uploadBytes,
  deleteObject,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "../../../core/config/firebase";

export class FirebaseStorageService {
  async uploadFile(
    path: string,
    file: Buffer,
    filename: string
  ): Promise<string> {
    const fileRef = ref(storage, `${path}/${filename}`);
    const metadata = {
      contentType: "application/pdf",
    };
    try {
      const snapshot = await uploadBytes(fileRef, file, metadata);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  }

  async deleteFile(path: string, filename: string): Promise<void> {
    const fileRef = ref(storage, `${path}/${filename}`);

    try {
      await deleteObject(fileRef);
    } catch (error) {
      throw error;
    }
  }
}
