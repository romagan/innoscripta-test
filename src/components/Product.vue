<template>
    <div class="">
        <h1>{{ product.title }}</h1>
        
        <div class="alert alert-success"></div>
    </div>
</template>
        
<script>
    export default {
        name: `Product`,
        components: {
            
        },
        props: {
            
        },
        data() {
            return {
                
            }
        },
        computed: {
            id() {
                return this.$route.params.id;
            },
            product() {
                return this.$store.getters['products/item'](this.id);
            }
        },
        mounted() {
            
        },
        methods: {
            
        }
    }
</script>