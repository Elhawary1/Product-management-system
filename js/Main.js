// Variables...................................
let productNameInput = document.getElementById("productNameInput");
let productPriceInput = document.getElementById("productPriceInput");
let productCategoryInput = document.getElementById("productCategoryInput");
let productDescriptionInput = document.getElementById(
  "productDescriptionInput"
);
let addBtn = document.getElementById("addBtn");
let updateBtn = document.getElementById("updateBtn");
let nameInputError = document.getElementById("nameInputError");
let priceInputError = document.getElementById("priceInputError");
let categoryInputError = document.getElementById("categoryInputError");
let descriptionInputError = document.getElementById("descriptionInputError");
let productContainer;

// if for know if there is data in localStorage or no and show them...................................

if (localStorage.getItem("myProducts") != null) {
  productContainer = JSON.parse(localStorage.getItem("myProducts"));
  displayProduct(productContainer);
} else {
  productContainer = [];
}

// function to add a product...................................

function addProduct() {
  if (
    validateNameInput() == true &&
    validatePriceInput() == true &&
    validateCategoryInput() == true &&
    validateDescriptionInput() == true
  ) {
    let product = {
      Name: productNameInput.value,
      Price: productPriceInput.value,
      CAtegory: productCategoryInput.value,
      Description: productDescriptionInput.value,
    };
    productContainer.push(product);
    localStorage.setItem("myProducts", JSON.stringify(productContainer));
    clearForm();
    displayProduct(productContainer);
    productNameInput.classList.remove("is-valid");
    productPriceInput.classList.remove("is-valid");
    productCategoryInput.classList.remove("is-valid");
    productDescriptionInput.classList.remove("is-valid");
  }
}

// function to clear the form...................................

function clearForm() {
  productNameInput.value = "";
  productPriceInput.value = "";
  productCategoryInput.value = "";
  productDescriptionInput.value = "";
}

// function to show the products...................................

function displayProduct(productList) {
  let tableRow = "";
  for (let i = 0; i < productList.length; i++) {
    tableRow += `<tr><td>${i}</td>
    <td>${productList[i].Name}</td>
    <td>${productList[i].Price}</td>
    <td>${productList[i].CAtegory}</td>
    <td>${productList[i].Description}</td>
    <td><button onclick="(setFormForUpdate(${i}))" class="btn btn-outline-primary">
    <i class="fa-solid fa-pen"></i>
    Update</button></td>
    <td><button onclick = "(deleteProduct(${i}))" class="btn btn-outline-danger">
    <i class="fa-solid fa-trash"></i>
    Delete</button></td></tr>`;
  }
  tableBody.innerHTML = tableRow;
}

// function to search for a product...................................

function searchForProduct(searchTerm) {
  let searchResult = [];

  for (let i = 0; i < productContainer.length; i++) {
    if (
      productContainer[i].Name.toLowerCase().includes(
        searchTerm.toLowerCase()
      ) == true
    ) {
      searchResult.push(productContainer[i]);
    }
  }
  displayProduct(searchResult);
}

// function delete a product...................................

function deleteProduct(deleteIndex) {
  productContainer.splice(deleteIndex, 1);
  localStorage.setItem("myProducts", JSON.stringify(productContainer));
  displayProduct(productContainer);
}

// function set the form to update a product...................................
let currentIndex;
function setFormForUpdate(updateIndex) {
  currentIndex = updateIndex;
  productNameInput.value = productContainer[updateIndex].Name;
  productPriceInput.value = productContainer[updateIndex].Price;
  productCategoryInput.value = productContainer[updateIndex].CAtegory;
  productDescriptionInput.value = productContainer[updateIndex].Description;
  addBtn.classList.add("d-none");
  updateBtn.classList.remove("d-none");
  productNameInput.classList.add("is-valid");
  productPriceInput.classList.add("is-valid");
  productCategoryInput.classList.add("is-valid");
  productDescriptionInput.classList.add("is-valid");
}

// function to update a product...................................

function updateProduct() {
  if (
    validateNameInput() == true &&
    validatePriceInput() == true &&
    validateCategoryInput() == true &&
    validateDescriptionInput() == true
  ) {
    productContainer[currentIndex].Name = productNameInput.value;
    productContainer[currentIndex].Price = productPriceInput.value;
    productContainer[currentIndex].CAtegory = productCategoryInput.value;
    productContainer[currentIndex].Description = productDescriptionInput.value;
    localStorage.setItem("myProducts", JSON.stringify(productContainer));
    displayProduct(productContainer);
    clearForm();
    addBtn.classList.remove("d-none");
    updateBtn.classList.add("d-none");
    productNameInput.classList.remove("is-valid");
    productPriceInput.classList.remove("is-valid");
    productCategoryInput.classList.remove("is-valid");
    productDescriptionInput.classList.remove("is-valid");
  }
}

// Regular expression functions ...................................

// Name input regular expression...................................

function validateNameInput() {
  let regex = /^[A-Z][a-z]{2,14}$/g;
  if (regex.test(productNameInput.value) == true) {
    if (productNameInput.classList.contains("is-invalid")) {
      productNameInput.classList.replace("is-invalid", "is-valid");
    }
    nameInputError.classList.add("d-none");

    return true;
  } else {
    productNameInput.classList.add("is-invalid");
    nameInputError.classList.remove("d-none");
    return false;
  }
}

// Price input regular expression...................................

function validatePriceInput() {
  let regex = /^(([1-9]\d{3})|([1-9]\d{4}|100000))$/g;
  if (regex.test(productPriceInput.value) == true) {
    if (productPriceInput.classList.contains("is-invalid")) {
      productPriceInput.classList.replace("is-invalid", "is-valid");
    }
    priceInputError.classList.add("d-none");
    return true;
  } else {
    productPriceInput.classList.add("is-invalid");
    priceInputError.classList.remove("d-none");
    return false;
  }
}

// Category input regular expression...................................

function validateCategoryInput() {
  let regex = /^(tv|mobile|device)$/gi;
  if (regex.test(productCategoryInput.value) == true) {
    if (productCategoryInput.classList.contains("is-invalid")) {
      productCategoryInput.classList.replace("is-invalid", "is-valid");
    }
    categoryInputError.classList.add("d-none");
    return true;
  } else {
    productCategoryInput.classList.add("is-invalid");
    categoryInputError.classList.remove("d-none");
    return false;
  }
}

// Description input regular expression...................................

function validateDescriptionInput() {
  let regex = /^.{3,30}$/gi;
  if (regex.test(productDescriptionInput.value) == true) {
    if (productDescriptionInput.classList.contains("is-invalid")) {
      productDescriptionInput.classList.replace("is-invalid", "is-valid");
    }
    descriptionInputError.classList.add("d-none");
    return true;
  } else {
    productDescriptionInput.classList.add("is-invalid");
    descriptionInputError.classList.remove("d-none");
    return false;
  }
}
