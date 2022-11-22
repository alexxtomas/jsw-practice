const cloudinary = require('cloudinary')
const cloudinaryV2 = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')

const setUpCloudinary = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
  })
}

const deleteFile = (imgUrl) => {
  const imgSplited = imgUrl.split('/')
  const nameSplited = imgSplited[imgSplited.length - 1].split('.')
  const folderSplited = imgSplited[imgSplited.length - 2]
  const public_id = `${folderSplited}/${nameSplited[0]}`
  cloudinaryV2.uploader.destroy(public_id, () => {
    console.log('Image delete in cloudinary')
  })
}

const storage = new CloudinaryStorage({
  cloudinary: cloudinaryV2,
  params: {
    folder: 'books',
    allowedFormats: ['jpg', 'png', 'jpeg']
  }
})

module.exports = { setUpCloudinary, deleteFile, storage }
