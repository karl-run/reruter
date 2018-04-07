import * as fetch from 'node-fetch';
import * as metadataMapper from './mappers/metadataMapper';

import { mapToSimpleRealtime, getMetadata } from './';

global.log = { debug: () => {}, error: console.error };

describe('fetcher', () => {
  describe('mapToSimpleRealtime', () => {
    it('should correctly map from Ruter structe to a simple realtime structure', () => {
      const mockResponse = [
        {
          MonitoredVehicleJourney: {
            DestinationName: 'Test Destination',
            MonitoredCall: {
              LineRef: '5',
              DeparturePlatformName: 'Platty',
              ExpectedArrivalTime: 'About twelve',
            },
          },
        },
      ];

      expect(mapToSimpleRealtime(mockResponse)).toEqual([
        { departure: 'About twelve', line: undefined, name: 'Test Destination', platform: 'Platty' },
      ]);
    });
  });

  describe('getMetadata', () => {
    it('should fetch with correct URL and invoke mapToMetadata', () => {
      const fetchMock = fetch.mockResponseOnce(JSON.stringify({ test: 'response' }));
      const spy = jest.spyOn(metadataMapper, 'default');

      return getMetadata(70).then(() => {
        expect(spy).toHaveBeenCalledWith({ test: 'response' });
        expect(fetchMock).toHaveBeenCalledWith('https://undefined/Place/GetStop/70', {
          headers: { 'content-type': 'application/json', 'user-agent': 'Reruter Fetcher' },
          method: 'GET',
        });

        fetch.resetMocks();
      });
    });

    it('should silently log any error that occurs', () => {
      const fetchMock = fetch.mockRejectOnce(new Error('Oopsie'));
      const errorSpy = jest.spyOn(log, 'error').mockImplementationOnce(() => {});

      return getMetadata(70).then(() => {
        expect(errorSpy).toHaveBeenCalledWith('Unable to fetch metadata for stopId: "70", caused by:', 'Oopsie');

        fetch.resetMocks();
      });
    });
  });
});
