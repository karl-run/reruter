import React from 'react';
import { Subscription } from 'react-apollo';
import gql from 'graphql-tag';

const sub = gql`
  subscription onCommentAdded{
    realtime(stopId: "3010011") {
      name
      line
      departure
      platform
    }
  }
`;

export default () => (
  <Subscription query={sub} shouldResubscribe>
    {({ loading, error, data }) => {
      console.log(loading, error, data);
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      console.log(data);

      return <div>woah nelly</div>;
    }}
  </Subscription>
);
