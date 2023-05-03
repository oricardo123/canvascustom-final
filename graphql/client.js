// import {
//   ApolloClient,
//   InMemoryCache,
//   ApolloProvider,
//   gql,
// } from "@apollo/client";
// const client = new ApolloClient({
//   uri: "https://us-east-1-shared-usea1-02.cdn.hygraph.com/content/clh15u5nw3xu201umarfy6yoi/master",
//   cache: new InMemoryCache(),
// });

// export default client;

// apolloClient.js
import { ApolloClient, InMemoryCache } from "@apollo/client";

let apolloClient;

export function initializeApollo(initialState = null) {
  const _apolloClient =
    apolloClient ??
    new ApolloClient({
      uri: "https://us-east-1-shared-usea1-02.cdn.hygraph.com/content/clh15u5nw3xu201umarfy6yoi/master", // Replace this with your GraphQL API URL
      cache: new InMemoryCache(),
    });

  // If your page has Next.js data fetching methods that use Apollo Client,
  // the initial state gets hydrated here
  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;

  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}
