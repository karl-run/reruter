import React from 'react';
import { Subscription } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import groupBy from 'lodash.groupby';
import orderBy from 'lodash.orderby';
import { DateTime } from 'luxon';

import { EntryHeader, LineNumber, LineName, Times, TimelistStyle, SingleTime, ExampleStops } from './ScreenStyle';

const sub = gql`
  subscription onRealtimeUpdate($stopId: ID!) {
    realtime(stopId: $stopId) {
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

  return (
    <TimelistStyle>{Object.keys(grouped).map(key => <TimeEntry key={key} timeGroup={grouped[key]} />)}</TimelistStyle>
  );
};

export default ({ stopId }) => {
  if (!stopId) {
    return (
      <ExampleStops>
        <h3>Eksempelstopp</h3>
        <Link to="/realtime/3010011" text>
          Jernbanetorget
        </Link>
        <Link to="/realtime/3012221" text>
          Berg (ringvei)
        </Link>
        <Link to="/realtime/3012220" text>
          Berg (T-bane)
        </Link>
      </ExampleStops>
    );
  }
  return (
    <Subscription subscription={sub} variables={{ stopId }}>
      {({ loading, error, data, ...props }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;

        return <Timelist times={data.realtime} />;
      }}
    </Subscription>
  );
};
