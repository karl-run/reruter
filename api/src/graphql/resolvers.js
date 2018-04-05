import * as pollEngine from '../pollengine';
import pubSub, { REALTIME_STOP } from '../pollengine/pubsub';

const rootResolver = {
  Query: {
    version: () => {
      return process.env.npm_package_version;
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
  },
};

export default rootResolver;
