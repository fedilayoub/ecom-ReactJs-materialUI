import React from 'react';
import { AppBar,Toolbar,IconButton,Badge ,MenuItem , Menu ,Typography } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import logo from '../../assets/logo.png';
import useStyles from './styles';


const Navbar = ({ totalItems }) => {
    const classes = useStyles();
    return (
        <>
            <AppBar position="fixed" color="inherit" className={classes.AppBar}> 
            {/* AppBar en material-ui c-à-d Nav-bar */}
                <Toolbar>
                    <Typography variant="h6" className={ classes.title } color="inherit">
                        <img src={logo} alt="commerceJS" height="70px" className={classes.image} />
                        Commerce
                    </Typography>
                    <div className={classes.grow}/> { /* cette division va prendre autant d espace qu'on veut */}
                    <div className={classes.button}>
                        <IconButton aria-label="show cart items" color="inherit">
                            <Badge badgeContent={totalItems} color="secondary">
                                <ShoppingCart />
                            </Badge>

                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar;
