const CartModel = require("../models/cart.model.js");

class CartManager {

    async createCart() {
        try {
            const newCart = new CartModel({products:[]});
            await newCart.save();
            return newCart;
        } catch (error) {
            console.log("Error al crear el carrito");
            throw error;
        }
    }

    async getCarts() {
        try {
          const carts = await CartModel.find();
          return carts;
        } catch (error) {
          console.log("Error al leer la base de datos", error);
          throw error;
        }
    }
    
    async getCartById(cartId) {
        try {
            const cart = await CartModel.findById(cartId);
            if (!cart) {
                throw new Error(`No existe un carrito con el id ${cartId}`);
            }
            return cart;
        } catch (error) {
            console.error("Error al obtener el carrito por ID", error);
            throw error;
        }
    }

    async addProductToCart(cartId, productId, quantity = 1) {
        try {
            const cart = await this.getCartById(cartId);
            const aProduct = cart.products.find(item => item.product.toString() === productId);

            if (aProduct) {
                aProduct.quantity += quantity;
            } else {
                cart.products.push({ product: productId, quantity });
            }

            cart.markModified("products");
            await cart.save();
            return cart;
        } catch (error) {
            console.error("Error al agregar un producto al carrito", error);
            throw error;            
        }
    }

}

module.exports = CartManager;