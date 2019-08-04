import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import { getAuthorsQuery, addBookMutation } from "../queries/queries";

class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      genre: "",
      authorId: ""
    };
  }

  submitHandler = e => {
    e.preventDefault();
    console.log(this.state);
  };

  onChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    const { getAuthorsQuery } = this.props;
    console.log(getAuthorsQuery);
    return (
      <form onSubmit={this.submitHandler}>
        <div>
          <label>Book Name:</label>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.onChangeHandler}
          />
        </div>
        <div>
          <label>Genre:</label>
          <input
            type="text"
            name="genre"
            value={this.state.genre}
            onChange={this.onChangeHandler}
          />
        </div>
        <div>
          <label>Author:</label>

          <option>Select author</option>
          {getAuthorsQuery.loading ? (
            <select>
              <option>Loading authors</option>
            </select>
          ) : (
            <select onChange={e => this.setState({ authorId: e.target.value })}>
              {getAuthorsQuery.authors.map(author => (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
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
// export default graphql(getAuthorsQuery)(AddBook);

// to bind multiple queries, we import compose
export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }), // name property is for how we get the data back as this name
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
