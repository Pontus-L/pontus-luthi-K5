


let request = new XMLHttpRequest();
request.open("GET", "../data/products.json", false);
request.send(null);

let productDiv = document.querySelector('.products');

let allProducts = JSON.parse(request.responseText);
// console.log(allProducts);

let newProducts = document.createElement('ul');

for (let i = 0; i < allProducts.length; i++) {
    let newProduct = document.createElement('li');
    let newProductPrice = document.createElement('span');
    let newProductName = document.createElement('span');
    let newProductButton = document.createElement('button');
    let newProductPriceName = document.createElement('div');

    newProductName.classList.add("name");
    newProductPrice.classList.add("price");

    newProductButton.innerHTML = "Buy";
    newProductName.innerHTML = allProducts[i].name;
    newProductPrice.innerHTML = allProducts[i].price;

    newProductPriceName.appendChild(newProductName);
    newProductPriceName.appendChild(newProductPrice);

    newProduct.appendChild(newProductPriceName);
    newProduct.appendChild(newProductButton);
    newProducts.appendChild(newProduct);
}

productDiv.appendChild(newProducts);

