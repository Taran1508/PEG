const upload = require('../config/multerConfig');

const uploadFile = (req, res, next) => {
  upload.single('pfp')(req, res, function (err) {
    if (err) {
      console.error('Multer error:', err);
      return res.status(400).json({ error: err.message });
    }
    if (!req.file) {
      console.error('File not received!');
      return res
        .status(400)
        .json({ error: 'File upload failed. No file received.' });
    }

    console.log('Uploaded file:', req.file);
    console.log('Request body:', req.body);
    next();
  });
};

const uploadRes = (req, res, next) => {
  upload.single('resume')(req, res, function (err) {
    if (err) {
      console.error('Multer error:', err);
      return res.status(400).json({ error: err.message });
    }
    if (!req.file) {
      console.error('File not received!');
      return res
        .status(400)
        .json({ error: 'File upload failed. No file received.' });
    }

    console.log('Uploaded file:', req.file);
    console.log('Request body:', req.body);
    next();
  });
};

module.exports = { uploadFile, uploadRes };
