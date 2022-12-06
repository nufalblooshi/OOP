class Product {
    id;
    productName;
    price;
    constructor(id, productName, price) {
      this.id = id;
      this.productName = productName;
      this.price = price;
    }
  }
class saveProduct {
  constructor(){}
  saveToLocalStorage(product) {
    const products = JSON.parse(localStorage.getItem("products") || "[]");
    const oldProductIndex = products.findIndex((x) => x.id === product.id);
    if (oldProductIndex >= 0) {
      products[oldProductIndex].quantity += 1;
    } else {
      products.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("products", JSON.stringify(products));
  }
} 
const addSingleProductToCart = (product)=>{
  let newProduct;
  newProduct = new Product(product.id, product.productName, product.price);
  let productSave = new saveProduct();
  productSave.saveToLocalStorage(newProduct);
}