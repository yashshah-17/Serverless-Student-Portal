const {PubSub} = require(`@google-cloud/pubsub`);
const { Storage } = require('@google-cloud/storage');
    
/**
 * Cloud function that responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.callHandler = async(req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', '*');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Access-Control-Max-Age', '3600');
    credentials = {
      projectId: "avid-garage-282122",
      credentials: {
        // fill credentials, if on same account creds not required
      }  
    }
    const pubSubClient = new PubSub(credentials);
    const storage = new Storage(credentials);
    // handle POST calls
    if(req.method == "POST") {
        switch(req.body.type) {
            case "publish": await publishMessage(pubSubClient, req.body.topicName, req.body.messageContent); break;
            case "upload": await uploadS3(storage, req.body.organisation) 
        }
        res.send("done");
    }
    if(req.method == "GET") {
        let messages = "";
        const path = require('path');
        const os = require('os');
        // workaround for cloud cache problem
        const filename = path.join(os.tmpdir(), "file" + Math.floor(Math.random() * Math.floor(100000)) + ".json");
        switch(req.query.type) {
            case "allMessages": messages = await allMessages(storage, filename, req.query.university); break;
            case "newMessages": messages = await newMessages(storage, filename, req.query.timestamp); break;
        }
        res.send(JSON.stringify(messages))
    }
    if(req.method == "OPTIONS") 
      res.send("")
};


async function uploadS3(storage, university) {
      bucketName = 'dal-shubham',
      srcFilename = university + '.json';
      destFilename = "/tmp/"+srcFilename
      const options = {
          destination: destFilename,
      };

      // Downloads the file
      await storage.bucket(bucketName).file(srcFilename).download(options);
      const AWS = require('aws-sdk');
      const fs = require('fs');

      AWS.config.update({
        accessKeyId: "",
        secretAccessKey: "",
        sessionToken: ""
      });

      const s3 = new AWS.S3();

      const res = await new Promise((resolve, reject) => {
        s3.upload({
          Bucket: "lmsgroup14",
          Body: fs.createReadStream(destFilename),
          Key: srcFilename
        }, (err, data) => err == null ? resolve(data) : reject(err));
      });

}

// GET all messages
async function allMessages(storage, destFilename, university) {
      bucketName = 'dal-shubham',
      srcFilename = university + '.json';
      const options = {
          destination: destFilename,
      };

      // Downloads the file
      await storage.bucket(bucketName).file(srcFilename).download(options);
      const file = require(destFilename);
      if(!file.chat) {
        file.chat = []
      }
      //delete file
      const fs = require('fs')
      await fs.unlink(destFilename, (err) => {
        if (err) throw err;
      });
      return file.chat
}

// publlish message on pubsub
async function publishMessage(pubSubClient, topicName, message) {
  message = JSON.stringify(message);
  const buffer = Buffer.from(message);  
  const messageId = await pubSubClient.topic(topicName).publish(buffer);
  return messageId
}

// send only new messages
async function newMessages(storage, filename, timestamp) {
    bucketName = 'dal-shubham',
    srcFilename = university + '.json';
    const options = {
        destination: destFilename,
    };

    // Downloads the file
    await storage.bucket(bucketName).file(srcFilename).download(options);
    const file = require(destFilename);
    if(!file.chat) {
      file.chat = []
    }
    newMessage = file.chat.filter(ele => ele.timestamp > timestamp);
    return newMessages
}