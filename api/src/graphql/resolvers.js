import { PubSub, withFilter } from 'graphql-subscriptions';

const EXAMPLE = 'example';
const pubSub = new PubSub();

const rootResolver = {
  Query: {
    version: () => {
      return process.env.npm_package_version;
    },
  },

  Mutation: {
    example: (_, data) => {
      log.debug('Publishing message for example:' + data.message);
      pubSub.publish(EXAMPLE, {
        exampleSub: data.message,
      });
      return data.message;
    },
  },

  Subscription: {
    exampleSub: {
      subscribe: () => pubSub.asyncIterator(EXAMPLE),
    },
  },
};

export default rootResolver;
