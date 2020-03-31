let loginRequest = new XMLHttpRequest();
loginRequest.open("GET", "../data/logins.json", false);
loginRequest.send(null);

let logins = JSON.parse(loginRequest.responseText);

let loginForm = document.querySelector(".loginForm");
loginForm.addEventListener("submit", function(e) {
  e.preventDefault();

  let usernameInput = document.querySelector(
    ".loginForm > fieldset > #input-username"
  ).value;
  let passwordInput = document.querySelector(
    ".loginForm > fieldset > #input-password"
  ).value;

  if (checkPassword(passwordInput) && checkUsername(usernameInput)) {
    changeForm();
  } else {
    console.log("feeel");
  }
});

function changeForm() {
  console.log("nice");
  let form = document.querySelector("form");
  form.classList.remove("loginForm");
  form.classList.add("productForm");
  let oldFieldset = document.querySelector("form > fieldset");
  loginForm.removeChild(oldFieldset);

  let productFieldset = document.createElement("fieldset");
  let nameInput = document.createElement("input");
  let priceInput = document.createElement("input");
  let nameLabel = document.createElement("label");
  let priceLabel = document.createElement("label");
  let button = document.createElement("button");

  productFieldset.appendChild(nameLabel);
  productFieldset.appendChild(nameInput);
  productFieldset.appendChild(priceLabel);
  productFieldset.appendChild(priceInput);
  productFieldset.appendChild(button);

  nameInput.id = "input-name";
  nameInput.type = "text";
  nameInput.name = "inputName";
  nameInput.placeholder = "Name";

  priceInput.id = "input-price";
  priceInput.type = "text";
  priceInput.name = "inputPrice";
  priceInput.placeholder = "Price";

  nameLabel.innerHTML = "Enter name: ";
  priceLabel.innerHTML = "Enter price";
  nameLabel.for = "input-name";
  priceLabel.for = "input-price";

  button.type = "submit";
  button.innerHTML = "Submit";

  loginForm.appendChild(productFieldset);

  let productForm = document.querySelector(".productForm");

  productForm.addEventListener("submit", function(e) {
    e.preventDefault();

    let productName = document.querySelector("form > fieldset > #input-name")
      .value;
    let productPrice = document.querySelector("form > fieldset > #input-price")
      .value;

    allProducts.push({ name: productName, price: parseInt(productPrice) });
    console.log(allProducts);
  });
}

function checkPassword(input) {
  for (let i = 0; i < logins.length; i++) {
    console.log(logins.length + "password");
    if (input == logins[i].password) {
      return true;
    }
  }
  return false;
}

function checkUsername(input) {
  for (let i = 0; i < logins.length; i++) {
    console.log(logins[i].username + "username");
    if (input == logins[i].username) {
      return true;
    }
  }
  return false;
}
