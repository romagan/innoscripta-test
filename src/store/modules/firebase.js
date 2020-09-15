import axios from 'axios';
import router from '../../routes';

export default {
    state: {
        idToken: null,
        userId: null,
        user: null,
        orders: null
    },
    getters: {
        isAuthenticated(state) {
            return state.idToken !== null
        },
        user(state) {
            return state.user
        },
        orders(state) {
            return state.orders
        },
    },
    mutations: {
        authUser(state, userData) {
            state.idToken = userData.token
            state.userId = userData.userId
        },
        storeUser(state, user) {
            state.user = user
        },
        storeOrders(state, orders) {
            state.orders = orders
        },
        clearAuthData(state) {
            state.idToken = null
            state.userId = null
            state.user = null
        }
    },
    actions: {
        login({
            commit,
            dispatch
        }, authData) {
            return new Promise((resolve, reject) => {
                axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDWHnPyauu-psPBeWZGCOefMpBFn-DwkLc', {
                        email: authData.email,
                        password: authData.password,
                        returnSecureToken: true
                    })
                    .then(res => {
                        localStorage.setItem('token', res.data.idToken)
                        localStorage.setItem('userId', res.data.localId)
                        localStorage.setItem('email', res.data.email)
                        commit('authUser', {
                            token: res.data.idToken,
                            userId: res.data.localId
                        })
                        dispatch('fetchUser')
                        router.push('/products')
                        resolve()
                    })
                    .catch(() => {
                        reject()
                    })
            })
        },
        register({
            commit,
            dispatch
        }, authData) {
            axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDWHnPyauu-psPBeWZGCOefMpBFn-DwkLc', {
                    email: authData.email,
                    password: authData.password,
                    returnSecureToken: true
                })
                .then(res => {
                    commit('authUser', {
                        token: res.data.idToken,
                        userId: res.data.localId
                    })
                    localStorage.setItem('token', res.data.idToken)
                    localStorage.setItem('userId', res.data.localId)
                    localStorage.setItem('email', res.data.email)
                    dispatch('storeUser', authData)
                    
                    setTimeout(function () {
                        dispatch('fetchUser')
                        router.push('/')
                    }, 2000)
                })
                .catch(error => console.log(error))
        },
        logout({
            commit
        }) {
            commit('clearAuthData')
            localStorage.removeItem('token')
            localStorage.removeItem('userId')
        },
        storeUser({
            state
        }, userData) {
            if (!state.idToken) {
                return
            }
            axios.post('https://innoscripta-test.firebaseio.com/users.json' + '?auth=' + state.idToken, userData)
                .then(res => console.log(res))
                .catch(error => console.log(error))
        },
        postOrder({
            state,
            dispatch
        }, orderData) {
            if (!state.idToken) {
                return
            }
            axios.post('https://innoscripta-test.firebaseio.com/orders.json' + '?auth=' + state.idToken, orderData)
                .then(() => dispatch('fetchUser'))
                .catch(error => console.log(error))
        },
        autoLogin({
            commit
        }) {
            const token = localStorage.getItem('token')
            if (!token) {
                return
            }
            const userId = localStorage.getItem('userId')
            commit('authUser', {
                token: token,
                userId: userId
            })
        },
        fetchUser({
            commit,
            state
        }) {
            if (!state.idToken) {
                return
            }
            const email = localStorage.getItem('email')
            axios.get('https://innoscripta-test.firebaseio.com/users.json?orderBy="email"&equalTo="' + email + '"')
                .then(res => {
                    const data = res.data
                    const users = []
                    for (let key in data) {
                        const user = data[key]
                        user.id = key
                        users.push(user)
                    }
                    commit('storeUser', users[0])
                })
                .catch(error => {
                    console.log(error)
                })
        },
        fetchOrders({
            commit,
            state
        }) {
            if (!state.idToken) {
                return
            }
            const email = localStorage.getItem('email')
            axios.get('https://innoscripta-test.firebaseio.com/orders.json?orderBy="email"&equalTo="' + email + '"')
                .then(res => {
                    const data = res.data
                    const arData = Object.entries(data)
                    let orders = []

                    arData.forEach((item) => {
                        orders.push(item[1])
                    })

                    commit('storeOrders', orders)
                })
                .catch(error => {
                    console.log(error)
                })
        },
    }
}