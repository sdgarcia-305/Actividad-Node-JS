import multer from 'multer';
import path from 'path';

// Configuración del almacenamiento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/tasks/'); // carpeta donde se guardarán las imágenes
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + ext;
    cb(null, uniqueName);
  }
});

// Filtro para solo aceptar imágenes
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const mime = allowedTypes.test(file.mimetype);
  const ext = allowedTypes.test(path.extname(file.originalname).toLowerCase());

  if (mime && ext) {
    return cb(null, true);
  }
  cb(new Error('Solo se permiten imágenes (jpeg, jpg, png, gif)'));
};

export const upload = multer({ storage, fileFilter });