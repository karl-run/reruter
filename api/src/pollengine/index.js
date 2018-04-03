import pubSub, { REALTIME_STOP } from './pubsub';
import { getRealtime } from './fetcher';

const RATE = process.env.POLL_RATE || 60 * 60 * 1000 / 600;
const FEED_RATE = process.env.FEED_RATE || 2000;

const stops = {};

export const register = stopId => {
  if (stops[stopId]) return;

  stops[stopId] = { lastPolled: null, active: true };

  log.debug('Current pollEngine content: ', stops);
};

export const updateStop = (stopId, i) => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      const result = await getRealtime(stopId);

      pubSub.publish(REALTIME_STOP + stopId, {
        realtime: result,
      });
    }, i * FEED_RATE + Math.random() * (FEED_RATE / 2));
  });
};

export const startPolling = () => {
  log.info(
    `Setting up polling at every ${RATE / 1000} seconds (${RATE /
      1000 /
      60} minutes), with a feedrate of ${FEED_RATE}ms`,
  );

  const interval = async () => {
    Object.keys(stops).forEach(updateStop);
  };

  // Fire once immidiately
  interval();
  setInterval(interval, RATE);
};
