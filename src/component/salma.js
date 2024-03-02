import { useFormik } from "formik";
import { useContext, useState } from "react";
import * as yup from 'yup';
import { cartContext } from "../../Context/CartContext";
import { useNavigate, useParams } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

const schema = yup.object({
details:yup.string().required('Your Address is required').min(5,'Please enter Valid address'),
phone:yup.string().required('Your Phone number is required').matches(/^(01)[0125][0-9]{8}$/,"Please enter an egyptian valid number"),
city:yup.string().required('Your City is required').min(3,'Please enter valid city')
})

export default function CreateOrder({children}) {
  const navigate = useNavigate();
  const {id}=useParams();
  const {payOnline,payCash,setCounter,setUserId}=useContext(cartContext);
  const [paymentMethod,setPaymentMethod]=useState(null);
  let [loadingProduct,setLoadingProduct]=useState(true)

  
  async function checkOut(values){
    if(paymentMethod === 'online'){
      let data=await payOnline(id,values)
      setLoadingProduct(false)
    if(data.status=== 'success'){
      toast.success('Your Order is placed successfully')
      window.location.href=data.session.url
      setLoadingProduct(true)
      setCounter(0)
    }
    console.log(data);
    
    }
    else if(paymentMethod === 'cash'){
      let data=await payCash(id,values)
      setLoadingProduct(false)
      if(data?.status=== 'success'){
        toast.success('Your Order is placed successfully')
        setUserId(data?.data.user)
        // localStorage.setItem('userId',data?.data.user)
        navigate(/allorders)
        setLoadingProduct(true)
        setCounter(0)
      }
      console.log(data);
      console.log(data?.data.user);
    }
  } 


    let addressDetails=useFormik({
      initialValues:{
        details: "",
        phone: "",
        city: ""
      },

      onSubmit:(values)=>{
        checkOut(values)
      },

      validationSchema: schema
    })

    
    
  return (
    <>

    <Helmet>
    <title>CheckOut</title>
    </Helmet>

    <div className='bg-body-secondary'>
    <div className='my-5 py-5 container  '>
      <div className='delivery my-3 bg-white p-5'>
      <h3 className='mb-4 text-main'>Delivery Details</h3>

      <form  onSubmit={addressDetails.handleSubmit}>
        <select className='form-control mb-3' name="country" id="country">
          <option value="Egypt">Egypt</option>
        </select>
        <input
        onChange={addressDetails.handleChange}
        onBlur={addressDetails.handleBlur}
        value={addressDetails.values.details}
        
        className='form-control mb-3' type="text" 
        name="details" id="details" placeholder='Address' />
        {addressDetails.errors.details && addressDetails.touched.details?
        <p className="error-msg">{addressDetails.errors.details}</p>
        :null}
        
        <input
        onChange={addressDetails.handleChange}
        onBlur={addressDetails.handleBlur}
        value={addressDetails.values.phone}
        
        className='form-control mb-3' type="text" 
        name="phone" id="phone" placeholder='Phone' />
        {addressDetails.errors.phone && addressDetails.touched.phone?
        <p className="error-msg">{addressDetails.errors.phone}</p>
        :null}
        
        <input
        onChange={addressDetails.handleChange}
        onBlur={addressDetails.handleBlur}
        value={addressDetails.values.city}
        
        className='form-control mb-3' type="text" 
        name="city" id="city" placeholder='City' />
        {addressDetails.errors.city && addressDetails.touched.city?
        <p className="error-msg">{addressDetails.errors.city}</p>
        :null}

        {addressDetails.dirty && addressDetails.isValid?<div className="payment my-3 bg-white p-5">
            <h3 className='mb-4 text-main'>Payment</h3>
            <p>All transactions are secure and encrypted.</p>

           
            <button 
            type="button" className={btn d-block pay ${paymentMethod==='online'?'text-main':''}}
            onClick={()=>{setPaymentMethod('online')}}
            
            >Pay via(Debit/Credit cards)</button>

            <button 
            type="button" className={btn d-block pay ${paymentMethod==='cash'?'text-main':''}}
            onClick={()=>setPaymentMethod('cash')}
            >Cash on Delivery (COD)</button>
        </div>:''}

        {paymentMethod && addressDetails.dirty && addressDetails.isValid ? (
              <button disabled={!loadingProduct} type="submit" className="btn button d-block m-auto" >
                {!loadingProduct?<ColorRing
            visible={true}
            height="25"
            width="25"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
            />:'Order Now'}
            </button>
            ) : null}
      </form>
      </div>
    </div>
    </div>

    </>
  )
}
0000000000000000000000
{addressDetails.errors.phone && addressDetails.touched.phone?
  <p className="error-msg">{addressDetails.errors.phone}</p>
  :null}
  
  <input
  onChange={addressDetails.handleChange}
  onBlur={addressDetails.handleBlur}
  value={addressDetails.values.city}
  className='form-control mb-3' type="text" 
  name="city" id="city" placeholder='City' />
  {addressDetails.errors.city && addressDetails.touched.city?
  <p className="error-msg">{addressDetails.errors.city}</p>
  :null}

  {addressDetails.dirty && addressDetails.isValid ? 
  <div className="payment my-3 bg-white p-5">
      <h3 className='mb-4 text-main'>Payment</h3>
      <p>All transactions are secure and encrypted.</p>
      <button type="button" className={btn d-block pay ${paymentMethod==='online'?'text-main':''}}onClick={()=>{setPaymentMethod('online')}}>Pay via(Debit/Credit cards)</button>
      <button type="button" className={btn d-block pay ${paymentMethod==='cash'?'text-main':''}}onClick={()=>setPaymentMethod('cash')}>Cash on Delivery (COD)</button></div>:''}

  {paymentMethod && addressDetails.dirty && addressDetails.isValid ? (
        <button disabled={!loadingProduct} type="submit" className="btn button d-block m-auto" ></button>
      ) : null}