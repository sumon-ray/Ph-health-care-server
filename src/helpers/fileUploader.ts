import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import multer from "multer";
import path from "path";

cloudinary.config({
  cloud_name: "dp8c6enec",
  api_key: "663187835418339",
  api_secret: "nllBWQAc05ClXvQN-vBaIqXsUwA", // Click 'View API Keys' above to copy your API secret
});

// multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const uploadToCloudinary = async (file: any) => {
//   console.log({ file });
  // Upload an image

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload(
        file.path,
        {
          public_id: file.originalname,
        },
        (error, result)=>{
            fs.unlinkSync(file.path)
            if (error) {
                reject(error)
            }
            else{
                resolve(result)
            }
        }

      )
    //   .catch((error) => {
    //     console.log(error);
    //   });
  });
};

// (async function() {

//     // Configuration

//     // Optimize delivery by resizing and applying auto-format and auto-quality
//     const optimizeUrl = cloudinary.url('shoes', {
//         fetch_format: 'auto',
//         quality: 'auto'
//     });

//     console.log(optimizeUrl);

//     // Transform the image: auto-crop to square aspect_ratio
//     const autoCropUrl = cloudinary.url('shoes', {
//         crop: 'auto',
//         gravity: 'auto',
//         width: 500,
//         height: 500,
//     });

//     console.log(autoCropUrl);
// })();

export const fileUploads = {
  upload,
  uploadToCloudinary,
};
