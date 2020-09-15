<template>
    <div id="app">
        <div class="hello">
            <div class="container">
                <auth></auth>
                <div class="row">
                    <div class="col-12 col-md-3 menu">
                        <div class="menu-wrapper">
                            <div class="incart-line">In Cart: <b>{{ quantity }}</b></div>
                            <div class="menu-price">Total: <b>{{ shownTotal }}</b></div>
                            <ul class="list-group">
                                <router-link v-for="(item, index) in menuList" tag="li" class="list-group-item"
                                    activeClass="active" :key="`menuItem${index}`" :to="item.url">
                                    <a>{{ item.name }}</a>
                                </router-link>
                                <router-link v-if="isLoggedIn" tag="li" class="list-group-item"
                                    activeClass="active" key="order-list-menu-item" to="/orders">
                                    <a>Orders</a>
                                </router-link>
                            </ul>
                        </div>
                    </div>
                    <div class="col-12 col-md-9">
                        <!-- <transition mode="out-in" name="fadeDown"> -->
                        <router-view></router-view>
                        <!-- </transition> -->
                    </div>
                </div>
            </div>
        </div>
        <modal ref="modal"></modal>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import Auth from './components/Auth';
    import Modal from './components/Modal';

    export default {
        name: 'App',
        data() {
            return {
            }
        },
        components: {
            Auth,
            Modal
        },
        computed: {
            ...mapGetters('menu', {
                menuList: 'items'
            }),
            ...mapGetters('cart', {
                quantity: 'quantity',
                shownTotal: 'shownTotal',
            }),
            isLoggedIn() {
                return this.$store.getters.isAuthenticated
            },
        },
        created() {
            this.$store.dispatch('autoLogin')
            this.$store.dispatch('fetchUser')
            this.$store.dispatch('fetchOrders')
        },
        watch: {
        },
        methods: {
        }
    }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }

    body {
        height: 100%;
        margin: 0;

        text-rendering: optimizeSpeed;

        scroll-behavior: smooth;
    }

    .body_locked {
        overflow: hidden;
    }

    h1 {
        position: relative;

        margin-bottom: 3rem;
    }

    h1::after {
        content: "";

        position: absolute;
        left: 0;
        bottom: -12px;
        z-index: 1;

        width: 100%;
        height: 1px;

        background-color: #dee2e6;
    }

    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }

    .menu-price {
        margin-bottom: 16px;
    }

    .menu .list-group {
        margin-bottom: 32px;
    }

    .list-group-item {
        margin-left: 0;
        margin-right: 0;
    }

    .list-group-item.active {
        background-color: inherit;
        border-color: rgba(0, 0, 0, .125);
    }

    .list-group-item a:hover {
        color: #276e4e;
        text-decoration: none;
    }

    .list-group-item.active a {
        color: #000;
    }

    .list-group-item.active a:hover {
        color: #000;
        text-decoration: none;

        cursor: default;
    }

    @media (min-width: 768px) {
        .menu-wrapper {
            position: sticky;
            top: 0;
            left: 0;

            padding-top: 6rem;
        }
    }
</style>