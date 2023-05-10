// import { ApolloClient, InMemoryCache } from "@apollo/client";

// let apolloClient;

// export function initializeApollo(initialState = null) {
//   const _apolloClient =
//     apolloClient ??
//     new ApolloClient({
//       uri: "https://us-east-1-shared-usea1-02.cdn.hygraph.com/content/clh15u5nw3xu201umarfy6yoi/master", // Replace this with your GraphQL API URL
//       cache: new InMemoryCache(),
//     });

//   // If your page has Next.js data fetching methods that use Apollo Client,
//   // the initial state gets hydrated here
//   if (initialState) {
//     _apolloClient.cache.restore(initialState);
//   }

//   // For SSG and SSR always create a new Apollo Client
//   if (typeof window === "undefined") return _apolloClient;

//   // Create the Apollo Client once in the client
//   if (!apolloClient) apolloClient = _apolloClient;

//   return _apolloClient;
// }

// import { ApolloClient, InMemoryCache } from "@apollo/client";

// let apolloClient;

// export function initializeApollo(initialState = null) {
//   const _apolloClient =
//     apolloClient ??
//     new ApolloClient({
//       uri: "https://us-east-1-shared-usea1-02.cdn.hygraph.com/content/clh15u5nw3xu201umarfy6yoi/master", // Replace this with your GraphQL API URL
//       cache: new InMemoryCache({
//         typePolicies: {
//           Query: {
//             fields: {
//               productsConnection: {
//                 keyArgs: ["catalogSlug"],
//                 merge(existing, incoming) {
//                   if (!existing) return incoming;

//                   const newEdges = incoming.edges.filter(
//                     (incomingEdge) =>
//                       !existing.edges.some(
//                         (existingEdge) => existingEdge.node.productSlug === incomingEdge.node.productSlug
//                       )
//                   );

//                   return {
//                     ...incoming,
//                     edges: [...existing.edges, ...newEdges],
//                   };
//                 }
//               },
//             },
//           },
//         },
//       }),
//     });

//   // If your page has Next.js data fetching methods that use Apollo Client,
//   // the initial state gets hydrated here
//   if (initialState) {
//     _apolloClient.cache.restore(initialState);
//   }

//   // For SSG and SSR always create a new Apollo Client
//   if (typeof window === "undefined") return _apolloClient;

//   // Create the Apollo Client once in the client
//   if (!apolloClient) apolloClient = _apolloClient;

//   return _apolloClient;
// }
import { ApolloClient, InMemoryCache } from "@apollo/client";

export function initializeApollo(initialState = null, cache = null) {
  const _apolloClient = new ApolloClient({
    uri: "https://us-east-1-shared-usea1-02.cdn.hygraph.com/content/clh15u5nw3xu201umarfy6yoi/master",
    cache:
      cache ||
      new InMemoryCache({
        typePolicies: {
          Query: {
            fields: {
              productsConnection: {
                keyArgs: ["catalogSlug"],
                merge(existing = { edges: [] }, incoming) {
                  console.log("Incoming edges:", incoming.edges);
                  console.log("Existing edges:", existing.edges);

                  const newEdges = incoming.edges.filter(
                    (incomingEdge) =>
                      !existing.edges.some(
                        (existingEdge) =>
                          existingEdge.node.id === incomingEdge.node.id
                      )
                  );

                  console.log("New edges:", newEdges);

                  return {
                    ...incoming,
                    edges: [...existing.edges, ...newEdges],
                  };
                },
              },
            },
          },
        },
      }),
  });

  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }

  // No need to check for window here, just return the client
  return _apolloClient;
}
