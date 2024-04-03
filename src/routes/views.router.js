const express = require("express");
const router = express.Router();
const ProductManager = require("../controllers/product-manager.js");
const CartManager = require("../controllers/cart-manager.js")
const productManager = new ProductManager();
const cartManager = new CartManager();
const CartModel = require("../models/cart.model.js")


router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 4 } = req.query;
    const products = await productManager.getProducts({
      page: parseInt(page),
      limit: parseInt(limit)
    });

    const arrayProducts = products.docs.map(product => {
      const { _id, ...rest } = product.toObject();
      return rest;
   });


    res.render("home", {
      products: arrayProducts,
      titulo: "Mis productos",
      hasPrevPage: products.hasPrevPage,
      hasNextPage: products.hasNextPage,
      prevPage: products.prevPage,
      nextPage: products.nextPage,
      currentPage: products.page,
      totalPages: products.totalPages
    });
    
  } catch (error) {
    console.log("No se pudo obtener los productos", error);
    res.status(500).json({error: "Error interno del servidor"});   
  }
})

router.get("/carts/:cid", async (req, res) => {
  const cartId = req.params.cid;

  try {
     const cart = await CartModel.findById(cartId);

     if (!cart) {
        console.log("No existe el carrito buscado");
        return res.status(404).json({ error: "Carrito no encontrado" });
     }

     const productsOnCart = cart.products.map(item => ({
      product: item.product.toObject(), 
      quantity: item.quantity
    }));
    
    
    res.render("carts", { products: productsOnCart });
  } catch (error) {
     console.error("Error al obtener el carrito", error);
     res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.get("/realTimeProducts", (req, res) => {
  try {
    res.render("realTimeProducts", {title: "Productos en tiempo real"});
  } catch (error) {
    res.status(500).json({ error: error });
  }
})

router.get("/chat", async (req, res) => {
  res.render("chat");
})


module.exports = router;