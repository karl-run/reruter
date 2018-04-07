import groupBy from 'lodash.groupby';
import orderBy from 'lodash.orderby';

const departureToDepartureTime = departure => ({
  aimed: departure.MonitoredVehicleJourney.MonitoredCall.AimedArrivalTime,
  expected: departure.MonitoredVehicleJourney.MonitoredCall.ExpectedArrivalTime,
});

const departuresToLines = departures => {
  const [first] = departures;
  const journey = first.MonitoredVehicleJourney;

  return {
    number: journey.LineRef,
    name: journey.DestinationName,
    color: first.Extensions.LineColour,
    departures: departures.map(departureToDepartureTime),
  };
};

const createUniqueLine = departure => {
  const journey = departure.MonitoredVehicleJourney;
  const call = journey.MonitoredCall;

  return `${journey.LineRef} ${journey.DestinationName}`;
};

const getPlatformName = departure => departure.MonitoredVehicleJourney.MonitoredCall.DeparturePlatformName;

export default departures => {
  const grouped = groupBy(orderBy(departures, 'time'), getPlatformName);

  return Object.values(grouped).map(platformDepartures => {
    const [first] = platformDepartures;

    return {
      id: 0,
      name: first.MonitoredVehicleJourney.MonitoredCall.DeparturePlatformName,
      lines: Object.values(groupBy(platformDepartures, createUniqueLine)).map(departuresToLines),
    };
  });
};
