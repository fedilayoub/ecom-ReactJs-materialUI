import React from 'react';
import { AppBar,Toolbar,IconButton,Badge ,Typography } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import logo from '../../assets/gaming_logo.png';
import useStyles from './styles';
import { Link, useLocation } from 'react-router-dom';


const Navbar = ({ totalItems }) => {
    const classes = useStyles();
    const location = useLocation();

   
    return (
        <>
            <AppBar position="fixed" color="inherit" className={classes.AppBar}> 
            {/* AppBar en material-ui c-à-d Nav-bar */}
                <Toolbar>
                    <Typography component={Link} to="/" variant="h6" className={ classes.navTitle } color="inherit">
                        <img src={logo} alt="gaming logo" height="70px" className={classes.image} />
                        GamingStore
                    </Typography>

                    <div className={classes.grow}/> { /* cette division va prendre autant d espace qu'on veut */}
                    { location.pathname === '/' && (
                    <div className={classes.button}>
    
                        <IconButton component={Link} to="/cart" aria-label="show cart items" color="inherit">
                            <Badge badgeContent={totalItems} color="secondary">
                                <ShoppingCart />
                            </Badge>

                        </IconButton>

                    </div>)}
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar;
