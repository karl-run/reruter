import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import schema from './graphql/schema';
import { execute, subscribe } from 'graphql';
import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';

import logging from './logging/logger';

const DEFAULT_PORT = 4000;
const PORT = process.env.PORT || DEFAULT_PORT;
const PROD = process.env.NODE_ENV === 'production';
const URL = PROD ? process.env.API_URL : 'localhost';
const WS_URL = PROD ? `wss://${URL}/subscriptions` : `ws://${URL}:${PORT}/subscriptions`;

global.log = logging;
logging.level = 'debug';

const app = express();

app.post('/', bodyParser.json(), graphqlExpress(req => ({ schema })));
app.get('/', graphiqlExpress({ endpointURL: '/', subscriptionsEndpoint: WS_URL }));

const server = createServer(app);
server.listen(PORT, () => {
  SubscriptionServer.create({ execute, subscribe, schema }, { server, path: '/subscriptions' });
  if (!PROD) {
    log.warn('Not in production');
  }
  log.info(`Started server (${URL}) on port ${PORT}`);
  log.info(`Subscription endpoint: ${WS_URL}`);
});
