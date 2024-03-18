const dotenv = require("dotenv")
dotenv.config()
const cloudinary = require("cloudinary").v2
const {CloudinaryStorage} = require("multer-storage-cloudinary")

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET
})


//upload images to cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary, // Ensure this is correctly referring to your configured Cloudinary instance
    params: {
        folder: "blog-app",
        allowedFormats: ["jpg", "png", "jpeg"],
    },
});

module.exports = storage //pass as a middleware where we upload the images