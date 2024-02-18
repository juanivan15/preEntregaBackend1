const fs = require('fs');

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
    this.productIdCounter = 1;
  }

  async addProduct(product) {
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
    await this.saveProductsToFile(productos);
    console.log("Producto agregado:", product);
  }

  async getProductsFromFile() {
    try {
      const data = await fs.readFileSync(this.path, 'utf8');
      return JSON.parse(data);
    } catch (err) {
      console.error("Error al leer el archivo de productos:", err);
      return [];
    }
  }

  async saveProductsToFile(productos) {
    try {
        await fs.writeFileSync(this.path, JSON.stringify(productos, null, 2));
    } catch (err) {
      console.error("Error al guardar los productos en el archivo:", err);
    }
  }

  getProducts() {
    return this.getProductsFromFile();
  }

  async getProductById(id) {
    const productos = await this.getProductsFromFile();
    const product = productos.find((p) => p.id === id);

    if (!product) {
      console.error("Producto no encontrado.");
    }

    return product;
  }

  async updateProduct(id, productoActualizado) {
    const productos = await this.getProductsFromFile();
    const index = productos.findIndex((p) => p.id === id);

    if (index !== -1) {
      productos[index] = { ...productoActualizado, id }; // Mantener el mismo ID
      this.saveProductsToFile(productos);
      console.log("Producto actualizado:", productos[index]);
    } else {
      console.error("Producto no encontrado.");
    }
  }

  async deleteProduct(id) {
    let productos = await this.getProductsFromFile();
    productos = productos.filter((p) => p.id !== id);
    this.saveProductsToFile(productos);
    console.log("Producto eliminado con éxito.");
  }

}

module.exports = ProductManager;