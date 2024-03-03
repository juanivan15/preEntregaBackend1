const express = require("express");
const router = express.Router();
const ProductManager = require("../controllers/product-manager.js");
const productManager = new ProductManager("./src/models/products.json");


router.get("/", async (req, res) => {
  try {
    const products = await productManager.getProducts();

    res.render("home", {productos: products, titulo: "Mis productos"});
    
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

module.exports = router;