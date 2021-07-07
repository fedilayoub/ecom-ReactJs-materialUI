import React , { useState, useEffect } from 'react';
import { Paper, Stepper , Step, StepLabel, Typography, CircularProgress ,Divider, Button , CssBaseline} from '@material-ui/core'
import useStyles from './styles';
import { Link , useHistory } from 'react-router-dom';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import { commerce } from '../../../lib/commerce';

const steps = ['Shipping address', 'Payement details'];

const Checkout = ( { cart, onCaptureCheckout, order, error }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const classes = useStyles();
    const [ isFinished, setIsFinished] = useState(false);
    const [shippingData,setShippingData] = useState({});
    const history = useHistory();


    useEffect( () => {
        const generateToken = async () => {
            try{
                    const token = await commerce.checkout.generateToken(cart.id , {type: 'cart'});
                    setCheckoutToken(token)
            } catch (e) {
                history.push('/');

            }
        } 
            generateToken();
    } ,[cart])


    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

    const test = (data) => {
            setShippingData(data);
            nextStep();
    }

    const timeout = () => {
        setTimeout( () => {
            setIsFinished(true)
        },3000);
    }
    
    let Confirmation = () => (order.customer ? (
        <>
          <div>
            <Typography variant="h5">Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}!</Typography>
            <Divider className={classes.divider} />
            <Typography variant="subtitle2">Order ref: {order.customer_reference}</Typography>
          </div>
          <br />
          <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
        </>
      ) :(
        <div className={classes.spinner}>
          <CircularProgress />
        </div>
      ));
     
      if (isFinished){
          Confirmation = () => (
            <>
            <div>
              <Typography variant="h5">Thank you for your purchase!</Typography>
              <Divider className={classes.divider} />
            </div>
            <br />
            <Button component={Link} variant="outlined" type="button" color="secondary" to="/">Back to home</Button>
          </>

          )
      }
      else if (error) {
        Confirmation = () => (
          <>
            <Typography variant="h5">Error: {error}</Typography>
            <br />
            <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
          </>
        );
      }

    const Form = () => (activeStep === 0
        ? <AddressForm checkoutToken={checkoutToken} nextStep={nextStep} setShippingData={setShippingData}  test={test} />
        : <PaymentForm checkoutToken={checkoutToken} nextStep={nextStep} backStep={backStep} shippingData={shippingData} onCaptureCheckout={onCaptureCheckout} timeout={timeout}/>);
    return (
        <>
        <CssBaseline />
           <div className={classes.toolbar} /> 
           <main className={classes.layout}>
               <Paper className={classes.paper}>
                   <Typography variant="h4" align="center ">Checkout</Typography>
                   <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((step)=>(
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>

                        ))}
                   </Stepper>
                   { activeStep === steps.length ? <Confirmation /> : checkoutToken &&  <Form />}

               </Paper>
           </main>
        </>
    )
}

export default Checkout
