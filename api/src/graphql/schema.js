import { buildSchema } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';

const typeDefs = `
  type Departure {
    aimed: String!
    expected: String!
  }

  type Line {
    number: String!
    name: String!
    color: String!
    departures: [Departure]!
  }

  type Platform {
    name: String!
    lines: [Line]!
  }

  type Stop {
    name: String!
    zone: String!
    shortName: String!
    district: String!
    platforms: [Platform]!
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
