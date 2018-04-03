import ApolloClient from 'apollo-boost';
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

let uris;
if (process.env.NODE_ENV === 'production') {
  uris = {
    http: `https://${process.env.REACT_APP_API_URL}`,
    ws: `wss://${process.env.REACT_APP_API_URL}`,
  };
} else {
  uris = {
    http: `http://localhost:4000`,
    ws: `ws://localhost:4000/subscriptions`,
  };
}

const httpLink = new HttpLink({
  uri: uris.http,
});

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: uris.ws,
  options: {
    reconnect: true,
  },
});

console.log(uris);

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({ uri: `http://${process.env.REACT_APP_API_URL}`, link });

export default client;
