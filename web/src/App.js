import React, { PureComponent } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Frame from './frame/Frame';
import Info from './info/Info';
import asyncComponent from './utils/asyncComponent';

import baseStyles from './AppStyles';

const AsyncRealtime = asyncComponent(() => import('./realtime/Realtime'));

const NoMatch = () => <div>Fant ikke siden du prøvde å nå.</div>;

class App extends PureComponent {
  render() {
    baseStyles();

    return (
      <BrowserRouter>
        <Frame>
          <Switch>
            <Route exact path="/" component={Info} />
            <Route exact path="/realtime" component={AsyncRealtime} />
            <Route component={NoMatch} />
          </Switch>
        </Frame>
      </BrowserRouter>
    );
  }
}

export default App;
