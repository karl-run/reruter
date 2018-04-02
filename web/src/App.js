import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div style={{ margin: '16px' }}>
        <h1>Reruter</h1>
        <p>
          Mer informasjon kommer. Gå til <a href={`https://${process.env.REACT_APP_API_URL}`}>API-et</a>.
        </p>
      </div>
    );
  }
}

export default App;
