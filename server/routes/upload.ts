import { Router, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import sharp from 'sharp';

const router = Router();

// Ensure images directory exists
const imagesDir = path.join(process.cwd(), 'public', 'imagens');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
});

// Single image upload endpoint
router.post('/image', upload.single('image'), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    // Get compression settings from request body
    const {
      quality = 80,
      maxWidth = 1200,
      maxHeight = 800,
    } = req.body;

    // Generate unique filename
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const filename = `${timestamp}_${randomString}.webp`;
    const filepath = path.join(imagesDir, filename);

    // Process and compress image with sharp
    await sharp(req.file.buffer)
      .resize(parseInt(maxWidth), parseInt(maxHeight), {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .webp({ quality: parseInt(quality) })
      .toFile(filepath);

    // Return the relative URL
    const imageUrl = `/imagens/${filename}`;
    res.json({ 
      success: true, 
      url: imageUrl,
      filename,
      originalName: req.file.originalname,
      size: fs.statSync(filepath).size
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

// Multiple images upload endpoint
router.post('/images', upload.array('images', 12), async (req: Request, res: Response) => {
  try {
    if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
      return res.status(400).json({ error: 'No image files provided' });
    }

    const {
      quality = 80,
      maxWidth = 800,
      maxHeight = 600,
    } = req.body;

    const uploadPromises = req.files.map(async (file) => {
      const timestamp = Date.now();
      const randomString = Math.random().toString(36).substring(2, 15);
      const filename = `${timestamp}_${randomString}.webp`;
      const filepath = path.join(imagesDir, filename);

      await sharp(file.buffer)
        .resize(parseInt(maxWidth), parseInt(maxHeight), {
          fit: 'inside',
          withoutEnlargement: true,
        })
        .webp({ quality: parseInt(quality) })
        .toFile(filepath);

      return {
        url: `/imagens/${filename}`,
        filename,
        originalName: file.originalname,
        size: fs.statSync(filepath).size
      };
    });

    const results = await Promise.all(uploadPromises);

    res.json({ 
      success: true, 
      images: results
    });
  } catch (error) {
    console.error('Error uploading images:', error);
    res.status(500).json({ error: 'Failed to upload images' });
  }
});

// Delete image endpoint
router.delete('/image/:filename', (req: Request, res: Response) => {
  try {
    const { filename } = req.params;
    const filepath = path.join(imagesDir, filename);

    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
      res.json({ success: true, message: 'Image deleted successfully' });
    } else {
      res.status(404).json({ error: 'Image not found' });
    }
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({ error: 'Failed to delete image' });
  }
});

export default router;
