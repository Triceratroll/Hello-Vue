Vue.component('product', {
    template: `
        <div class='product'>

            <div class="product-image">
                <img v-bind:src="image">
            </div>

            <div class="product-info">
                <H1>{{ title }}</H1>
                <p v-if="inStock > 10">In stock</p>
                <p v-else-if="inStock<= 10 && inStock > 0">Almost sold out !</p>
                <p v-else class="no-stock">Out of stock</p>

                <ul>
                    <li v-for="detail in details">{{ detail }}</li>
                </ul>

                <button @click="addToCart" 
                :disabled="inStock === 0"
                :class="{ disabledButton: inStock === 0 }">Add to Cart</button>
                <button v-on:click="emptyCart">Empty Cart</button>
                <div class="cart">
                    <p>Cart({{ cart }})</p>
                </div>

                <div v-for="(variant, index) in variants" 
                :key="variant.variantId"
                class="color-box"
                :style="{ backgroundColor: variant.variantColor }"
                @mouseover="updateProduct(index)">
                </div>

            </div>

        </div>
    `,
    data() {
        return {
            product: 'Socks',
            brand: 'Happy',
            selectedVariant: 0,
            onSale: false,
            details: ["hand-made", "20%polyester", "80% cotton"],
            variants: [
                {
                    variantid: 2221,
                    variantColor: 'grey',
                    variantImage: './assets/socks-1.jpg',
                    variantQuantity: 10

                },
                {
                    variantid: 2222,
                    variantColor: 'black',
                    variantImage: './assets/socks-2.jpg',
                    variantQuantity: 0

                }
            ],
            cart: 0,
        }
    },
    methods: {
        addToCart: function () {
            this.cart += 1
        },
        updateProduct: function(index) {
            this.selectedVariant = index
        },
        emptyCart: function() {
            this.cart = 0
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].variantImage 
        },
        inStock(){
            return this.variants[this.selectedVariant].variantQuantity
        }
    }

})

var app = new Vue({
    el: '#app'
})