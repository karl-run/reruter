import styled from 'styled-components';
import { flexCenter, flexCenterVertical } from '../../style/mixins';

export const EntryHeader = styled.div`
  display: flex;
  height: 24px;
  color: white;
`;

export const LineNumber = styled.div`
  background-color: #${props => props.color};
  height: 24px;
  width: 24px;
  margin-right: 2px;
  flex: 0 0 auto;
  ${flexCenter};
`;

export const LineName = styled.div`
  background-color: #${props => props.color};
  padding: 4px;
  flex: 1 0 auto;
  ${flexCenterVertical};
`;

export const Times = styled.div`
  overflow: hidden;
  display: flex;
`;

export const StopStyle = styled.div`
  max-width: 500px;
`;

export const SingleTime = styled.div`
  height: 24px;
  min-width: 20px;
  margin: 0 4px;
  ${flexCenter};
  flex: 0 0 auto;
`;

export const ExampleStops = styled.div`
  display: flex;
  flex-direction: column;
`;
