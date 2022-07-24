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
  interface DefaultTheme extends Theme {}
}

// const host =
//   process.env.NODE_ENV === 'production'
//     ? 'briskserver.herokuapp.com'
//     : `${window.location.hostname}:4000`;

// const uri =
//   process.env.NODE_ENV === 'production'
//     ? `https://${host}/graphql`
//     : `http://${host}/graphql`;

// const wsUri =
//   process.env.NODE_ENV === 'production'
//     ? `wss://${host}/subscriptions`
//     : `ws://${host}/subscriptions`;

const host = `${window.location.hostname}:4000`;

const uri = `http://${host}/graphql`;

const wsUri = `ws://${host}/subscriptions`;

const httpLink = new HttpLink({
  uri,
  credentials: 'same-origin'
});
export const wsClient = new SubscriptionClient(wsUri, {
  reconnect: true
});

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
console.log(process.env, process.env.NODE_ENV, process.env.SERVER_URL);

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
