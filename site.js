class Product {
    id;
    name;
    price;
    constructor (id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }

    toMap() {
        return {'id': this.id, 'name': this.name, 'price': this.price};
    }
}

class AddToCart {
    product;
    constructor (product) {
        this.product = product;
    }

    addToCart () {
        const product = this.product.toMap();
        if (localStorage.getItem('products')) {
            const products = JSON.parse(localStorage.getItem('products'));
            const product_idx = products.findIndex(function (saved_product) {
                return saved_product.id === product.id;
            });
            if (product_idx >= 0) {
                products[product_idx].quantity += 1;
            }
            else {
                products.push({...product, quantity: 1});
            }
            localStorage.setItem('products', JSON.stringify(products));
        }
        else {
            localStorage.setItem('products', JSON.stringify([{...product, quantity: 1}]));
        }
    }
}

const addProduct = function (id, name, price) {
    const product = new Product(id, name, price)
    const addToCart = new AddToCart(product);
    addToCart.addToCart();
};