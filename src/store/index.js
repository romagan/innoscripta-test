import Vue from 'vue';
import Vuex from 'vuex';

// import axios from 'axios';

Vue.use(Vuex);

import cart from './modules/cart';
import menu from './modules/menu';
import products from './modules/products';
import modal from './modules/modal';
import firebase from './modules/firebase';
// import auth from './modules/auth';

export const store = new Vuex.Store({
    modules: {
        cart,
        menu,
        products,
        modal,
        firebase,
        // auth
    },
    strict: process.env.NODE_ENV !== 'production'
});
