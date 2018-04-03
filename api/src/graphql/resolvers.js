import * as pollEngine from '../pollengine';
import pubSub, { REALTIME_STOP, EXAMPLE } from '../pollengine/pubsub';

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
    realtime: {
      subscribe: (_, { stopId }) => {
        log.debug('New subscriber for ' + stopId);
        pollEngine.register(stopId, pubSub);
        pollEngine.updateStop(stopId, 0);
        return pubSub.asyncIterator(REALTIME_STOP + stopId);
      },
    },
    exampleSub: {
      subscribe: () => pubSub.asyncIterator(EXAMPLE),
    },
  },
};

export default rootResolver;
