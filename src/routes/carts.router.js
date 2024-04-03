const express = require("express");
const router = express.Router();
const CartManager = require("../controllers/cart-manager.js");
const cartManager = new CartManager();
const CartModel = require("../models/cart.model.js")

//1)Listar los carritos:

router.get("/", async (req, res) => {
    try {
        const carts = await CartModel.find();
       
        res.json(carts);
        
    } catch (error) {
        console.error("Error al obtener los carritos", error);
        res.status(500).json({
            error: "Error interno del servidor"
        });
    }
});

//2) Crear nuevo carrito: 

router.post("/", async (req, res) => {
    try {
        const newCart = await cartManager.createCart();
        res.json(newCart);
    } catch (error) {
        console.error("Error al crear un nuevo carrito", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

//3) Listar productos de un carrito determinado. 

router.get("/:cid", async (req, res) => {
    const cartId = req.params.cid;

    try {
        const cart = await CartModel.findById(cartId);

        if(!cart){
            console.log("No se encuentra carrito con el id buscado");
            return res.status(404).json({error: "Carrito no encontrado"});
        }

        return res.json(cart.products);

    } catch (error) {
        console.error("Error al obtener el carrito", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});


//4) Agregar productos al carrito.

router.post("/:cid/product/:pid", async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = req.body.quantity || 1;

    try {
        const updateCart = await cartManager.addProductToCart(cartId, productId, quantity);
        res.json(updateCart.products);
    } catch (error) {
        console.error("Error al agregar producto al carrito", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

//5) Eliminar un producto del carrito:

router.delete('/:cid/product/:pid', async (req, res) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;

        //Se verifica: 
        console.log(cartId);
        console.log(productId);

        const updatedCart = await cartManager.deleteProductFromCart(cartId, productId);
        

        res.json({
            status: 'success',
            message: 'Producto eliminado del carrito correctamente',
            updatedCart,
        });
    } catch (error) {
        console.error('Error al eliminar el producto del carrito', error);
        res.status(500).json({
            status: 'error',
            error: 'Error interno del servidor',
        });
    }
});

//6)Actualizo los productos del carrito:

router.put('/:cid', async (req, res) => {
    const cartId = req.params.cid;
    const updatedProducts = req.body;
    //Se envia un arreglo de productos en el body.

    try {
        const updatedCart = await cartManager.updateCart(cartId, updatedProducts);
        res.json(updatedCart);
    } catch (error) {
        console.error('Error al actualizar el carrito', error);
        res.status(500).json({
            status: 'error',
            error: 'Error interno del servidor',
        });
    }
});

//7) Modificar la cantidad de productos:

router.put('/:cid/product/:pid', async (req, res) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const newQuantity = req.body.quantity;

        const updatedCart = await cartManager.updateProductQuantity(cartId, productId, newQuantity);

        res.json({
            status: 'success',
            message: 'Cantidad del producto actualizada correctamente',
            updatedCart,
        });
    } catch (error) {
        console.error('Error al actualizar la cantidad del producto en el carrito', error);
        res.status(500).json({
            status: 'error',
            error: 'Error interno del servidor',
        });
    }
});

//8) Vaciar carrito:

router.delete('/:cid', async (req, res) => {
    try {
        const cartId = req.params.cid;

        const updatedCart = await cartManager.clearCart(cartId);

        res.json({
            status: 'success',
            message: 'Todos los productos del carrito fueron eliminados correctamente',
            updatedCart,
        });
    } catch (error) {
        console.error('Error al vaciar el carrito', error);
        res.status(500).json({
            status: 'error',
            error: 'Error interno del servidor',
        });
    }
});

module.exports = router;