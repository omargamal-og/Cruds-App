let title = document.getElementById('title'),
price = document.getElementById('price'),
taxes = document.getElementById('taxes'),
ads = document.getElementById('ads'),
discount = document.getElementById('discount'),
total = document.getElementById('total'),
count = document.getElementById('count'),
category = document.getElementById('category'),
submit = document.getElementById('submit'),
search = document.getElementById('search');

let mood = 'create';
let tmp;

// Get total

function getTotal() {
  if (price.value != '') {
    let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
    total.innerHTML = result;
    total.style.background = '#040';
  } else {
    total.innerHTML = '';
    total.style.background = '#a00d00';
  }
} 

// Create product

let dataPro;

if(localStorage.product != null) {
  dataPro = JSON.parse(localStorage.product);
} else {
  dataPro = [];
}

submit.onclick = function() {
  let newProduct = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
    submit: submit.value
  }

  if (title.value != '' 
    && price.value != '' 
    && category.value != '' 
    && newProduct.count < 100) {
    if (mood === 'create') {
      // Count
      if (newProduct.count > 1) {
        for(let i = 0; i < newProduct.count; i++) {
          dataPro.push(newProduct);
        }
        } else {
          dataPro.push(newProduct);
        }
      } else {
        dataPro[ tmp ] = newProduct;
        mood = 'create';
        submit.innerHTML = 'Create';
        count.style.display = 'block';
      }

      clearData();
    }
  

  // Save in localStorage

  localStorage.setItem('product', JSON.stringify(dataPro));
  showData();
}

// Clear inputs

function clearData() {
  title.value = '';
  price.value = '';
  taxes.value = '';
  ads.value = '';
  discount.value = '';
  total.innerHTML = '';
  count.value = '';
  category.value = '';
}

// Read

function showData() {
  getTotal();
  let table = '';
  for(let i = 0; i < dataPro.length; i++) {
    table += `
      <tr>
        <td>${i + 1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick="updateData( ${i} )" id="update">update</button></td>
        <td><button onclick="deleteData( ${i} )" id="delete">delete</button></td>
      </tr>
    `;
  }

  document.getElementById('tbody').innerHTML = table;
  let btnDelete = document.getElementById('deleteAll');
  if(dataPro.length > 0) {
    btnDelete.innerHTML = `
      <button onclick="deleteAll()" class="delete-all">Delete All ( ${dataPro.length} )</button>
    `;
  } else {
    btnDelete.innerHTML = '';
  }
}
showData();

// Delete
function deleteData(i) {
  dataPro.splice(i, 1);
  localStorage.product = JSON.stringify(dataPro);
  showData();
}

// Delete All
function deleteAll() {
  localStorage.clear();
  dataPro.splice(0);
  showData();
}

// Update
function updateData(i) {
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  taxes.value = dataPro[i].taxes;
  ads.value = dataPro[i].ads;
  discount.value = dataPro[i].discount;
  getTotal();
  count.style.display = 'none';
  category.value = dataPro[i].category;
  submit.innerHTML = 'Update';
  mood = 'update';
  tmp = i;
  scroll({
    top:0,
    behavior:'smooth',
  })
}

// Search

let searchMood = 'title';

function getSearchMood(id) {
  if (id == 'search-title') {
    searchMood = 'title';
  } else if (id == 'search-price') {
    searchMood = 'price';
  } else {
    searchMood = 'category';
  }
  search.placeholder = `Search By ${searchMood}`;
  search.focus();
  search.value = '';
  showData();
}

function searchData(value) {
  let table = '';
  for (let i = 0; i < dataPro.length; i++) {
  if (searchMood == 'title') {
      if (dataPro[i].title.includes(value.toLowerCase())) {
        table += `
          <tr>
            <td>${i + 1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData( ${i} )" id="update">update</button></td>
            <td><button onclick="deleteData( ${i} )" id="delete">delete</button></td>
          </tr>
        `;
      }
  } else if (searchMood == 'price') {
      if (dataPro[i].price.includes(value.toLowerCase())) {
        table += `
          <tr>
            <td>${i + 1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData( ${i} )" id="update">update</button></td>
            <td><button onclick="deleteData( ${i} )" id="delete">delete</button></td>
          </tr>
        `;
      }
    } else {
      if (dataPro[i].category.includes(value.toLowerCase())) {
        table += `
          <tr>
            <td>${i + 1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData( ${i} )" id="update">update</button></td>
            <td><button onclick="deleteData( ${i} )" id="delete">delete</button></td>
          </tr>
        `;
      }
    }
  }
  document.getElementById('tbody').innerHTML = table;
}

// Clean data