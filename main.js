const fs = require('fs');

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
    this.productIdCounter = 1;
  }

  addProduct(product) {
    if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
      console.error("Todos los campos son obligatorios.");
      return;
    }

    const productos = this.getProductsFromFile();
    if (productos.some((p) => p.code === product.code)) {
      console.error("Ya existe un producto con el mismo código.");
      return;
    }

    product.id = this.productIdCounter++;
    productos.push(product);
    this.saveProductsToFile(productos);
    console.log("Producto agregado:", product);
  }

  getProductsFromFile() {
    try {
      const data = fs.readFileSync(this.path, 'utf8');
      return JSON.parse(data);
    } catch (err) {
      console.error("Error al leer el archivo de productos:", err);
      return [];
    }
  }

  saveProductsToFile(productos) {
    try {
      fs.writeFileSync(this.path, JSON.stringify(productos, null, 2));
    } catch (err) {
      console.error("Error al guardar los productos en el archivo:", err);
    }
  }

  getProducts() {
    return this.getProductsFromFile();
  }

  getProductById(id) {
    const productos = this.getProductsFromFile();
    const product = productos.find((p) => p.id === id);

    if (!product) {
      console.error("Producto no encontrado.");
    }

    return product;
  }
  actualizarProducto(id, productoActualizado) {
    const productos = this.getProductsFromFile();
    const index = productos.findIndex((p) => p.id === id);

    if (index !== -1) {
      productos[index] = { ...productoActualizado, id }; // Mantener el mismo ID
      this.saveProductsToFile(productos);
      console.log("Producto actualizado:", productos[index]);
    } else {
      console.error("Producto no encontrado.");
    }
  }

  eliminarProducto(id) {
    let productos = this.getProductsFromFile();
    productos = productos.filter((p) => p.id !== id);
    this.saveProductsToFile(productos);
    console.log("Producto eliminado con éxito.");
  }

}

//Testeo

const productosListados = new ProductManager('productos.json');

console.log("Todos los productos:", productosListados.getProducts());

productosListados.addProduct({
  title: "Azucar",
  description: "Para endulzar tu vida",
  price: 2,
  thumbnail: "img/fotoAzucar.jpg",
  code: "A02",
  stock: 20
});

productosListados.addProduct({
  title: "Azucar",
  description: "Para endulzar tu vida",
  price: 2,
  thumbnail: "img/fotoAzucar.jpg",
  code: "A02",
  stock: 20
});

productosListados.addProduct({
  title: "Yerba",
  description: "Tus mejores mates",
  price: 3,
  thumbnail: "img/fotoYerba.jpg",
  code: "Y01",
  stock: 25
});


console.log("Todos los productos:", productosListados.getProducts());


console.log("Producto por ID:", productosListados.getProductById(1));

productosListados.actualizarProducto(2, {
  title: "Yerba Nueva Vida",
  description: "Ahora si los mejores mates.",
  price: 10,
  thumbnail: "/img/nuevaYerba.jpg",
  code: "Y03",
  stock: 29,
});

console.log("Todos los productos:", productosListados.getProducts());

productosListados.eliminarProducto(1);

console.log("Todos los productos:", productosListados.getProducts());