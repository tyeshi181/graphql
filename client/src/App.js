import React from "react";
// to create the client
import ApolloClient from "apollo-boost";
// to wrap our main component with apollo-provider like redux provider
import { ApolloProvider } from "react-apollo";

import BookList from "./components/BookList";
import AddBook from "./components/AddBook";

// set up apollo client to query graphql
const client = new ApolloClient({
  uri: "http://localhost:5000/graphql"
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div id="app-div">
        <BookList />
        <AddBook />
      </div>
    </ApolloProvider>
  );
}

export default App;
