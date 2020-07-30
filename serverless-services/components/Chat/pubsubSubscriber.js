/**
 * Triggered from a message on a Cloud Pub/Sub topic.
 *
 * @param {!Object} event Event payload.
 * @param {!Object} context Metadata for the event.
 */
const { Storage } = require('@google-cloud/storage');

exports.subscriberFunction = async(event, context) => {
   // boiler plate retrive message line
    let message = event.data
    ? Buffer.from(event.data, 'base64').toString()
    : null;
   if(message== null) return
   const storage = new Storage({
      projectId: "avid-garage-282122",
        credentials: {
            // required if function is not deplyed on google cloud
        }
   });
   message = JSON.parse(message)
   const path = require('path');
   const os = require('os');
   // Random file name because of cache problem
   const filename = path.join(os.tmpdir(), "file_" + Math.floor(Math.random() * Math.floor(10000)) + ".json");
   const srcFile = message.groupName + ".json"
   await downloadFile(filename, storage, srcFile)
   modifyFile(message, filename).catch(err => console.log(err))
   uploadFile(filename, storage, srcFile)
};

async function downloadFile(filename, storage, srcFilename) {
    bucketName = 'dal-shubham';
    let destFilename = filename
    const options = {
        destination: destFilename,
    };
    // Downloads the file
    await storage.bucket(bucketName).file(srcFilename).download(options);  
}
  
async function modifyFile(message, filename) {
    const fs = require("fs");
    const file = require(filename);
    if(!file.chat){
        file.chat = []
    }
    file.chat.push(message)
    fs.writeFile(filename, JSON.stringify(file), function(err) {
        if (err) return console.log(err);
    });
  }
  
async function uploadFile(filename, storage, srcFilename) {
    // Uploads a local file to the bucket
    await storage.bucket("dal-shubham").upload(filename, {
          gzip: true,
          destination: storage.bucket("dal-shubham").file(srcFilename),
          // disable cache
          metadata: {
              cacheControl: 'no-cache',
          },
     });
}
