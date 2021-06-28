import React, { useState, useEffect} from 'react';
import {Produits, Navbar } from './components';
import { commerce } from './lib/commerce';

const App = () => {
    const [produits, setProduits] = useState([]);
    const [cart , setCart] = useState({});

    const fetchProduits = async ()=>{
     const { data } = await commerce.products.list();
     setProduits(data);
    }
    
    const fetchCart = async () => {
        setCart(await commerce.cart.retrieve())
    }

    const handleAddToCart = async (productId,quantity) => {
        const item = await commerce.cart.add(productId,quantity);
        setCart(item.cart);
    }

    useEffect(()=>{
        fetchProduits();
        fetchCart();
    },[]);
    console.log(cart);

    console.log(produits)
    return (
        <div> 
            <Navbar totalItems={cart.total_items}/>
            <Produits produits={ produits } handleAddToCart={handleAddToCart} />
           
        </div>
    )
}

export default App