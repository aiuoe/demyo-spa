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

const httpLink = setContext(() => ({headers: {authorization: `Bearer ${window.localStorage.getItem('token')}`}})).concat(createHttpLink({uri: `${process.env.VUE_APP_API_URL}/graphql`}))

const cache = new InMemoryCache()

Vue.config.productionTip = false

const pusherLink = new PusherLink({
  pusher: new Pusher("528a43e52a265f4b5f54", {
    cluster: "us2",
    authEndpoint: `${process.env.VUE_APP_API_URL}/graphql/subscriptions/auth`,
    auth: {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem('token')}`,
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
