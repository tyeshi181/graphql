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

export { getBooksQuery, getAuthorsQuery };
