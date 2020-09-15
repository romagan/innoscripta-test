import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import ProductsList from './components/ProductsList';
import Product from './components/Product';
import Cart from './components/Cart';
import E404 from './components/E404';
import Checkout from './components/Checkout';
import Login from './components/Login';
import Register from './components/Register';
import Orders from './components/Orders';

const routes = [{
        path: '',
        redirect: {
            name: 'products'
        }
    },
    {
        name: 'products',
        path: '/products',
        component: ProductsList,
    },
    {
        path: '/product/:id',
        component: Product
    },
    {
        name: 'cart',
        path: '/cart',
        component: Cart
    },
    {
        name: 'checkout',
        path: '/checkout',
        component: Checkout
    },
    {
        name: 'login',
        path: '/login',
        component: Login,
        beforeEnter(to, from, next) {
            if (!localStorage.getItem('userId')) {
                next()
            } else {
                next('/products')
            }
        }
    },
    {
        name: 'registration',
        path: '/register',
        component: Register,
        beforeEnter(to, from, next) {
            if (!localStorage.getItem('userId')) {
                next()
            } else {
                next('/products')
            }
        }
    },
    {
        path: '/orders',
        name: 'orders',
        component: Orders,
        beforeEnter(to, from, next) {
            if (localStorage.getItem('userId')) {
                next()
            } else {
                next('/login')
            }
        }
    },
    {
        path: '*',
        component: E404
    }
];

const router = new VueRouter({
    routes,
    mode: 'history'
});

export default router;
