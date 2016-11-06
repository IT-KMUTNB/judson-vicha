import Vue from 'vue'
import App from './App'
import reactiveStorage from 'vue-reactive-storage'

Vue.use(reactiveStorage, [
  'techers',
  'subjects',
  'relations'
])

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
