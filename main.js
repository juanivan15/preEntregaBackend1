class ProductManager {
    constructor() {
      this.products = [];
      this.productIdCounter = 1;
    }
  
    addProduct(product) {
      if (!product.title || !product.descripcion || !product.price || !product.thumbnail || !product.code || !product.stock) {
        console.error("Todos los campos son obligatorios.");
        return;
      }
  
      if (this.products.some((p) => p.code === product.code)) {
        console.error("Ya existe un producto con el mismo código.");
        return;
      }
  
      product.id = this.productIdCounter++;
      this.products.push(product);
      console.log("Producto agregado:", product);
    }
  
    getProducts() {
      return this.products;
    }
  
    getProductById(id) {
      const product = this.products.find((p) => p.id === id);
  
      if (!product) {
        console.error("Producto no encontrado.");
      }
  
      return product;
    }
  }
  
  //Testeo

  const productosListados = new ProductManager();
  
  console.log("Todos los productos:", productosListados.getProducts());

  productosListados.addProduct({
    title: "Azucar",
    descripcion: "Para endulzar tu vida",
    price: 2,
    thumbnail: "img/fotoAzucar.jpg",
    code: "A02",
    stock: 20
  });

  productosListados.addProduct({
    title: "Azucar",
    descripcion: "Para endulzar tu vida",
    price: 2,
    thumbnail: "img/fotoAzucar.jpg",
    code: "A02",
    stock: 20
  });

  productosListados.addProduct({
    title: "Yerba",
    descripcion: "Tus mejores mates",
    price: 3,
    thumbnail: "img/fotoYerba.jpg",
    code: "Y01",
    stock: 25
  });

  console.log("Todos los productos:", productosListados.getProducts());

  
  const idABuscar = 2;
  
  const encontrarProducto = productosListados.getProductById(idABuscar);

  console.log(`Producto con ID ${idABuscar}:`, encontrarProducto);

  const productoInexistente = 9;

  productosListados.getProductById(productoInexistente);
