const { toFile } = require("@imagekit/nodejs");
const ImageKit = require("@imagekit/nodejs");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  endPointUrl: process.env.IMAGEKIT_ENDPOINT_URL,
});

async function uploadFile(file, fileName){

    const result = await imagekit.files.upload({
      file: await toFile(Buffer.from(file),"file"),
      fileName: fileName,
      folder: "Zomato",
    });

    console.log(result)
    return result;

}

module.exports = {uploadFile}