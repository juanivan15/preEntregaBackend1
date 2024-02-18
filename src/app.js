const express = require("express");

const app = express();

const PORT = 8080;

const ProductManager = require("./controllers/product-manager.js");

const productManager = new ProductManager("./src/models/productos.json");

app.use(express.json());


//Rutas

app.get("/", (req, res) => {
    res.send("Este es mi primer desafio con Express!");
})

app.get("/products", async (req, res) => {
    try {
        const limit = req.query.limit;
        const productos = await productManager.getProducts();
        if (limit) {
            res.json(productos.slice(0, limit));
        } else {
            res.json(productos)
        }
    } catch (error) {
        res.status(500).json({error: "Error interno del servidor"})
    }
})

app.get("/products/:pid", async (req, res) => {
    try {
        let pid = req.params.pid;
        const producto = await productManager.getProductById(parseInt(pid));

        if(!producto) {
            return res.json({error: "ID no encontrado"});
        }
        res.json(producto);
    } catch (error) {
        res.status(500).json({error: "Error interno del servidor"})
    }
})

//Listen

app.listen(PORT, () =>{
    console.log(`Escuchando en http://localhost:${PORT}`);
})