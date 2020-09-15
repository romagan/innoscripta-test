<template>
    <div class="cart-total">
        <span>
            Total price: <b>{{ shownTotalPriceWithDelivery }}</b>
        </span>
    </div>
</template>
        
<script>
    import {mapGetters} from 'vuex';
    
    export default {
        name: `Total`,
        components: {
            
        },
        props: {
            
        },
        data() {
            return {
                
            }
        },
        computed: {
            ...mapGetters('cart', {
                shownTotalPriceWithDelivery: 'shownTotalPriceWithDelivery',
            }),
        },
        mounted() {
            
        },
        methods: {
            
        }
    }
</script>