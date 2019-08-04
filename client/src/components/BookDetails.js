import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getBookQuery } from "../queries/queries";

class BookDetails extends Component {
  render() {
    const { book } = this.props.data;
    return (
      <div id="bookDetails-div">
        {book ? (
          <div>
            <h3>Book name: {book.name}</h3>
            <p>Genre: {book.genre}</p>
            <p>Author: {book.author.name}</p>
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
