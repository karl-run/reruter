import metadataMapper from './metadataMapper';

describe('metadataMappe', () => {
  it('should correctly map from Ruter response', () => {
    const mockResponse = {
      Lines: [],
      X: 597930,
      Y: 6642890,
      Zone: '1',
      ShortName: 'JER',
      IsHub: false,
      ID: 3010011,
      Name: 'Jernbanetorget [T-bane]',
      District: 'Oslo',
      DistrictID: null,
      PlaceType: 'Stop',
    };

    expect(metadataMapper(mockResponse)).toEqual({
      stopId: 3010011,
      name: 'Jernbanetorget [T-bane]',
      zone: '1',
      shortName: 'JER',
      district: 'Oslo',
    });
  });
});
