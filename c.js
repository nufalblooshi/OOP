const discountPer = 0.25;
class Cart {
    products;
    constructor(discountPer) {
        this.products = JSON.parse(localStorage.getItem("products") || "[]");
        console.log("inside con");
    }
    renderHTML = () => {
        document.getElementById("product-cart").innerHTML = "";
        this.products.forEach((p, i) => {
            document.getElementById("product-cart").innerHTML += this.getProductHTMLRow(p, i);
        });
        document.getElementById("shipping-cost").innerHTML = `$${this.getShipping()}`;
        document.getElementById("subtotal-cost").innerHTML = `$${this.getSubTotal()}`;
        document.getElementById("total-cost").innerHTML = `$${this.getTotal()}`;
    };
    getShipping = () => {
        return this.products.length * 10;
    };
    getSubTotal = () => {
        return this.products.map((p) => p.price * p.quantity).reduce((a, e) => (a += e));
    };
    getTotal = () => this.getShipping() + this.getSubTotal();
    decQuantity = (i) => {
        if (this.products[i].quantity > 1) this.products[i].quantity--;
        localStorage.setItem("products", JSON.stringify(this.products));
        this.renderHTML();
    };
    incQuantity = (i) => {
        this.products[i].quantity++;
        localStorage.setItem("products", JSON.stringify(this.products));
        this.renderHTML();
    };
    remove = (i) => {
        this.products.splice(i, 1);
        localStorage.setItem("products", JSON.stringify(this.products));
        this.renderHTML();
    };
    getProductHTMLRow = (p, i) => {
        return `
        <ul class="myClass">
            <li><img src="./images/${p.productName}.jpg" alt="" style="width: 50px;">${p.productName}</li>
            <li>$${p.price}</li>
            <li>
            <button id="minus-btn" onclick="cart.decQuantity(${i})"><i class="fa-solid fa-minus"></i></button>
            ${p.quantity}
            <button id="plus-btn" onclick="cart.incQuantity(${i})"><i class="fa-solid fa-plus"></i></button>
            </li>
            <li>$${p.price * p.quantity}</li>
            <li><button id="remove-btn" onclick="cart.remove(${i})"><i class="fa-solid fa-x"></i></button></li>
        </ul>
        `
    };
    addCoupon() {
        let couponCode = document.getElementById("coupon").value;
        if (couponCode == "Sprints" || couponCode == "sprints") {
            let subtotal = document.getElementById("subtotal-cost").innerHTML;
            subtotal = subtotal.slice(1);
            let shippingCost = document.getElementById("shipping-cost").innerHTML;
            shippingCost = shippingCost.slice(1);
            let discount = subtotal * discountPer;
            document.getElementById("discount").innerHTML = "$" + "-" + discount;
            let newPrice = subtotal - discount;
            let total = newPrice + parseInt(shippingCost);
            document.getElementById("total-cost").innerHTML = "$" + total;
            document.getElementById("coupon-btn").disabled = true;
            document.getElementById("coupon-btn").style.backgroundColor = "grey"
            document.getElementById("coupon-btn").style.cursor = "none";
        } else {
            alert("Coupon is invalid!");
        }
    }
}
let cart = new Cart();
cart.renderHTML();