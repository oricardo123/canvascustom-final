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
