const { ApolloServer, gql } = require("apollo-server-express");
const { createWriteStream } = require("fs");
const path = require("path");
const express = require("express");
const { Storage } = require("@google-cloud/storage");

const files = [];

const typeDefs = gql`
  type Query {
    files: [String]
  }
  type Mutation {
    uploadFile(file: Upload!): Boolean
  }
`;

const gc = new Storage({
  keyFilename: path.join(__dirname, "\instant-grove-279600-3d70dc427061.json"),
  projectId: "instant-grove-279600"
});

gc.getBuckets().then(x => console.log(x)).catch(console.log("error"))
const coolFilesBucket = gc.bucket("serverlessb00835071");

const resolvers = {
  Query: {
    files: () => files
  },
  Mutation: {
    uploadFile: async (_, { file }) => {
      const { createReadStream, filename } = await file;
    
      await new Promise(res =>
        createReadStream()
          .pipe(
            coolFilesBucket.file(filename).createWriteStream({
              resumable: false,
              gzip: true
            })
          )
          .on("finish", res)
      );

      files.push(filename);
      return true;
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
const app = express();
app.use("/images", express.static(path.join(__dirname, "../images")));
server.applyMiddleware({ app });

app.listen(4000, () => {
  console.log("Server ready at http://localhost:4000/");
});


