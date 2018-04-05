import { buildSchema } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';

const typeDefs = `
  type Line {
    number: String!
    name: String!
    departures: [String]!
  }

  type Platform {
    id: Int!
    name: String!
    lines: [Line]!
  }

  type Stop {
    #coordinates {
    #  long: Float
    #  lat: Float
    #}
    name: String!
    platforms: [Platform]
  }

  type Realtime {
    name: String!
    line: String!
    departure: String!
    platform: String!
  }

  type Query {
    version: String!
    stop(stopId: ID!): Stop    
  }

  type Subscription {
    realtime(stopId: ID!): [Realtime]
    stop(stopId: ID!): Stop
  }
`;

export default makeExecutableSchema({
  typeDefs,
  resolvers,
});
