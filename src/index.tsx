import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

import { ThemeProvider, Theme, StyledEngineProvider } from '@mui/material';
import theme from './theme';

import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
  split
} from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { SubscriptionClient } from 'subscriptions-transport-ws';

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

// eslint-disable-next-line no-restricted-globals
const host = location.hostname;
const httpLink = new HttpLink({
  uri: `http://${host}:4000/graphql`,
  credentials: 'same-origin'
});
export const wsClient = new SubscriptionClient(
  `ws://${host}:4000/subscriptions`,
  {
    reconnect: true
  }
);

const wsLink = new WebSocketLink(wsClient);
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink
});

ReactDOM.render(
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <Router>
          <App />
        </Router>
      </ApolloProvider>
    </ThemeProvider>
  </StyledEngineProvider>,
  document.getElementById('root')
);
