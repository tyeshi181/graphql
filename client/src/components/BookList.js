import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getBooksQuery } from "../queries/queries";

class BookList extends Component {
  render() {
    return (
      <div>
        {this.props.data.loading ? (
          "please wait, loading..."
        ) : (
          <ul>
            {this.props.data.books.map(book => (
              <li key={book.id}>{book.name}</li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

// bind the query with graphql
export default graphql(getBooksQuery)(BookList);
