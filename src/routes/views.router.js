const express = require("express");
const router = express.Router();
const ProductManager = require("../controllers/product-manager.js");
const productManager = new ProductManager();
const ProductModel = require("../models/product.model.js");


router.get("/", async (req, res) => {
  try {
    const products = await ProductModel.find();

    const arrayProducts = products.map(product => {
      return{
        id: product._id,
        title: product.title,
        price: product.price,
        code: product.code,
        stock: product.stock,
        category: product.category
      }
    })

    res.render("home", {productos: arrayProducts, titulo: "Mis productos"});
    
  } catch (error) {
    console.log("No se pudo conectar con el archivo", error);
    res.status(500).json({error: "Error interno del servidor"});   
  }
})

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