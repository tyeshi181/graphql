const graphql = require("graphql");
const _ = require("lodash"); // allows you to find data and change date
const Book = require("../models/book");
const Author = require("../models/author"); // import models

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
  GraphQLList,
  GraphQLNonNull
} = graphql; //to define graphql object

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
        // return _.find(authors, { id: parent.authorId }); this is for dummy data
        return Author.findById(parent.authorId);
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
        // return _.filter(books, { authorId: parent.id }); dummy data
        return Book.find({ authorId: parent.id });
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
        // return _.find(books, { id: args.id });
        return Book.findById(args.id);
      }
    },
    author: {
      // for particular author
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return _.find(authors, { id: args.id });
        return Author.findById(args.id);
      }
    },
    books: {
      // for list of all books
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return books;
        return Book.find({});
      }
    },
    authors: {
      // for list of all authors
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        // return authors;
        return Author.find({});
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  // it would be pretty much same as our RootQuery object
  name: "Mutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parent, args) {
        let author = new Author({
          name: args.name,
          age: args.age
        }); // this Author is the model we imported
        return author.save();
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) }, // not nullable
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId
        });
        return book.save();
      }
    }
  }
});
// pass the rootQuery as query, mutation to access it in the graphql middleware in index.js
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
