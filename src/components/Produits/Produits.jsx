import React from 'react';
import  { Grid } from '@material-ui/core';
import Produit from './Produit/Produit';
import useStyles from './styles';



const Produits = ({ produits, handleAddToCart}) => {
    const classes  =  useStyles();
    return (
        // Grid du package @material-ui/core permet de mettre nos produits fournis par l API commerce.js en système grille 
        <main className={classes.content}>
             <div className={classes.toolbar}/> {/*cette dividion va ajoutter la meme hauteur que celle de Nav-bar */}
            <Grid container justify='center' spacing ={4} >
                {produits.map( produit =>(
                    <Grid item key={produit.id} xs={12} s={6} m={4} lg={3}>
                        <Produit produit={ produit }  handleAddToCart = { handleAddToCart }/>
                    </Grid>
                ))}
            </Grid>
        </main>
    )
}

export default Produits;
