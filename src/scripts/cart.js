import '../pages/cart/cart.css';

const countInCartElement = document.querySelector('.header__count_place_cart');
const itemsList = document.querySelector('.cart__list');

countInCartElement.textContent = sessionStorage.getItem('countInCart');

const createItem = itemsInCart => {
  const templateItems = document.querySelector('#template-item-in-cart').content;
  const item = templateItems.querySelector('.item-in-cart').cloneNode(true);
  const itemImage = item.querySelector('.item-in-cart__image');
  const itemTitle = item.querySelector('.item-in-cart__title');
  const itemPrice = item.querySelector('.item-in-cart__price');
  const itemButtonMinus = item.querySelector('.item-in-cart__count-button_minus');
  const itemButtonPlus = item.querySelector('.item-in-cart__count-button_plus');
  const itemCountValue = item.querySelector('.item-in-cart__count-value');
  const itemTotalPrice = item.querySelector('.item-in-cart__total-price');
  const itemButtonDelete = item.querySelector('.item-in-cart__button-delete');

  const { img, title, price } = itemsInCart;

  itemImage.src = img;
  itemImage.alt = title;
  itemTitle.textContent = title;
  itemPrice.textContent = `${price} ₽`;
  itemCountValue.textContent = 1;

  const totalPrice = `${Number(price) *  Number(itemCountValue.textContent)} ₽`;

  itemTotalPrice.textContent = totalPrice;

  return item;
}

const addItemFromArray = (itemsInCart, itemsList) => {
  itemsInCart.forEach(el => {
    itemsList.append(createItem(el));
  });
}

addItemFromArray(JSON.parse(sessionStorage.getItem('itemsInCart')), itemsList);

