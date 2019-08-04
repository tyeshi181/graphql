import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getAuthorsQuery } from "../queries/queries";

class AddBook extends Component {
  render() {
    const { data } = this.props;
    return (
      <form>
        <div>
          <label>Book Name:</label>
          <input type="text" />
        </div>
        <div>
          <label>Genre:</label>
          <input type="text" />
        </div>
        <div>
          <label>Author:</label>

          <option>Select author</option>
          {data.loading ? (
            <select>
              <option>Loading authors</option>
            </select>
          ) : (
            <select>
              {data.authors.map(author => (
                <option key={author.id}>{author.name}</option>
              ))}
            </select>
          )}
        </div>
        <button>+</button>
      </form>
    );
  }
}

// bind the query with graphql
export default graphql(getAuthorsQuery)(AddBook);
