import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getBookQuery } from "../queries/queries";

class BookDetails extends Component {
  render() {
    const { book } = this.props.data;
    return (
      <div>
        {book ? (
          <div>
            <h3>{book.name}</h3>
            <p>{book.genre}</p>
            <p>{book.author.name}</p>
            <h4>All books by Author</h4>
            <ul>
              {book.author.books.map(book => (
                <li key={book.id}>{book.name}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    );
  }
}

// bind the query with graphql
export default graphql(getBookQuery, {
  options: props => {
    // pass in the props to grab the details of that bookId passed in
    return {
      variables: {
        id: props.bookId
      }
    };
  }
})(BookDetails);
