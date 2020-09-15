<template>
    <div class="">
        <h1>Products</h1>

        <div class="row">
            <!-- eslint-disable-next-line-->
            <div v-for="(product, index) in products" class="col-6 col-md-4">
                <div class="product-card">
                    <router-link
                        tag="a"
                        class="product-card__image"
                        :to="`/product/${product.id}`">
                        <template v-if="product.src">
                            <img class="catalog-items__card-preview-pict" :src="product.src" :alt="product.title">
                        </template>
                    </router-link>
                    <router-link
                        tag="a"
                        class="product-card__name"
                        :to="`/product/${product.id}`">
                        {{ product.title }}
                    </router-link>
                    <p class="product-card__desc">{{ product.description }}</p>
                    <div class="product-card__price">
                        {{ shownPrice(product.price) }}
                    </div>
                    <div>
                        <button
                            v-if="toggleButtons(product.id)"
                            class="btn btn-success"
                            type="button"
                            @click.prevent="addToCart({id:product.id, price:product.price})">
                            Add to Cart
                        </button>
                        <button
                            v-else
                            class="btn btn-warning"
                            type="button"
                            @click.prevent="removeFromCart(product.id)">
                            Remove from Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
        
<script>
    import { mapGetters } from 'vuex';
    import { mapActions } from 'vuex';

    export default {
        name: `ProductsList`,
        components: {
            
        },
        props: {
            
        },
        data() {
            return {
                
            }
        },
        computed: {
            ...mapGetters('products', {
                products: 'items',
            }),
            ...mapGetters('cart', {
                inCartQty: 'products',
                toUsdCoefficient: 'toUsdCoefficient'
            }),
        },
        mounted() {
            
        },
        methods: {
            ...mapActions('cart', {
                addToCart: 'add',
                removeFromCart: 'remove',
            }),
            toggleButtons(id) {
                return this.inCartQty.map(item => item.id).indexOf(id) === -1;
            },
            shownPrice(price) {
                const totalUsd = price * this.toUsdCoefficient;

                return `${price} € / ${totalUsd.toFixed()} $`;
            }
        }
    }
</script>

<style lang="scss">
$speed: 0.4s;
$unit: 8px;
$color-accent: #42b983;
$color-accentHover: darken($color-accent, 20%);
$color-icons: gray;
$color-border: green;

.product-card {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding-bottom: $unit*5;
}

.product-card__image {
    position: relative;

    display: block;
    margin-bottom: $unit*2;

    // background-color: $color-cream;

    &::before {
        content: "";

        display: block;
        padding-top: 100%;
    }

    img {
        position: absolute;
        z-index: 1;
        top: 0;
        left: 0;

        height: 100%;
        width: 100%;
        object-fit: contain;
    }

    &_cover {
        img {
            object-fit: cover;
        }
    }

    &:hover {
        & + .product-card__name {
            color: $color-accentHover;

            transition: $speed;
        }
    }

    &:active,
    &:focus {
        opacity: 0.8;
    }

    @media (min-width: 1920px) {
        margin-bottom: $unit*4;
    }
}

.product-card__name {
    font-size: 14px;
    line-height: 18px;
    text-decoration: none;

    transition: $speed;

    &:hover {
        color: $color-accentHover;
        text-decoration: none;

        transition: $speed;
    }

    &:active,
    &:focus {
        opacity: 0.8;
    }

    @media (min-width: 768px) {
        margin-bottom: $unit;
    }

    @media (min-width: 1280px) {
        margin-bottom: $unit;

        font-size: $unit*2;
        line-height: $unit*3;
    }

    @media (min-width: 1920px) {
        margin-left: $unit*2;
    }
}

.product-card__desc {
    margin: 0;
    margin-bottom: $unit;

    font-size: $unit*1.5;
    line-height: $unit*2;

    @media (min-width: 768px) {
        margin-bottom: $unit*2;

        font-size: $unit*2;
        line-height: $unit*3;
    }

    @media (min-width: 1920px) {
        margin-bottom: $unit*3;
        margin-left: $unit*2;
    }
}

.product-card__price-line {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: auto;
}

.product-card__price-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.product-card__price {
    margin-bottom: 10px;
    margin-top: auto;

    font-weight: 600;
    font-size: 14px;
    line-height: 18px;
    text-transform: uppercase;

    &_old {
        margin-right: $unit;

        font-size: 10px;
        line-height: $unit*2;
        color: $color-icons;
        font-weight: 400;
        text-decoration: line-through;
    }

    @media (min-width: 768px) {
        font-size: $unit*2;
        line-height: $unit*3;

        &_old {
            font-size: 13px;
            line-height: 20px;
        }
    }

    @media (min-width: 1440px) {
        font-size: 18px;

        &_old {
            margin-left: $unit*2;

            font-size: 14px;
            line-height: $unit*3;
        }
    }

    @media (min-width: 1920px) {
        margin-left: $unit*2;
    }
}

.product-card__buttons {
    display: flex;
    align-items: center;
    margin-left: auto;

    @media (min-width: 768px) {
        margin-right: $unit*2;
    }

    @media (min-width: 1280px) {
        margin-right: 0;
    }

    @media (min-width: 1920px) {
        margin-right: $unit*2;
    }
}

.product-card__btn {
    margin-left: $unit*2;

    svg {
        display: block;
        width: $unit*2;
        height: $unit*2;

        fill: $color-border;

        transition: $speed;
    }

    &_active {
        svg {
            fill: $color-accent;
        }
    }

    &:hover {
        &:not(.product-card__btn_active) {
            svg {
                fill: $color-accent;
                opacity: 0.7;

                transition: $speed;
            }
        }
    }

    &:active,
    &:focus {
        &:not(.product-card__btn_active) {
            opacity: 0.7;
        }
    }

    @media (min-width: 768px) {
        margin-left: $unit*2.5;

        svg {
            width: $unit*2.5;
            height: $unit*2.5;
        }
    }

    @media (min-width: 1280px) {
        margin-left: $unit*3;
    }
}

</style>