import { Storage } from '@google-cloud/storage';
import * as functions from '@google-cloud/functions-framework';

const storage = new Storage();
const bucket = storage.bucket('your-bucket-name');

interface GenerateUrlRequest {
  fileName: string;
  contentType: string;
  galleryId: string;
  userId: string;
}

export const generateSignedUrl = functions.http('generateSignedUrl', async (req, res) => {
  try {
    const { fileName, contentType, galleryId, userId } = req.body as GenerateUrlRequest;
    
    // Generate a unique file path
    const filePath = `galleries/${galleryId}/${userId}/${fileName}`;
    
    const [url] = await bucket.file(filePath).getSignedUrl({
      version: 'v4',
      action: 'write',
      expires: Date.now() + 15 * 60 * 1000, // 15 minutes
      contentType,
    });

    res.json({ url, filePath });
  } catch (error) {
    console.error('Error generating signed URL:', error);
    res.status(500).json({ error: 'Failed to generate signed URL' });
  }
}); 