 console.log("En funcionamiento");
 
 const socket = io();

 socket.on("products", (data) => {
    const productsList = document.getElementById("productsList");
    productsList.innerHTML = "";
    data.forEach((product) => {
      productsList.innerHTML += `
      <div class='cards'>
      <h3>Titulo : ${product.title}</h3>
      <p>Descripción : ${product.description}</p>
      <p>$${product.price}</p>
      <button class='deleteButton' data-product-id="${product._id}">Eliminar</button>
      </div>
      `;
    });
  
    //Eliminar
    const deleteButtons = document.querySelectorAll(".deleteButton");
    deleteButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
    const productId = event.target.dataset.productId;
    deleteProduct(productId);
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

  let user;

const chatBox = document.getElementById("chatBox");

Swal.fire({
    title: "Identificación",
    input: "text",
    text: "Ingrese un usuario para identificarse en el chat",
    inputValidator: (value) => {
        return !value && "Necesitas escribir un nombre para continuar"
    },
    allowOutsideClick: false
}).then(result => {
    user = result.value;
    console.log(user);
})


chatBox.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        if (chatBox.value.trim().length > 0) {
            socket.emit("message", { user: user, message: chatBox.value });
            chatBox.value = "";
        }
    }
})

socket.on("message", (data) => {
    let log = document.getElementById("messagesLogs");
    let messages = "";
    data.forEach(message => {
        messages = messages + `${message.user} dice: ${message.message} <br>`;
    })
    log.innerHTML = messages;
})