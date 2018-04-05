import styled from 'styled-components';
import { flexCenter, flexCenterVertical } from '../../style/Mixins';

export const EntryHeader = styled.div`
  display: flex;
  height: 24px;
  color: white;
`;

export const LineNumber = styled.div`
  background-color: red;
  height: 24px;
  width: 24px;
  margin-right: 2px;
  flex: 0 0 auto;
  ${flexCenter};
`;

export const LineName = styled.div`
  background-color: red;
  padding: 4px;
  flex: 1 0 auto;
  ${flexCenterVertical};
`;

export const Times = styled.div`
  display: flex;
`;

export const TimelistStyle = styled.div`
  max-width: 500px;
`;

export const SingleTime = styled.div`
  height: 24px;
  min-width: 20px;
  margin: 0 4px;
  ${flexCenter};
`;

export const ExampleStops = styled.div`
  display: flex;
  flex-direction: column;
`;