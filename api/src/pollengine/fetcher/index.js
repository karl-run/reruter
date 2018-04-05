import fetch from 'node-fetch';

import { GET } from './options';
import { reset } from '../../../../web/node_modules/styled-reset/lib';

const rootUrl = process.env.RUTER_API_URL;
const realtimePath = '/StopVisit/GetDepartures/';
const metadataPath = '/Place/GetStop/';
const makeUrl = (stopId, path) => `https://${rootUrl}${path}${stopId}`;

if (process.env.NODE_ENV !== 'test' && !rootUrl) {
  throw new Error('No Ruter API URL supplied');
}

export const mapToSimpleRealtime = fullRealtime =>
  fullRealtime.map(entry => ({
    name: entry.MonitoredVehicleJourney.DestinationName,
    line: entry.MonitoredVehicleJourney.LineRef,
    departure: entry.MonitoredVehicleJourney.MonitoredCall.ExpectedArrivalTime,
    platform: entry.MonitoredVehicleJourney.MonitoredCall.DeparturePlatformName,
  }));

const buildStop = metadata => {
  return {
    name: metadata.Name,
  };
};

const mapToCompleteStop = response => {
  const { metadata, realtime } = response;

  return {
    ...buildStop(metadata),
    // Todo add platofrms platforms
  };
};

export const getRealtime = async stopId => {
  const url = makeUrl(stopId, realtimePath);
  log.debug(`Requesting ${url}`);

  try {
    return await fetch(url, GET)
      .then(result => result.json())
      .then(mapToSimpleRealtime);
  } catch (erro) {
    log.error(`Unable to fetch stopId: "${stopId}", caused by:`, erro.message);
  }
};

export const getStop = async stopId => {
  const url = makeUrl(stopId, realtimePath);
  const metaUrl = makeUrl(stopId, metadataPath);
  log.debug(`Requesting ${url} and ${url}`);

  try {
    return await Promise.all([fetch(url, GET), fetch(metaUrl, GET)])
      .then(async result => {
        const [realtime, metadata] = result;

        return { realtime: await realtime.json(), metadata: await metadata.json() };
      })
      .then(mapToCompleteStop);
  } catch (erro) {
    log.error(`Unable to fetch stopId: "${stopId}", caused by:`, erro.message);
  }
};
