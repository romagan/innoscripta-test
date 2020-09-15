export default {
    namespaced: true,
    state: {
        items: getProducts(),
    },
    getters: {
        items(state) {
            return state.items;
        },
        itemsMap(state) {
            let itemsMap = {};

            state.items.forEach((item) => {
                itemsMap[item.id] = item;
            });

            return itemsMap;
        },
        item: (state, getters) => (id) => {
            return getters.itemsMap[id];
        },
    },
    mutations: {},
    actions: {}
}

function getProducts() {
    return [
        {
            id: 1,
            title: 'Margherita',
            description: 'Large portion of mozzarella, tomatoes, Italian herbs, tomato sauce',
            price: 10,
            src: 'https://cdn.dodostatic.net/static/Img/Products/21379561a76646f1945f1bc759c749b5_584x584.jpeg'
        },
        {
            id: 7,
            title: 'Pepperoni',
            description: 'Spicy pepperoni, large portion of mozzarella, tomato sauce',
            price: 12,
            src: 'https://cdn.dodostatic.net/static/Img/Products/Pizza/ru-RU/d2e337e9-e07a-4199-9cc1-501cc44cb8f8.jpg'
        },
        {
            id: 13,
            title: 'Pizza Pesto',
            description: 'Pesto sauce, cream sauce, chicken, cheese cubes, cherry tomatoes, mozzarella',
            price: 16,
            src: 'https://cdn.dodostatic.net/static/Img/Products/548f06002e5d46c699245285d5f4b1cc_584x584.jpeg'
        },
        {
            id: 14,
            title: 'Cheesy Pizza',
            description: 'Large portion of mozzarella, tomato sauce',
            price: 14,
            src: 'https://cdn.dodostatic.net/static/Img/Products/Pizza/ru-RU/2ffc31bb-132c-4c99-b894-53f7107a1441.jpg'
        },
        {
            id: 18,
            title: 'Four Seasons',
            description: 'Increased portion of mozzarella, ham, spicy pepperoni, cheese cubes, tomatoes, mushrooms, tomato sauce, Italian herbs',
            price: 13,
            src: 'https://cdn.dodostatic.net/static/Img/Products/Pizza/ru-RU/ec29465e-606b-4a04-a03e-da3940d37e0e.jpg'
        },
        {
            id: 140,
            title: 'Pizza Cheeseburger',
            description: 'Meat bolognese sauce, mozzarella, red onion, pickles, tomatoes, burger sauce',
            price: 14,
            src: 'https://cdn.dodostatic.net/static/Img/Products/1959b0fdf5f049fb9ec12cf05d535bc7_584x584.jpeg'
        },
        {
            id: 114,
            title: 'Italian Pizza',
            description: 'Italian herbs, spicy pepperoni, tomato sauce, champignons, mozzarella, olives',
            price: 9,
            src: 'https://cdn.dodostatic.net/static/Img/Products/Pizza/ru-RU/5eb7828f-ee6b-44d8-a2ce-058ebf36094e.jpg'
        },
        {
            id: 134,
            title: 'Mexican Pizza',
            description: 'Tomato sauce, bell peppers, red onion, mozzarella, hot jalapeno peppers, tomatoes, salsa sauce, spicy chicken',
            price: 15,
            src: 'https://cdn.dodostatic.net/static/Img/Products/Pizza/ru-RU/3354e3c2-8ce0-4d64-a11d-eb4c455b29c6.jpg'
        },
    ]
}
