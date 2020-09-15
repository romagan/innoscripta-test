<template>
    <div class="orders">
        <h1>Orders</h1>

        <table class="table table-bordered table-hover">
            <thead>
                <tr class="table-active">
                    <th>#</th>
                    <th>Order</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                <!-- eslint-disable-next-line-->
                <tr v-for="(order, i) in orders">
                    <td>{{ ++i }}</td>
                    <td>
                        <!-- eslint-disable-next-line-->
                        <span v-for="product in order.products">{{ product }}</span>
                    </td>
                    <td>{{ order.price }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
        
<script>
    export default {
        name: `Orders`,
        components: {
            
        },
        props: {
            
        },
        data() {
            return {
                
            }
        },
        computed: {
            orders() {
                return !this.$store.getters.orders ? false : this.$store.getters.orders
            }
        },
        mounted() {
        },
        methods: {
            
        }
    }
</script>
<style>
.orders table td {
    vertical-align: middle;
}

.orders table tr span {
    display: block;
}
</style>
