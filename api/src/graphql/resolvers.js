import * as pollEngine from '../pollengine';
import pubSub, { REALTIME_STOP } from '../pollengine/pubsub';
import { getStop, getMetadata, getRealtime } from '../pollengine/fetcher';

const rootResolver = {
  Query: {
    version: () => {
      return process.env.npm_package_version;
    },
    stop: (_, { stopId }) => {
      return getMetadata(stopId);
    },
  },

  Subscription: {
    stop: {
      subscribe: (_, { stopId }) => {
        log.debug('Stop: new subscriber for ' + stopId);
        pollEngine.register(stopId, pubSub);
        pollEngine.updateStop(stopId, 0);
        return pubSub.asyncIterator(REALTIME_STOP + stopId);
      },
    },
  },

  Stop: {
    platforms: (obj, args) => {
      return getRealtime(obj.stopId);
    }
  }
};

export default rootResolver;
