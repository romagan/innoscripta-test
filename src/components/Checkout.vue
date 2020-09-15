<template>
    <div class="checkout">
        <template v-if="isCHeckout">
            <template v-if="!isFormSubmitted">
                <h1>Checkout</h1>

                <form>
                    <div class="row">
                        <div class="col-12 col-md-6">
                            <div class="form-group">
                                <label for="exampleInputName">Name</label>
                                <input type="text" class="form-control" id="exampleInputName" aria-describedby="nameHelp" placeholder="Enter your Name">
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPhone">Phone</label>
                                <input type="phone" class="form-control" id="exampleInputPhone" aria-describedby="phoneHelp" placeholder="Enter your Phone">
                            </div>
                        </div>
                        <div class="col-12 col-md-6">
                            <div class="form-group">
                                <label for="exampleInputEmail1">Email</label>
                                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter your Email">
                            </div>
                            <div class="form-group">
                                <label for="exampleInputAddress1">Address</label>
                                <input type="text" class="form-control" id="exampleInputAddress1" placeholder="Enter your Address" aria-describedby="addressHelp">
                            </div>
                        </div>
                    </div>
                    <div class="text-left">
                        <total></total>
                    </div>
                    <div class="form-group">
                        <button type="submit" class="btn btn-success" @click="submitForm">Submit</button>
                    </div>
                </form>
            </template>

            <template v-else>
                <h2>Your order has been sent!</h2>
            </template>
        </template>
        <template v-else>
            <div class="alert alert-warning">
                <h2>Your order is empty!</h2>
            </div>
        </template>
    </div>
</template>
        
<script>
    import {mapGetters} from 'vuex';
    import { mapActions } from 'vuex';
    import Total from './Total';

    export default {
        name: `Checkout`,
        components: {
            Total
        },
        props: {
            
        },
        data() {
            return {
                isFormSubmitted: false
            }
        },
        computed: {
            ...mapGetters('cart', {
                inCartProducts: 'products',
                shownTotalPriceWithDelivery: 'shownTotalPriceWithDelivery',
            }),
            ...mapGetters('products', {
                allProducts: 'items'
            }),
            isCHeckout() {
                return this.products.length > 0;
            },
            products() {
                return this.allProducts.filter((item) => {
                    return this.inCartProducts.map(item => item.id).indexOf(item.id) !== -1;
                });
            },
            isLoggedIn() {
                return this.$store.getters.isAuthenticated
            },
            email () {
                return !this.$store.getters.user ? false : this.$store.getters.user.email
            }
        },
        mounted() {
            
        },
        methods: {
            ...mapActions('cart', {
                cleanBasket: 'clean',
            }),
            submitForm() {
                const order = {
                    price: this.shownTotalPriceWithDelivery,
                    products: []
                }

                this.products.forEach((item) => {
                    order.products.push(item.title);
                })

                if (this.isLoggedIn) {
                    order.email = this.email
                }

                this.$store.dispatch('postOrder', order)

                this.isFormSubmitted = true;
                this.cleanBasket();
            }
        }
    }
</script>

<style>
.form-group {
    text-align: left;
}

label {
    padding-left: 0.75rem;
}
</style>
