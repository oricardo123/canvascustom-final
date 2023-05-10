import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

let client = ApolloClient || null;

export const getClient = () => {
  // create a new client if there's no existing one
  // or if we are running on the server.
  if (!client || typeof window === "undefined") {
    client = new ApolloClient({
      link: new HttpLink({
        uri: "https://us-east-1-shared-usea1-02.cdn.hygraph.com/content/clh15u5nw3xu201umarfy6yoi/master",
      }),
      cache: new InMemoryCache(),
    });
  }

  return client;
};
