import React from 'react';
import { Subscription } from 'react-apollo';
import gql from 'graphql-tag';
import groupBy from 'lodash.groupby';
import orderBy from 'lodash.orderby';
import { DateTime } from 'luxon';

import { EntryHeader, LineNumber, LineName, Times, TimelistStyle, SingleTime } from './ScreenStyle';

const sub = gql`
  subscription onRealtimeUpdate {
    realtime(stopId: "3010011") {
      name
      line
      departure
      platform
    }
  }
`;

const Time = ({ time }) => {
  const date = DateTime.fromISO(time.departure);
  const minutes = Math.round(date.diffNow('minutes').minutes);

  let text;
  if (minutes === 0) {
    text = 'nå';
  } else if (minutes < 16) {
    text = `${minutes} min`;
  } else {
    text = date.toLocaleString(DateTime.TIME_SIMPLE);
  }

  return <SingleTime>{text}</SingleTime>;
};

const TimeEntry = ({ timeGroup }) => {
  const [first] = timeGroup;

  return (
    <div>
      <EntryHeader>
        <LineNumber>{first.line}</LineNumber>
        <LineName>{first.name}</LineName>
      </EntryHeader>
      <Times>{timeGroup.map(time => <Time key={time.departure} time={time} />)}</Times>
    </div>
  );
};

const createUniqueIdentifier = time => time.line + ' ' + time.name + ' ' + time.platform;

const Timelist = ({ times }) => {
  const grouped = groupBy(orderBy(times, 'time'), createUniqueIdentifier);

  console.log(Object.values(grouped));

  return (
    <TimelistStyle>{Object.keys(grouped).map(key => <TimeEntry key={key} timeGroup={grouped[key]} />)}</TimelistStyle>
  );
};

export default () => (
  <Subscription subscription={sub}>
    {({ loading, error, data }) => {
      console.log(loading, error, data);
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return <Timelist times={data.realtime} />;
    }}
  </Subscription>
);
