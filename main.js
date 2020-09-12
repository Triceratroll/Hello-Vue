var app = new Vue({
    el:'#app',
    data: {
        product: 'Socks',
        stock: 10,
        image: "./assets/socks-1.jpg",
        onSale: false,
        details: ["hand-made", "20%polyester", "80% cotton"],
        variants: [
            {
                variantid: 2221,
                variantColor: 'Grey',
                variantImage: './assets/socks-1.jpg'

            },
            {
                variantid: 2222,
                variantColor: 'Black',
                variantImage: './assets/socks-2.jpg'

            }
        ],
        cart: 0,
    },
    methods: {
        addToCart: function () {
            this.cart += 1
        },
        updateProduct: function(variantImage) {
            this.image = variantImage
        },
        emptyCart: function() {
            this.cart = 0
        }
    }
})