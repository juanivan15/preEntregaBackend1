const express = require("express");

const app = express();

const PORT = 8080;

const productsRouter = require("./routes/products.router.js");

const cartsRouter = require("./routes/carts.router.js");

//Middleware

app.use(express.urlencoded({ extended: true }));

app.use(express.json());


//Rutas

app.get("/", (req, res) => {
    res.send("Esta es mi primer preEntrega con Express!");
})

app.use("/api/products", productsRouter);

app.use("/api/carts", cartsRouter);

//Listen

app.listen(PORT, () =>{
    console.log(`Escuchando en http://localhost:${PORT}`);
})