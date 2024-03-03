 console.log("En funcionamiento");
 
 const socket = io()

 socket.on("products", (data) => {
    const productsList = document.getElementById("productsList");
    productsList.innerHTML = "";
    data.forEach((product) => {
      productsList.innerHTML += `
      <div class='cards'>
      <h3>Titulo : ${product.title}</h3>
      <p>Descripción : ${product.description}</p>
      <p>$${product.price}</p>
      <button class='deleteButton'>Eliminar</button>
      </div>
      `;
    });
  
    //Eliminar
    const deleteButtons = document.querySelectorAll(".deleteButton");
    deleteButtons.forEach((button, index) => {
      button.addEventListener("click", () => {
        deleteProduct(data[index].id);
      });
    });
  
    //Agregar
    const submitButton = document.getElementById("submit-button");
    submitButton.addEventListener("click", (event) => {
      event.preventDefault();
      addProduct();
    });
  });
  
  const deleteProduct = (id) => {
    socket.emit("deleteProduct", id);
  };
  
  const addProduct = () => {
    const title = document.getElementById("form-title").value;
    const status = document.getElementById("form-select").value === "true";
    const category = document.getElementById("form-category").value;
    const description = document.getElementById("form-description").value;
    const price = parseInt(document.getElementById("form-price").value);
    const thumbnail = document.getElementById("form-thumbnail").value;
    const code = document.getElementById("form-code").value;
    const stock = parseInt(document.getElementById("form-stock").value);
  
    // Se verifica si estan completos los campos
    if (
      title &&
      status !== undefined &&
      category &&
      description &&
      price &&
      code &&
      stock !== undefined
    ) {
      const product = {
        title,
        status,
        category,
        description,
        price,
        thumbnail,
        code,
        stock,
      };  
      socket.emit("addProduct", product);
    } else {
      console.error("Complete todos los campos");
    }
  };