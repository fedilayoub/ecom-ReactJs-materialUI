import React ,{ useState, useEffect} from 'react';
import {InputLabel , Select ,MenuItem, Button, Grid, Typography} from '@material-ui/core';
import {useForm, FormProvider} from 'react-hook-form';
import FormInput from './CustomTextField';
import { commerce } from '../../lib/commerce';
import { Link } from 'react-router-dom';

const AddressForm = ({checkoutToken , test }) => {
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState('');
    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState('');
    const [shippingOption, setShippingOption] = useState('');
    const [shippingOptions, setShippingOptions] = useState([]);
    const methods = useForm();
    const countries2 =  Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name}));
    const subdivs =  Object.entries(shippingSubdivisions).map(([code, name]) => ({ id: code, label: name}));
    const options1 = shippingOptions.map((shippOp) => ( { id: shippOp.id , label: ` ${shippOp.description} -  (${shippOp.price.formatted_with_symbol})`}))

    const fetchShippingCountries = async (checkoutTokenId) =>{
        const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);
        console.log(countries);
        setShippingCountries(countries);
        setShippingCountry(Object.keys(countries)[0]);

    }
    useEffect(() => {
        if(shippingCountry) fetchShippingSubdivisions(shippingCountry);
    },[shippingCountry])

    const fetchShippingSubdivisions = async (countryCode) => {
        const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);
        setShippingSubdivisions(subdivisions);
        setShippingSubdivision(Object.keys(subdivisions)[0]);
    }

    const fetchShippingOptions = async (checkoutTokenId,country, region = null  ) => {
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId , { country, region });
        setShippingOptions(options);
        setShippingOption(options[0].id);

    }
    useEffect(() => {
        if(shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision);
    },[shippingSubdivision])
    useEffect( () => {
        fetchShippingCountries(checkoutToken.id)
    },[])

    return (
        <>
          <Typography variant="h6" gutterBottom>Shipping Address</Typography>
          <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit((data) => test( {...data, shippingCountry , shippingSubdivision , shippingOption}) )}>
                    <Grid container spacing={3}>
                        <FormInput required name='firstName' label='First name' />
                        <FormInput required name='lastName' label='Last name' />
                        <FormInput required name='address1' label='Address' />
                        <FormInput required name='email' label='Email' />
                        <FormInput required name='city' label='City' />
                        <FormInput required name='ZIP' label='ZIP / Postal code' />
                      <Grid item xs={12} sm={6}>
                          <InputLabel>Shipping country</InputLabel>
                          <Select value={shippingCountry} fullWidth onChange={(e) =>setShippingCountry(e.target.value)}>
                             
                             { countries2.map((country) => (
                       <MenuItem key={country.id} value={country.id}>
                              {country.label}
                              </MenuItem>
                             ))}
                              
                          </Select>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                          <InputLabel> Shipping Subdivision</InputLabel>
                          <Select value={shippingSubdivision} fullWidth onChange={(e) =>setShippingSubdivision(e.target.value)}>
                             
                             { subdivs.map((subdivision) => (
                       <MenuItem key={subdivision.id} value={subdivision.id}>
                              {subdivision.label}
                              </MenuItem>
                             ))}
                              
                          </Select>
                          </Grid>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                          <InputLabel>Shipping Options</InputLabel>
                          <Select value={shippingOption} fullWidth onChange={(e) =>setShippingOption(e.target.value)}>
                             
                             { options1.map((option) => (
                       <MenuItem key={option.id} value={option.id}>
                              {option.label}
                              </MenuItem>
                             ))}
                              
                          </Select>
                      </Grid>  
                      <br />
                      <div style={{display: "flex" , justifyContent: "space-between"}}>
                      <Button component={Link} to="/cart" variant="outlined">Back to cart</Button>
                      <Button type="Submit" variant="contained" color="primary">Next</Button>
                      </div>
                </form>
          </FormProvider>
        </>
    )
}

export default AddressForm;
