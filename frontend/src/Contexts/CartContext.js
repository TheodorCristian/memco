import React, { createContext,useContext, useEffect, useState } from 'react'

const CartContext = createContext();

export const CartProvider = ({children}) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  // update the cart in sessionStorage and also server side
  useEffect(() => {
    sessionStorage.setItem('cart', JSON.stringify(cart));
    // sync on server side
  }, [cart]);

  // retrieve the cart if exists
  useEffect(() => {
    const savedCart = sessionStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }


    // aici sa adaug logica pentru pendingProduct 
  }, []);

  const addToCart = (newItem, user) => {
    setLoading(true);
    const completeProduct = {...newItem, uid: user.uid}
    
    try {
      setCart([...cart, completeProduct]);
      sessionStorage.setItem('cart', cart);
    } catch (error) {
      // will add here a logic to use a react toaster to show the error message
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }

  const removeFromCart = (itemId) => {
    try {
      setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
    } catch(error) {
      // will add here a logic to use a react toaster to show the error message
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }

  const clearCart = () => {
    try {
      setCart([]);
    } catch (error) {
      // will add here a logic to use a react toaster to show the error message
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <CartContext.Provider value={{cart, addToCart, removeFromCart, clearCart, loading }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  return useContext(CartContext);
};


export default CartContext