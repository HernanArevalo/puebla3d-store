import { getCartProducts } from '@/actions';
import { CartProduct } from '@/interfaces';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface State {
  cart: CartProduct[];

  getTotalItems: () => number;
  getSummaryInformation: () => {
    subtotal: number,
    tax: number,
    total: number,
    items: number,
  };

  addProductToCart: (product: CartProduct) => void;

  updateProducts: () => void;
  updateProductQuantity: (product: CartProduct, quantity: number) => void;

  removeProductToCart: (product: CartProduct) => void;
  clearCart: () => void;
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],

      // Methods
      getTotalItems: () => {
        const { cart } = get();

        return cart.reduce((total, item) => (total += item.quantity), 0);
      },

      getSummaryInformation: () => {
        const { cart } = get();

        const subtotal = cart.reduce((subtotal, item) => 
          (subtotal += item.price*item.quantity), 
          0
        );

        const tax = subtotal * 0.10
        const total = subtotal - tax
        const items = cart.reduce((total, item) => (total += item.quantity), 0);

        return {
          subtotal,
          tax,
          total,
          items
        }
      },

      addProductToCart: (product: CartProduct) => {
        const { cart } = get();

        const productInCart = cart.some(
          (item) => item.id === product.id && item.size === product.size && item.color === product.color
        );

        if (!productInCart) {
          set({ cart: [...cart, product] });
          return;
        }

        const updatedCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size && item.color === product.color) {
            return { ...item, quantity: item.quantity + product.quantity };
          }
          return item;
        });

        set({ cart: updatedCartProducts });
      },

      updateProducts: async() => {
        const { cart } = get();

        const updatedProducts = await getCartProducts({cart});

        const productsInStock = updatedProducts.filter(product => product.stock > 0)

        set({ cart: productsInStock })
      },

      updateProductQuantity: (product: CartProduct, quantity: number) => {
        const { cart } = get();

        const updatedCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: quantity };
          }
          return item;
        });

        set({ cart: updatedCartProducts });
      },

      removeProductToCart: (product: CartProduct) => {
        const { cart } = get();

        const updatedCartProducts = cart.filter((item) => 
          item.id !== product.id || item.size !== product.size || item.color !== product.color
        );

        set({ cart: updatedCartProducts });
      },
      clearCart: () => {
        set({ cart: [] })
      }
    }),

    {
      name: 'shopping-cart',
    }
  )
);
