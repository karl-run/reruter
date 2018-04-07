import React from 'react';
import { Subscription } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import groupBy from 'lodash.groupby';
import orderBy from 'lodash.orderby';
import { DateTime } from 'luxon';

import { ErrorBox } from '../../style/common';
import { EntryHeader, LineNumber, LineName, Times, StopStyle, SingleTime, ExampleStops } from './ScreenStyle';

const sub = gql`
  subscription onRealtimeUpdate($stopId: ID!) {
    stop(stopId: $stopId) {
      name
      district
      shortName
      platforms {
        name
        lines {
          number
          color
          name
          departures {
            aimed
            expected
          }
        }
      }
    }
  }
`;

const Time = ({ time }) => {
  console.log(time);
  const date = DateTime.fromISO(time.aimed);
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

const Line = ({ line }) => {
  return (
    <div>
      <EntryHeader>
        <LineNumber color={line.color}>{line.number}</LineNumber>
        <LineName color={line.color}>{line.name}</LineName>
      </EntryHeader>
      <Times>{line.departures.map(departure => <Time time={departure} />)}</Times>
    </div>
  );
};

const Platform = ({ platform }) => {
  console.log(platform);
  return (
    <div>
      <h5>Plattform {platform.name}</h5>
      {platform.lines.map(line => <Line line={line} />)}
    </div>
  );
};

const Stop = ({ stop }) => {
  console.log(stop);

  return (
    <StopStyle>
      <h4>{stop.name}</h4>
      {stop.platforms.map(platform => <Platform platform={platform} />)}
    </StopStyle>
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
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;

        if (!data.stop) {
          return <ErrorBox>Fant ingen data. Er du sikker på at {stopId} er et gyldig stopp?</ErrorBox>;
        }

        return <Stop stop={data.stop} />;
      }}
    </Subscription>
  );
};
