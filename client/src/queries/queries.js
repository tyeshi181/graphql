import { gql } from "apollo-boost";

// create query with gql
const getBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`;

// create query with gql
const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`;

const getBookQuery = gql`
  query($id: ID) {
    book(id: $id) {
      id
      name
      genre
      author {
        id
        name
        age
        books {
          name
          id
        }
      }
    }
  }
`;
// add $name to pass as variable in the addBook, String! as type string not nullable
const addBookMutation = gql`
  mutation($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      id
    }
  }
`;

export { getBooksQuery, getAuthorsQuery, addBookMutation, getBookQuery };
