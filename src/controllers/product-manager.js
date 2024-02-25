const fs = require("fs").promises;

class ProductManager {
  static lastId = 0;

  constructor(path) {
    this.products = [];
    this.path = path;
  }

  async addProduct({ title, description, price, thumbnail, code, stock, category }) {
    try {
      const products = await this.readFromFile();

      if (!title || !description || !price || !category || !code || !stock ) {
        console.log("Todos los campos son obligatorios");
        return;
      }

      if (products.some(item => item.code === code)) {
        console.log("El código debe ser único");
        return;
      }

      const newProduct = {
        title,
        description,
        price,
        code,
        stock,
        category,
        status: true,
        thumbnails: thumbnail || []
      };

      if (products.length > 0) {
        ProductManager.lastId = products.reduce((maxId, product) => Math.max(maxId, product.id), 0);
      }

      newProduct.id = ++ProductManager.lastId; 
      products.push(newProduct);
      await this.saveToFile(products);
    } catch (error) {
      console.log("Error al agregar producto", error);
      throw error; 
    }
  }
  
  async getProducts() {
    try {
      const products = await this.readFromFile();
      return products;
    } catch (error) {
      console.log("Error al leer el archivo", error);
      throw error;
    }
  }

  async getProductById(id) {
    try {
      const products = await this.readFromFile();
      const wantedProduct = products.find(item => item.id === id);
      if (!wantedProduct) {
        console.log("Producto no encontrado");
        return null;
      } else {
        console.log("Producto encontrado");
        return wantedProduct;
      }
    } catch (error) {
      console.log("Error al leer el archivo", error);
      throw error;
    }
  }

  async readFromFile() {
    try {
      const answer = await fs.readFile(this.path, "utf-8");
      const products = JSON.parse(answer);
      return products;
    } catch (error) {
      console.log("Error al leer un archivo", error);
      throw error;
    }
  }

  async saveToFile(products) {
    try {
      await fs.writeFile(this.path, JSON.stringify(products, null, 2));
    } catch (error) {
      console.log("Error al guardar el archivo", error);
      throw error;
    }
  }

  async updateProduct(id, updatedProduct) {
    try {
      const products = await this.readFromFile();
      const index = products.findIndex(item => item.id === id);
      if (index !== -1) {
        products[index] = { ...products[index], ...updatedProduct };
        await this.saveToFile(products);
        console.log("Producto actualizado");
      } else {
        console.log("No se encontró el producto");
      }
    } catch (error) {
      console.log("Error al actualizar el producto", error);
      throw error;
    }
  }

  async deleteProduct(id) {
    try {
      const products = await this.readFromFile();
      const index = products.findIndex(item => item.id === id);
      if (index !== -1) {
        products.splice(index, 1);
        await this.saveToFile(products);
        console.log("Producto eliminado");
      } else {
        console.log("No se encontró el producto");
      }
    } catch (error) {
      console.log("Error al eliminar el producto", error);
      throw error;
    }
  }
}

module.exports = ProductManager;