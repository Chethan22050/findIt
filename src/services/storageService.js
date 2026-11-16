import { storage, isFirebaseConfigured } from './firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { validateImageFile } from '../utils/validation';

/**
 * Uploads an image file to Firebase Storage or generates a local base64 preview
 * @param {File} file - The image file to upload
 * @param {string} path - Storage folder path (e.g. 'items/userId')
 * @returns {Promise<string>} Download URL or base64 data string
 */
export async function uploadImage(file, path = 'items') {
  if (!file) return null;

  const validationError = validateImageFile(file);
  if (validationError) {
    throw new Error(validationError);
  }

  // If live Firebase Storage is active
  if (isFirebaseConfigured && storage) {
    try {
      const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const uniqueFileName = `${Date.now()}_${cleanFileName}`;
      const fullPath = `${path}/${uniqueFileName}`;
      const storageRef = ref(storage, fullPath);

      const snapshot = await uploadBytes(storageRef, file, {
        contentType: file.type,
      });

      const downloadUrl = await getDownloadURL(snapshot.ref);
      return downloadUrl;
    } catch (error) {
      console.error('Firebase Storage upload error:', error);
      throw new Error('Failed to upload image to storage. Please try again.');
    }
  }

  // Fallback to local Data URL for seamless demonstration/offline operation
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = () => reject(new Error('Failed to read image file locally.'));
    reader.readAsDataURL(file);
  });
}
