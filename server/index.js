const express = require("express");
// bring in the express-graphql module
const graphqlHTTP = require("express-graphql");

const server = express();
// make the server use the graphqlHTTP module as a middleware to a single route. this is the one super charged endpoint to process all request.
// its the function that fires whenever a request to this endpoint is made. this will handle graphql request. it takes an object with some options.
server.use("/graphql", graphqlHTTP({}));

const port = 5000;

server.listen(port, () => {
  console.log(`server listening to ${port}`);
});
