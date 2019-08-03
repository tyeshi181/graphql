const graphql = require("graphql");
const _ = require("lodash"); // allows you to find data and change date

// describe the object types we want in the graph
// object destructuring
//           ||
//           \/
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphql; //to define graphql object

// dummy data

let books = [
  { name: "wind of the bay", genre: "nature", id: "1", authorId: "2" },
  { name: "king of saturn", genre: "fantasy", id: "2", authorId: "3" },
  { name: "the champions life", genre: "sport", id: "3", authorId: "1" },
  { name: "the world cup", genre: "sport", id: "4", authorId: "1" },
  { name: "the amazon forest", genre: "nature", id: "5", authorId: "2" },
  { name: "the elephant from java", genre: "nature", id: "6", authorId: "2" }
];

let authors = [
  { name: "john miller", age: 34, id: "1" },
  { name: "dan lehman", age: 24, id: "2" },
  { name: "manuel lamar", age: 44, id: "3" }
];

// For schema we have three steps
// 1: define type
// 2: define relationships between types
// 3: define root queries to let the user jump into graph and get data

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    // function returns an object
    id: { type: GraphQLID }, //bring the GraphQLString from graphql object
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      //created relationship between the book and author
      type: AuthorType,
      resolve(parent, args) {
        console.log(parent);
        return _.find(authors, { id: parent.authorId });
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    // function returns an object
    id: { type: GraphQLID }, //bring the GraphQLString from graphql object
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      //created relationship between the author and book
      type: new GraphQLList(BookType), //for multiple books we need to bring in GraphQLList
      resolve(parent, args) {
        return _.filter(books, { authorId: parent.id });
      }
    }
  })
});

// RootQuery is how to get into the graph
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      // for particular book
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //args comes with the request from the frontend
        // code to get data from database or other source
        return _.find(books, { id: args.id });
      }
    },
    author: {
      // for particular author
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(authors, { id: args.id });
      }
    },
    books: {
      // for list of all books
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return books;
      }
    },
    authors: {
      // for list of all authors
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return authors;
      }
    }
  }
});

// pass the rootQuery to access it in the graphql middleware in index.js
module.exports = new GraphQLSchema({
  query: RootQuery
});
