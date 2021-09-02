// import { PrismicLink } from 'apollo-link-prismic'
// import { ApolloClient, InMemoryCache } from '@apollo/client/core'

// const apolloClient = new ApolloClient({
//   link: PrismicLink({
//     uri: "https://lumesquare.cdn.prismic.io/graphql",
//     accessToken: "MC5ZUUw5WnhFQUFDd0F5Q0NK.77-9GO-_vXPvv70C77-9Pe-_ve-_ve-_ve-_ve-_vWvvv73vv70t77-9EO-_ve-_vQ3vv73vv73vv73vv73vv71_77-977-977-977-9",
//   }),
//   cache: new InMemoryCache()
// });



import { PrismicLink } from 'apollo-link-prismic'
import { InMemoryCache } from 'apollo-cache-inmemory'
import ApolloClient from 'apollo-client'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  defaultHttpLink: false,
  link: PrismicLink({
    uri: "https://lumesquare.cdn.prismic.io/graphql",
    fetch,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    accessToken: "MC5ZUW5NWGhFQUFDb0E1YldJ.Ee-_ve-_ve-_vWlX77-977-9dj1n77-9Je-_ve-_vWpBV--_ve-_ve-_vQ0jJWU077-977-9fO-_vTRQ",
  }),
})

export default () => client
