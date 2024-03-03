const express = require("express");

const exphbs = require("express-handlebars");

const socket = require("socket.io");

const app = express();

const PORT = 8080;

const productsRouter = require("./routes/products.router.js");

const cartsRouter = require("./routes/carts.router.js");

const viewsRouter = require("./routes/views.router.js");

//Config handlebars

app.engine("handlebars", exphbs.engine());

app.set("view engine", "handlebars");

app.set("views", "./src/views");


//Middleware

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.static("./src/public"));


//Rutas

app.use ("/", viewsRouter);

app.use("/api/products", productsRouter);

app.use("/api/carts", cartsRouter);

//Listen

const httpServer = app.listen(PORT, () =>{
    console.log(`Escuchando en http://localhost:${PORT}`);
})

//Busco los productos:

const ProductManager = require("./controllers/product-manager.js");

const productManager = new ProductManager("./src/models/products.json");

//Socket.io: 

const io = socket(httpServer);

//2) Configuramos socket.io

io.on("connection", async (socket) => {

    console.log("Un cliente se ha conectado");

    const products = await productManager.getProducts();

    socket.emit("products", products);
  
    socket.on("deleteProduct", async (id) => {

      await productManager.deleteProduct(id);

      const products = await productManager.getProducts();

      io.sockets.emit("products", products);

    });
  
    socket.on("addProduct", async (product) => {
        
      try {
        await productManager.addProduct(product);

        const products = await productManager.getProducts();

        io.sockets.emit("products", products);

      } catch (error) {

        console.log("Error al cargar producto");

      }
    });
  
});