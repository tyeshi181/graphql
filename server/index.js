const express = require("express");
const cors = require("cors");
// bring in the express-graphql module
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose"); // install mongoose to connect to mlab cloud database

const server = express();

// make the server use the graphqlHTTP module as a middleware to a single route. this is the one super charged endpoint to process all request.
// its the function that fires whenever a request to this endpoint is made. this will handle graphql request. it takes an object with some options.
mongoose.connect(
  "mongodb+srv://tenzing:1234@cluster0-xjxt0.mongodb.net/test?retryWrites=true&w=majority"
); // pass in the link copied from mlab
mongoose.connection.once("open", () => {
  // to verify that we are connected to cloud database
  console.log("connected to database");
});

server.use(cors());
// after creating the mongoose connection we need to make the models for our database. So we are going to create a models folder.
server.use(
  "/graphql",
  graphqlHTTP({
    // go and create schema
    schema,
    graphiql: true
  })
);

const port = 5000;

server.listen(port, () => {
  console.log(`server listening to ${port}`);
});
