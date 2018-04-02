import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <p>
          Mer informasjon kommer. Gå til <a href={`https://${process.env.REACT_APP_API_URL}`}>API-et</a>.
        </p>
        <p>
          <Link to="/realtime">Tidsskjerm</Link>
        </p>
      </div>
    );
  }
}

export default App;
