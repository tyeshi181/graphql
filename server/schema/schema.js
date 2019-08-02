const graphql = require("graphql");
const _ = require("lodash"); // allows you to find data and change date

// describe the object types we want in the graph
// object destructuring
//           ||
//           \/
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql; //to define graphql object

// dummy data

let books = [
  { name: "wind of the bay", genre: "nature", id: "1" },
  { name: "king of saturn", genre: "fantasy", id: "2" },
  { name: "the champions life", genre: "sport", id: "3" }
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    // function returns an object
    id: { type: GraphQLString }, //bring the GraphQLString from graphql object
    name: { type: GraphQLString },
    genre: { type: GraphQLString }
  })
});

// RootQuery is how to get into the graph
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        //args comes with the request from the frontend
        // code to get data from database or other source
        return _.find(books, { id: args.id });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
