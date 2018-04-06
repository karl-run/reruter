import fetch from 'node-fetch';

import { GET } from './options';

const rootUrl = process.env.RUTER_API_URL;
const realtimePath = '/StopVisit/GetDepartures/';
const makeUrl = stopId => `https://${rootUrl}${realtimePath}${stopId}`;

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

export const getRealtime = async stopId => {
  const url = makeUrl(stopId);
  log.debug(`Requesting ${url}`);

  try {
    return await fetch(url, GET)
      .then(result => result.json())
      .then(mapToSimpleRealtime);
  } catch (erro) {
    log.error(`Unable to fetch stopId: "${stopId}", caused by:`, erro.message);
  }
};
