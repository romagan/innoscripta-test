<template>
    <div class="cart">
        <h1>Cart</h1>

        <template v-if="isEmpty">
            <table class="table table-bordered table-hover">
                <thead>
                    <tr class="table-active">
                        <th>Title</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- eslint-disable-next-line-->
                    <tr v-for="product in products">
                        <td>{{ product.title }}</td>
                        <td>{{ `${product.price} € / ${usdProductPrice(product)} $` }}</td>
                    </tr>
                </tbody>
            </table>
            
            <div class="text-right">
                Delivery: <b>{{ shownDelivery }}</b>
            </div>
            <hr>
            <div class="text-right">
                <total></total>
                <button class="btn btn-success" type="button" @click.prevent="checkout">Order now</button>
            </div>
        </template>

        <div v-else class="alert alert-warning">
            <h2>Your cart is empty!</h2>
        </div>
    </div>
</template>
        
<script>
    import {mapGetters} from 'vuex';
    import Total from './Total';

    export default {
        name: `Cart`,
        components: {
            Total
        },
        props: {
            
        },
        data() {
            return {
                
            }
        },
        computed: {
            ...mapGetters('cart', {
                inCartProducts: 'products',
                shownDelivery: 'shownDelivery',
                toUsdCoefficient: 'toUsdCoefficient',
            }),
            ...mapGetters('products', {
                allProducts: 'items'
            }),
            products() {
                return this.allProducts.filter((item) => {
                    return this.inCartProducts.map(item => item.id).indexOf(item.id) !== -1;
                });
            },
            isEmpty() {
                return this.products.length > 0;
            }
        },
        mounted() {
            
        },
        methods: {
            checkout() {
                this.$router.push('/checkout');
            },
            usdProductPrice(product) {
                const price = product.price * this.toUsdCoefficient;
                return price.toFixed();
            }
        }
    }
</script>

<style>
.cart-total {
    margin-bottom: 12px;
    font-size: 1.5rem;
}

.cart-total span {
    position: relative;
}

.cart-total span:before {
    content: "";
    top: 0;
    left: 0;
    z-index: 1;

    width: 100%;
    height: 1px;

    background-color: #dee2e6;
}
</style>