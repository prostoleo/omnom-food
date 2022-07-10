import { defineStore } from 'pinia';

const LS_CART_ITEMS_KEY = `omnom-cart-items`;

export const useCartStore = defineStore('cartStore', {
  // arrow function recommended for full type inference
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      // totalSum: 0,
      // totalGoods: 0,
      isCartShown: false,
      isOrderProcessShown: false,
      cartItems: JSON.parse(localStorage.getItem(LS_CART_ITEMS_KEY)) ?? [],
    };
  },

  getters: {
    getIsCartShown: (state) => {
      return state.isCartShown;
    },
    getIsOrderProcessShown: (state) => {
      return state.isOrderProcessShown;
    },

    getCartItems: (state) => {
      localStorage.setItem(LS_CART_ITEMS_KEY, JSON.stringify(state.cartItems));
      return state.cartItems;
    },

    getTotalPrice: (state) => {
      const totalPrice = state.cartItems.reduce((acc, item) => {
        return acc + item.price * item.quantity;
      }, 0);
      // console.log('totalPrice: ', totalPrice);

      return totalPrice;
    },

    getTotalQuantities: (state) => {
      // return state.totalQuantities;
      const totalQuantites = state.cartItems.reduce((acc, item) => {
        return acc + item.quantity;
      }, 0);

      return totalQuantites;
    },
  },

  actions: {
    showCart() {
      document.querySelector('html').classList.add('!overflow-y-hidden');
      this.isCartShown = true;
    },

    hideCart() {
      document.querySelector('html').classList.remove('!overflow-y-hidden');
      this.isCartShown = false;
    },

    addToCart(product) {
      const alreadyInCart = this.cartItems.find(
        (item) => item.id === product.id
      );
      // console.log('alreadyInCart: ', alreadyInCart);

      if (alreadyInCart) {
        const updatedCartItems = this.cartItems.map((cartProduct) => {
          if (cartProduct.id === product.id) {
            return {
              ...cartProduct,
              quantity: cartProduct.quantity + 1,
            };
          }

          return cartProduct;
        });

        this.cartItems = updatedCartItems;
        return;
      }

      this.cartItems.push({ ...product, quantity: 1 });
    },

    removeFromCart(id) {
      this.cartItems = this.cartItems.filter((item) => {
        return item.id !== id;
      });
    },

    decreaseQuantity(id) {
      this.cartItems = this.cartItems.map((item) => {
        if (item.id !== id) return item;

        if (item.quantity === 1) return item;

        item.quantity--;
        return item;
      });
    },

    increaseQuantity(id) {
      this.cartItems = this.cartItems.map((item) => {
        if (item.id !== id) return item;

        item.quantity++;
        return item;
      });
    },

    showOrderProcess() {
      this.isOrderProcessShown = true;
    },

    hideOrderProcess() {
      this.isOrderProcessShown = false;
    },
  },
});
