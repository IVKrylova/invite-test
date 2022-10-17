import '../pages/cart/cart.css';

const countInCartElement = document.querySelector('.header__count_place_cart');
const itemsList = document.querySelector('.cart__list');
const totalSumElement = document.querySelector('.cart__sum');
countInCartElement.textContent = sessionStorage.getItem('countInCart');

const itemsInCart = JSON.parse(sessionStorage.getItem('itemsInCart'));
const totalSum = itemsInCart.reduce((sum, el) => {
  return sum + Number(el.price);
}, 0);

totalSumElement.textContent = `₽ ${totalSum}`;
sessionStorage.setItem('totalSum', totalSum);

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

  const { img, title, price } = itemsInCart;

  itemImage.src = img;
  itemImage.alt = title;
  itemTitle.textContent = title;
  itemPrice.textContent = `${price} ₽`;
  itemCountValue.textContent = 1;

  const totalPrice = `${Number(price) *  Number(itemCountValue.textContent)} ₽`;

  itemTotalPrice.textContent = totalPrice;

  itemButtonMinus.addEventListener('click', _ => {
    const count = Number(itemCountValue.textContent);

    if (count > 1) {
      itemCountValue.textContent = count - 1;
      itemTotalPrice.textContent = `${Number(price) *  Number(itemCountValue.textContent)} ₽`;

      const newTotalSum = Number(sessionStorage.getItem('totalSum') - Number(price));
      totalSumElement.textContent = `₽ ${newTotalSum}`;
      sessionStorage.setItem('totalSum', newTotalSum);
    } else {
      itemCountValue.textContent = 1;
    }
  });

  itemButtonPlus.addEventListener('click', _ => {
    const count = Number(itemCountValue.textContent);

    itemCountValue.textContent = count + 1;
    itemTotalPrice.textContent = `${Number(price) *  Number(itemCountValue.textContent)} ₽`;

    const newTotalSum = Number(sessionStorage.getItem('totalSum')) + Number(price);
    totalSumElement.textContent = `₽ ${newTotalSum}`;
    sessionStorage.setItem('totalSum', newTotalSum);
  });

  return item;
}

const addItemFromArray = (itemsInCart, itemsList) => {
  itemsInCart.forEach(el => {
    itemsList.append(createItem(el));
  });
}

addItemFromArray(itemsInCart, itemsList);

