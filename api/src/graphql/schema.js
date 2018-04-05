import { buildSchema } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';

const typeDefs = `
  type Realtime {
    name: String!
    line: String!
    departure: String!
    platform: String!
  }

  type Query {
    version: String!
  }

  type Subscription {
    realtime(stopId: ID!): [Realtime]
  }
`;

export default makeExecutableSchema({
  typeDefs,
  resolvers,
});
