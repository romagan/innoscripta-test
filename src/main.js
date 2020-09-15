import Vue from 'vue';
import App from './App.vue';
// import axios from 'axios';
import { store } from './store';
import router from './routes.js';

// import {VueFire} from 'vuefire';
// Vue.use(VueFire);

import firebase from 'firebase/app';
import 'firebase/firestore';

import Vuelidate from 'vuelidate';
Vue.use(Vuelidate);

var firebaseConfig = {
  apiKey: "AIzaSyDWHnPyauu-psPBeWZGCOefMpBFn-DwkLc",
  authDomain: "innoscripta-test.firebaseapp.com",
  databaseURL: "https://innoscripta-test.firebaseio.com",
  projectId: "innoscripta-test",
  storageBucket: "innoscripta-test.appspot.com",
  messagingSenderId: "169337926166",
  appId: "1:169337926166:web:3ca03588a546a22d8b7b37"
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');