import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import PusherLink from './apollo'
import Pusher from 'pusher-js'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { ApolloLink } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'
import { setContext } from 'apollo-link-context'

Vue.use(VueApollo)

Vue.config.productionTip = false

const httpLink = setContext(() => ({headers: {authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTYxMjQ3MTk3NiwiZXhwIjoxNjE1MDYzOTc2LCJuYmYiOjE2MTI0NzE5NzYsImp0aSI6IkRpR09nd0dET2xRaTNZdGgiLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.8jU7PwD1hctJvoYo17knfXE3x4cIe4__XFIs4KH2jtU`}})).concat(createHttpLink({uri: `${process.env.VUE_APP_API_URL}/graphql`}))

const cache = new InMemoryCache()

const pusherLink = new PusherLink({
  pusher: new Pusher("528a43e52a265f4b5f54", {
    cluster: "us2",
    authEndpoint: `${process.env.VUE_APP_API_URL}/graphql/subscriptions/auth`,
    auth: {
      headers: {
        Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTYxMjQ3MTk3NiwiZXhwIjoxNjE1MDYzOTc2LCJuYmYiOjE2MTI0NzE5NzYsImp0aSI6IkRpR09nd0dET2xRaTNZdGgiLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.8jU7PwD1hctJvoYo17knfXE3x4cIe4__XFIs4KH2jtU",
      },
    },
  }),
});

const link = ApolloLink.from([pusherLink, httpLink]);

const apolloClient = new ApolloClient({
  link,
  cache,
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

new Vue({
  router,
  store,
  apolloProvider,
  render: h => h(App)
}).$mount('#app')
