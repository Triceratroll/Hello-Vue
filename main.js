Vue.component('product-review', {
    template:`
    <form class="review-form" @submit.prevent="onSubmit">

    <p v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
            <li v-for="error in errors"> {{ error }}</li>
        </ul>
    </p>

    <p>
      <label for="name">Name:</label>
      <input id="name" v-model="name" placeholder="name">
    </p>
    
    <p>
      <label for="review">Review:</label>      
      <textarea id="review" v-model="review"></textarea>
    </p>
    
    <p>
      <label for="rating">Rating:</label>
      <select id="rating" v-model.number="rating">
        <option>5</option>
        <option>4</option>
        <option>3</option>
        <option>2</option>
        <option>1</option>
      </select>
    </p>
        
    <p>
      <input type="submit" value="Submit">  
    </p>    
  
  </form>
    `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            errors: []
        }
    },
    methods: {
        onSubmit() { 
            if (this.name && this.rating && this.review) {
                let productReview  = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating
                }
                this.$emit('review-submitted', productReview)
                this.name = null,
                this.review = null,
                this.rating = null
            } else {
                if(!this.name) this.errors.push("Name required")
                if(!this.review) this.errors.push("Review required")
            }
        }
    }
})

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

                <div v-for="(variant, index) in variants" 
                :key="variant.variantId"
                class="color-box"
                :style="{ backgroundColor: variant.variantColor }"
                @mouseover="updateProduct(index)">
                </div>

            </div>

            <div>
                <h2>Reviews</h2>
                <p v-if="!reviews.length">There are no reviews yet</p>
                <ul>
                    <li v-for="review in reviews">
                        <p>{{ review.name }}</p>
                        <p>Rating: {{ review.rating }}</p>
                        <p>{{ review.review }}</p>
                    </li>
                </ul>
            </div>

            <product-review @review-submitted="addReview"></product-review>

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
                    variantId: 2221,
                    variantColor: 'grey',
                    variantImage: './assets/socks-1.jpg',
                    variantQuantity: 10
                },
                {
                    variantId: 2222,
                    variantColor: 'black',
                    variantImage: './assets/socks-2.jpg',
                    variantQuantity: 0
                }
            ],
            reviews: []
        }
    },
    methods: {
        addToCart: function () {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
        },
        updateProduct(index) {
            this.selectedVariant = index
        },
        emptyCart() {
            this.$emit('empty-cart')
        },
        addReview(productReview) {
            this.reviews.push(productReview)
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
    el: '#app',
    data: {
        cart: []
    },
    methods: {
        updateCart(id) {
            this.cart.push(id)
        },
        clearCart() {
            this.cart = []
        }
    }
})