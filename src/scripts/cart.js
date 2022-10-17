import '../pages/cart/cart.css';

const countInCartElement = document.querySelector('.header__count_place_cart');

countInCartElement.textContent = sessionStorage.getItem('countInCart');
