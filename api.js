const express = require('express');
const fs = require('fs');
const { promisify } = require('util');
const ocr = require('node-tesseract-ocr');

const config = {
  lang: 'eng',
  oem: 1,
  psm: 3,
};

const app = express();
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));

app.post('/ocr', async (req, res) => {
  const { base64Image } = req.body;

  if (!base64Image) {
    return res.status(400).json({ error: 'No image provided' });
  }

  // Decodifica la imagen base64 y escribe en un archivo temporal.
  const imageBuffer = Buffer.from(base64Image, 'base64');
  const tempFilePath = 'tempImage.jpg';
  fs.writeFileSync(tempFilePath, imageBuffer);

  try {
    const text = await ocr.recognize(tempFilePath, config);

    // Elimina el archivo temporal después de usarlo.
    const unlinkAsync = promisify(fs.unlink);
    await unlinkAsync(tempFilePath);

    res.json({ text });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
