'use strict'
let catalogObj = {hdd:"80", ssd:"150", usbdrive:"8"};
const catalogBlock = document.querySelector('.catalog');
const btnClear = document.querySelector('.clear');

const catalog = [
{
  src: 'img/hdd.jpg',
  name: Object.keys(catalogObj)[0],
  price: Object.values(catalogObj)[0],
  count: 1
},
{
  src: 'img/ssd.jpg',
  name: Object.keys(catalogObj)[1],
  price: Object.values(catalogObj)[1],
  count: 1
},
{
  src: 'img/usb-drive.jpg',
  name: Object.keys(catalogObj)[2],
  price: Object.values(catalogObj)[2],
  count: 1
}
];

const cartObj = {
  items: 0,
  budget: 2000,
  total: 0
};

const product = document.querySelector('#product').content.querySelector('.catalog__item');
const cart = document.querySelector('.cart');
cart.querySelector('.budget').textContent = cartObj.budget + "$";
cart.querySelector('.total').textContent = cartObj.total + "$";
cart.querySelector('.items').textContent = cartObj.items;

const createCatalogItem = function (item) {
  let productsItem = product.cloneNode(true);
  productsItem.setAttribute('id', item.name);
  productsItem.querySelector('img').setAttribute('src', item.src);
  productsItem.querySelector('img').setAttribute('alt', item.name);
  productsItem.querySelector('h3').textContent = item.name.toUpperCase();
  productsItem.querySelector('span').textContent = item.price + "$";
  return productsItem;
};

const products = [];
let fragment = document.createDocumentFragment();
for (let i = 0; i < catalog.length; i++) {
  products[i] = createCatalogItem(catalog[i]);
  fragment.appendChild(products[i]);
}
catalogBlock.appendChild(fragment);

//Drag and drop
let id, productItem, productPrice;
let cartItems = [];

for (let i=0; i<products.length; i++) {
  products[i].setAttribute('draggable', true);
  products[i].addEventListener('dragstart', ev => {
    productItem = products[i].cloneNode(true);
    id = products[i].getAttribute('id');
    productPrice = +products[i].querySelector('span').textContent.slice(0,-1);
  });
};


let value = 3;
cart.addEventListener('dragover', ev => ev.preventDefault());
cart.addEventListener('drop', ev => {

if (cartObj.total + productPrice <= cartObj.budget) {

  if (cartItems.length === 0) {
    cart.appendChild(productItem);
    cartItems.push(productItem);
    cartObj.total += productPrice;
    cartObj.items ++;
  } else {
      for (let i=0; i<cartItems.length; i++) {
        if (cartItems[i].getAttribute('id')===id) {
          value = i;
        }
      }
      if (value < 3) {
        catalog[value].count++;
        cartItems[value].querySelector('b').textContent = catalog[value].count;
        cartObj.total += productPrice;
        cartObj.items ++;
        value = 3;
      }
      else {
        cart.appendChild(productItem);
        cartItems.push(productItem);
        cartObj.total += productPrice;
        cartObj.items ++;
      }
    }
    cart.querySelector('.total').textContent = cartObj.total + "$";
    cart.querySelector('.items').textContent = cartObj.items;
} else {
  alert('No more money :(')
}
});

btnClear.addEventListener('click', function(evt) {
  evt.preventDefault();
  let items = cart.querySelectorAll('.catalog__item');
  for (let i=0; i<items.length; i++) {
      items[i].remove();
  }
  cartObj.total = 0;
  cartObj.items = 0;

  for (let i in catalog) {
    catalog[i].count = 1;
    console.log(catalog[i].count);
  }

  cart.querySelector('.total').textContent = cartObj.total + "$";
  cart.querySelector('.items').textContent = cartObj.items;
  cartItems = [];
});
