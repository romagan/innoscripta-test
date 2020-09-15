export default {
    namespaced: true,
    state: {
        products: [],
        toUsdCoefficient: 1.18,
        delivery: 5
    },
    getters: {
        products(state) {
            return state.products;
        },
        quantity(state) {
            return state.products.length;
        },
        total(state, getters) {
            if (getters.quantity > 0) {
                return state.products.reduce((sum, product) => {
                    return sum + product.price;
                }, 0);
            } else {
                return 0;
            }
        },
        totalEurFormatted(state, getters) {
            return `${getters.total}€`;
        },
        totalUsd(state, getters) {
            const total = getters.total * state.toUsdCoefficient;
            return total.toFixed();
        },
        totalUsdFormatted(state, getters) {
            return `${getters.totalUsd}$`;
        },
        shownTotal(state, getters) {
            return `${getters.totalEurFormatted} / ${getters.totalUsdFormatted}`;
        },
        toUsdCoefficient(state) {
            return state.toUsdCoefficient;
        },
        eurDeliveryPriceFormatted(state) {
            return `${state.delivery}€`;
        },
        toUsdDeliveryPrice(state) {
            const delivery = state.delivery * state.toUsdCoefficient;
            return delivery.toFixed();
        },
        toUsdDeliveryPriceFormatted(state, getters) {
            return `${getters.toUsdDeliveryPrice}$`;
        },
        shownDelivery(state, getters) {
            return `${getters.eurDeliveryPriceFormatted} / ${getters.toUsdDeliveryPriceFormatted}`;
        },
        totalEurPriceWithDelivery(state, getters) {
            return state.delivery + parseInt(getters.total, 10);
        },
        totalUsdPriceWithDelivery(state, getters) {
            return parseInt(getters.toUsdDeliveryPrice, 10) + parseInt(getters.totalUsd, 10);
        },
        shownTotalPriceWithDelivery(state, getters) {
            return `${getters.totalEurPriceWithDelivery}€ / ${getters.totalUsdPriceWithDelivery}$`;
        }
    },
    mutations: {
        add(state, data) {
            if (state.products.indexOf(data.id) === -1) {
                state.products.push(data);
            }
        },
        remove(state, id) {
            const position = state.products.map(item => item.id).indexOf(id);

            if (position !== -1) {
                state.products.splice(position, 1);
            }
        },
        clean(state) {
            state.products = [];
        }
    },
    actions: {
        add(state, id) {
            state.commit('add', id);
        },
        remove(state, id) {
            state.commit('remove', id);
        },
        clean(state) {
            state.commit('clean');
        }
    }
}
