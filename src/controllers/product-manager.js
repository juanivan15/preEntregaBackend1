const ProductModel = require("../models/product.model.js");

class ProductManager {

  async addProduct({ title, description, price, thumbnail, code, stock, category }) {
    try {

      if (!title || !description || !price || !category || !code || !stock ) {
        console.log("Todos los campos son obligatorios");
        return;
      }

      const productExists = await ProductModel.findOne({code:code});

      if (productExists) {
        console.log("El código debe ser único");
        return;
      }

      const newProduct = new ProductModel({
        title,
        description,
        price,
        code,
        stock,
        category,
        status: true,
        thumbnails: thumbnail || []
      });

      await newProduct.save();

    } catch (error) {
      console.log("Error al guardar producto", error);
      throw error; 
    }
  }
  
  async getProducts() {
    try {
      const products = await ProductModel.find();
      return products;
    } catch (error) {
      console.log("Error al leer la base de datos", error);
      throw error;
    }
  }

  async getProductById(id) {
    try {
      const product = await ProductModel.findById(id);
      if (!product) {
        console.log("Producto no encontrado");
        return null;
      } else {
        console.log("Producto encontrado");
        return product;
      }
    } catch (error) {
      console.log("Error al buscar producto", error);
      throw error;
    }
  }

  async updateProduct(id, updatedProduct) {
    try {

      const updateProduct = await ProductModel.findByIdAndUpdate(id, updatedProduct)  
      if(!updateProduct){
        console.log("Producto no encontrado!");
        return null;
      }

      console.log("Producto actualizado correctamente!");
      return updateProduct;

    } catch (error) {
      console.log("Error al actualizar el producto", error);
      throw error;
    }
  }

  async deleteProduct(id) {
    try {

        const deleteProduct = await ProductModel.findByIdAndDelete(id);

        if(!deleteProduct){
          console.log("Producto no encontrado!");
          return null;
        }
        
        console.log("Producto eliminado correctamente!");

    } catch (error) {
      console.log("Error al eliminar el producto", error);
      throw error;
    }
  }
}

module.exports = ProductManager;