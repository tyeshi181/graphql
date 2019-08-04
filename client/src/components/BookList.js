import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getBooksQuery } from "../queries/queries";
import BookDetails from "./BookDetails";

class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null
    };
  }
  render() {
    return (
      <div id="bookList-div">
        <h2>List of Books</h2>
        {this.props.data.loading ? (
          "please wait, loading..."
        ) : (
          <ul>
            {this.props.data.books.map(book => (
              <li
                key={book.id}
                onClick={e => this.setState({ selected: book.id })}
              >
                {book.name}
              </li>
            ))}
          </ul>
        )}
        <BookDetails bookId={this.state.selected} />
      </div>
    );
  }
}

// bind the query with graphql
export default graphql(getBooksQuery)(BookList);
