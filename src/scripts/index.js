import '../pages/index/index.css';
import { headphones, wirelessHeadphones } from '../utils/data';

const headphonesList = document.querySelector('.headphones__list');
const wirelessHeadphonesList = document.querySelector('.wireless-headphones-list');
const countInCartElement = document.querySelector('.header__count_place_cart');

let countItemsInCart = 0;
const itemsInCart = [];

const createHeadphonesItem = headphonesItem => {
  const templateHeadphones = document.querySelector('#template-headphones').content;
  const headphones = templateHeadphones.querySelector('.headphones-item').cloneNode(true);
  const headphonesImage = headphones.querySelector('.headphones-item__image');
  const headphonesTitle = headphones.querySelector('.headphones-item__title');
  const headphonesFinalyPrice = headphones.querySelector('.headphones-item__finaly-price');
  const headphonesInitialPrice = headphones.querySelector('.headphones-item__initial-price');
  const headphonesRatingValue = headphones.querySelector('.headphones-item__rating-value');
  const headphonesButton = headphones.querySelector('.headphones-item__button');

  const { img, title, price, discount, rate } = headphonesItem;
  const finalyPrice = discount === 0 ? price : Math.round(price * (100 - discount) / 100);

  headphonesImage.src = img;
  headphonesImage.alt = title;
  headphonesTitle.textContent = title;
  headphonesFinalyPrice.textContent = `${finalyPrice} ₽`;
  headphonesInitialPrice.textContent = `${price} ₽`;
  headphonesRatingValue.textContent = rate;

  if (discount === 0) headphonesInitialPrice.classList.add('headphones-item__initial-price_hidden');

  headphonesButton.addEventListener('click', _ => {
    ++countItemsInCart;
    countInCartElement.textContent = countItemsInCart;
    sessionStorage.setItem('countInCart', countItemsInCart);
    itemsInCart.push({
      img: img,
      title: title,
      price: finalyPrice,
    });
    sessionStorage.setItem('itemsInCart', JSON.stringify(itemsInCart));
  });

  return headphones;
}

const addHeadphonesFromArray = (headphones, headphonesList) => {
  headphones.forEach(el => {
    headphonesList.append(createHeadphonesItem(el));
  });
}

addHeadphonesFromArray(headphones, headphonesList);

addHeadphonesFromArray(wirelessHeadphones, wirelessHeadphonesList);
