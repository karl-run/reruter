import { mapToSimpleRealtime } from './index';

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
});
