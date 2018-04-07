import fetch from 'node-fetch';

import { GET } from './options';
import mapToStructuredStop from './mappers/departureMapper';
import mapToMetadata from './mappers/metadataMapper';

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

export const getMetadata = async stopId => {
  const metaUrl = makeUrl(stopId, metadataPath);

  log.debug(`Requesting ${metaUrl}`);

  try {
    return await fetch(metaUrl, GET)
      .then(result => result.json())
      .then(mapToMetadata);
  } catch (error) {
    log.error(`Unable to fetch metadata for stopId: "${stopId}", caused by:`, error.message);
  }
};

export const getRealtime = async stopId => {
  const metaUrl = makeUrl(stopId, realtimePath);

  log.debug(`Requesting ${metaUrl}`);

  try {
    return await fetch(metaUrl, GET)
      .then(result => result.json())
      .then(mapToStructuredStop);
  } catch (error) {
    log.error(`Unable to fetch metadata for stopId: "${stopId}", caused by:`, error.message);
  }
};
