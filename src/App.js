import React, { useState, useEffect} from 'react';
import {Produits, Navbar, Cart, Checkout } from './components';
import { commerce } from './lib/commerce';
import { BrowserRouter as Router , Switch, Route } from 'react-router-dom';


const App = () => {
    const [produits, setProduits] = useState([]);
    const [cart , setCart] = useState({});
    const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

    const fetchProduits = async ()=>{
     const { data } = await commerce.products.list();
     setProduits(data);
    }
    
    const fetchCart = async () => {
        setCart(await commerce.cart.retrieve())
    }

    const handleAddToCart = async (productId,quantity) => {
        const response= await commerce.cart.add(productId,quantity);
        setCart(response.cart);
    }
 const handleUpdateCartQty = async (productId, quantity) =>{
     const item = await commerce.cart.update(productId,{ quantity })
     setCart(item.cart);
 }
 const handleRemoveFromCart = async (productId) =>{
    const  reponse = await commerce.cart.remove(productId)
    setCart(reponse.cart);
}
const handleEmptyCart = async () =>{
    const  rep = await commerce.cart.empty();
    setCart(rep.cart);
}
const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();

    setCart(newCart);
  };
const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);

      setOrder(incomingOrder);

      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  };
     useEffect(()=>{
        fetchProduits();
        fetchCart();
    },[]);
  
    return (
        <Router>
        <div> 
            <Navbar totalItems={cart.total_items}/>
            <Switch>
                <Route exact path="/"><Produits produits={ produits } handleAddToCart={handleAddToCart} /></Route>
                <Route exact path="/cart">
                     <Cart cart={cart} 
                     handleEmptyCart={handleEmptyCart}
                     handleRemoveFromCart={handleRemoveFromCart} 
                     handleUpdateCartQty={ handleUpdateCartQty}
            
                /></Route>
                <Route exact path="/checkout">
                    <Checkout cart = {cart} order={order} onCaptureCheckout={handleCaptureCheckout} error={errorMessage} />

                </Route>
            </Switch>
           
        </div>
        </Router>
    )
}

export default App