export default {
    namespaced: true,
    state: {
        items: [
            {
                url: '/products',
                name: 'Products'
            },
            {
                url: '/cart',
                name: 'Cart'
            },
        ]
    },
    getters: {
        items(state) {
            return state.items;
        }
    }
}
