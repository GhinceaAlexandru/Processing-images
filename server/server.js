const express = require('express');
const sharp = require('sharp');
const multer = require('multer');
const cors = require('cors');
const imageProcessing = require('image-processing');

const app = express();
const port = 3001;

app.use(cors());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/processImage', upload.single('image'), async (req, res) => {
  const { operation } = req.body;
  const imageBuffer = req.file.buffer;

  try {
    console.log('Received request for operation:', operation);

    let processedImageBuffer;

    switch (operation) {
      case 'rotate':
        console.log('Applying rotate operation...');
        processedImageBuffer = await sharp(imageBuffer).rotate(90).toBuffer();
        break;

      case 'edgeDetection':
        console.log('Applying edge detection operation...');
        processedImageBuffer = await sharp(imageBuffer).toFormat('png').png({ quality: 100 }).toBuffer();
        processedImageBuffer = await sharp(processedImageBuffer).convolve({
          width: 3,
          height: 3,
          kernel: [-1, -1, -1, -1, 8, -1, -1, -1, -1],
        }).toBuffer();
        break;

      case 'edgeEnhancement':
        console.log('Applying edge enhancement operation...');
        processedImageBuffer = await sharp(imageBuffer).sharpen({ sigma: 1 }).toBuffer();
        break;

      case 'grayscale':
        console.log('Applying grayscale operation...');
        processedImageBuffer = await sharp(imageBuffer).grayscale().toBuffer();
        break;

      case 'blur':
        console.log('Applying blur operation...');
        processedImageBuffer = await sharp(imageBuffer).blur(5).toBuffer();
        break;

      case 'resize':
        console.log('Applying resize operation...');
        processedImageBuffer = await sharp(imageBuffer).resize({ width: 300, height: 200 }).toBuffer();
        break;

      case 'emboss':
        console.log('Applying emboss operation...');
        processedImageBuffer = await sharp(imageBuffer).convolve({
          width: 3,
          height: 3,
          kernel: [-2, -1, 0, -1, 1, 1, 0, 1, 2],
        }).toBuffer();
        break;

      case 'sepia':
        console.log('Applying sepia operation...');
        processedImageBuffer = await sharp(imageBuffer).toColorspace('b-w').tint('#704214').toBuffer();
        break;

      case 'threshold':
        console.log('Applying threshold operation...');
        processedImageBuffer = await sharp(imageBuffer).threshold(128).toBuffer();
        break;

      case 'saturate':
        console.log('Applying saturate operation...');
        processedImageBuffer = await sharp(imageBuffer).modulate({ saturation: 2 }).toBuffer();
        break;

      case 'contrast':
        console.log('Applying contrast operation...');
        processedImageBuffer = await sharp(imageBuffer).modulate({ contrast: 2 }).toBuffer();
        break;

      case 'brightness':
        console.log('Applying brightness operation...');
        processedImageBuffer = await sharp(imageBuffer).modulate({ brightness: 2 }).toBuffer();
        break;

      case 'pixelate':
        console.log('Applying pixelate operation...');
        processedImageBuffer = await sharp(imageBuffer).resize(10, 10, { fit: 'inside', withoutEnlargement: true }).resize(500, 500, { fit: 'inside', withoutEnlargement: true }).toBuffer();
        break;

      case 'oilPaint':
        console.log('Applying oil paint effect operation...');
        processedImageBuffer = await sharp(imageBuffer).median({ size: 5 }).toBuffer();
        break;

      case 'sharpen':
        console.log('Applying sharpen operation...');
        processedImageBuffer = await sharp(imageBuffer).sharpen().toBuffer();
        break;

      case 'rotate180':
        console.log('Applying rotate 180 operation...');
        processedImageBuffer = await sharp(imageBuffer).rotate(180).toBuffer();
        break;

      case 'colorize':
        console.log('Applying colorize operation...');
        processedImageBuffer = await sharp(imageBuffer).tint('#336699').toBuffer();
        break;

      case 'flip':
        console.log('Applying flip operation...');
        processedImageBuffer = await sharp(imageBuffer).flip().toBuffer();
        break;

      case 'flop':
        console.log('Applying flop operation...');
        processedImageBuffer = await sharp(imageBuffer).flop().toBuffer();
        break;

      case 'brightnessContrast':
        console.log('Applying brightness and contrast adjustment operation...');
        processedImageBuffer = await sharp(imageBuffer).modulate({ brightness: 1.5, contrast: 1.5 }).toBuffer();
        break;


      case 'rotateLeft':
        console.log('Applying rotate left operation...');
        processedImageBuffer = await sharp(imageBuffer).rotate(-90).toBuffer();
        break;

      case 'rotateRight':
        console.log('Applying rotate right operation...');
        processedImageBuffer = await sharp(imageBuffer).rotate(90).toBuffer();
        break;


      case 'gammaCorrection':
        console.log('Applying gamma correction operation...');
        processedImageBuffer = await sharp(imageBuffer).gamma(1.5).toBuffer();
        break;

      case 'vintageEffect':
        console.log('Applying vintage effect operation...');
        processedImageBuffer = await sharp(imageBuffer).tint('#9c6644').toBuffer();
        break;
      case 'grainEffect':
        console.log('Applying grain effect operation...');
        processedImageBuffer = await sharp(imageBuffer).resize({ width: 500, height: 500, fit: 'inside', withoutEnlargement: true })
          .blur(2)
          .toBuffer();
        break;

      case 'swirlEffect':
        console.log('Applying swirl effect operation...');
        processedImageBuffer = await sharp(imageBuffer).resize({ width: 500, height: 500, fit: 'inside', withoutEnlargement: true })
          .modulate({ hue: 50 })
          .toBuffer();
        break;
      case 'mirror':
        console.log('Applying mirror effect...');
        processedImageBuffer = await sharp(imageBuffer).flop().flip().toBuffer();
        break;

      case 'pencilSketch':
        console.log('Applying pencil sketch effect...');
        processedImageBuffer = await sharp(imageBuffer).toColourspace('b-w').negate().blur().toBuffer();
        break;


      case 'sobelEdgeDetection':
        console.log('Applying Sobel edge detection effect...');
        processedImageBuffer = await sharp(imageBuffer).toColourspace('b-w').toFormat('png').png({ quality: 100 }).toBuffer();
        processedImageBuffer = await sharp(processedImageBuffer).toColourspace('b-w').convolve({
          width: 3,
          height: 3,
          kernel: [-1, -2, -1, 0, 0, 0, 1, 2, 1],
        }).toBuffer();
        break;

      case 'vibrantColors':
        console.log('Applying vibrant colors effect...');
        processedImageBuffer = await sharp(imageBuffer).modulate({ saturation: 2, brightness: 1.5 }).toBuffer();
        break;

      case 'softVintage':
        console.log('Applying soft vintage effect...');
        processedImageBuffer = await sharp(imageBuffer).modulate({ saturation: 0.8, contrast: 1.2 }).tint('#b5aead').toBuffer();
        break;

      case 'comicBook':
        console.log('Applying comic book effect...');
        processedImageBuffer = await sharp(imageBuffer).modulate({ saturation: 2, contrast: 1.5 }).toColourspace('b-w').toBuffer();
        break;

      case 'warmify':
        console.log('Applying warmify effect...');
        processedImageBuffer = await sharp(imageBuffer).modulate({ temperature: 2000 }).toBuffer();
        break;

      case 'coolify':
        console.log('Applying coolify effect...');
        processedImageBuffer = await sharp(imageBuffer).modulate({ temperature: 5000 }).toBuffer();
        break;

      case 'oldFilm':
        console.log('Applying old film effect...');
        processedImageBuffer = await sharp(imageBuffer).modulate({ saturation: 0.8, contrast: 1.5, brightness: 0.8 }).tint('#e6d9b8').toBuffer();
        break;

      case 'pixelArt':
        console.log('Applying pixel art effect...');
        processedImageBuffer = await sharp(imageBuffer).resize(10, 10, { kernel: 'nearest', fit: 'cover' }).resize(500, 500, { fit: 'inside', withoutEnlargement: true }).toBuffer();
        break;

      default:
        console.log('Invalid operation requested:', operation);
        return res.status(400).send('Invalid operation');
    }

    console.log('Sending processed image...');
    res.set('Content-Type', 'image/jpeg');
    res.send(processedImageBuffer);
  } catch (error) {
    console.error('Error processing image:', error);
    res.status(500).json({ error: error.message, stack: error.stack });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
