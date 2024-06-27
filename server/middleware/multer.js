import multer from "multer";

const storage = multer.memoryStorage();
// NOTE: memoryStorage is temporary storage on the server; 
// there is also diskStorage to store files on the server indefinitely, 
// but we won't use it as the server is only storing the image temporarily
// until we store it in cloudinary and we store the corresponding link 
// in the server instead

export const singleUpload = multer({
  storage, // since key/value pair is same, i.e. storage: storage, we use the shortform instead
}).single("file");
