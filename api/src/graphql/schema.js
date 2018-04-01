import { buildSchema } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';

const typeDefs = `
  type Query {
    version: String!
  }

  type Mutation {
    example(message: String!): String!
  }

  type Subscription {
    exampleSub: String
  }
`;

export default makeExecutableSchema({
  typeDefs,
  resolvers,
});
