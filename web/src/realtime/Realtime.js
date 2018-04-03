import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';

import Screen from './screen/Screen';
import client from './apollo';

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Screen />
      </ApolloProvider>
    );
  }
}

export default App;
