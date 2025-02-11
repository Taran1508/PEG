const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.mimetype.startsWith('image/')) {
      uploadPath = path.join(__dirname, '../uploads/profilePictures');
    } else if (file.mimetype === 'application/pdf') {
      uploadPath = path.join(__dirname, '../uploads/resumes');
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
