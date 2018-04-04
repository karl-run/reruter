import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const URL = process.env.NODE_ENV === 'production' ? `https://${process.env.REACT_APP_API_URL}` : 'http://localhost:4000';

class App extends Component {
  render() {
    return (
      <div>
        <p>
          Mer informasjon kommer. Gå til <a href={URL}>API-et</a>.
        </p>
        <p>
          <Link to="/realtime">Tidsskjerm</Link>
        </p>
      </div>
    );
  }
}

export default App;
