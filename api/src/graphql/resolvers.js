import * as pollEngine from '../pollengine';
import pubSub, { REALTIME_STOP, STOP } from '../pollengine/pubsub';
import { getStop } from '../pollengine/fetcher';

const rootResolver = {
  Query: {
    version: () => {
      return process.env.npm_package_version;
    },
    stop: (_, { stopId }) => {
      return getStop(stopId);
    },
  },

  Subscription: {
    realtime: {
      subscribe: (_, { stopId }) => {
        log.debug('Realtime: new subscriber for ' + stopId);
        pollEngine.register(stopId, pubSub);
        pollEngine.updateStop(stopId, 0);
        return pubSub.asyncIterator(REALTIME_STOP + stopId);
      },
    },
    stop: {
      subscribe: (_, { stopId }) => {
        log.debug('Stop: new subscriber for ' + stopId);
        pollEngine.register(stopId, pubSub);
        pollEngine.updateStop(stopId, 0);
        return pubSub.asyncIterator(STOP + stopId);
      },
    },
  },
};

export default rootResolver;
