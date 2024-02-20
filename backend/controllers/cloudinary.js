const cloudinary = require('cloudinary').v2;
require('dotenv').config({ path: '../new.env' });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


async function uploadUserProfileImage(userId, imageFile) {
  try {
    console.log('Uploading image to Cloudinary...');
    const result = await cloudinary.uploader.upload(imageFile.path, {
      public_id: `user_profiles/${userId}`, 
      folder: 'user_profiles', 
      overwrite: true, 
    });

    console.log('Cloudinary upload result:', result);

    const imageUrl = result.secure_url; 

    console.log('Image uploaded successfully:', imageUrl);

    return imageUrl;
  } catch (error) {
    console.error('Error uploading profile image:', error);
    throw error;
  }
}
async function testCloudinary() {
  try {
    const result = await cloudinary.uploader.upload('../../first/istockphoto-1300512215-612x612.jpgS', {
      folder: 'test_folder',
    });

    console.log('Cloudinary upload result:', result);
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
  }
}




async function uploadToCloudinary(file) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(file.path, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}
module.exports={uploadUserProfileImage ,uploadToCloudinary};