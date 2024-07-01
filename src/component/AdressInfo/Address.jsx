import { useFormik } from "formik";
import { useContext, useState } from "react";
import * as yup from 'yup';
import { useNavigate, useParams } from "react-router-dom";
import { cartContext } from "../../context/CartContext";
  
export default function Address({children}) {
  const schema = yup.object({
    details:yup.string().required('Your Address is required').min(5,'Please enter Valid address'),
    phone:yup.string().required('Your Phone number is required').matches(/^(01)[0125][0-9]{8}$/,"Please enter an egyptian valid number"),
    city:yup.string().required('Your City is required').min(3,'Please enter valid city')
    })
  const navigate = useNavigate();
  const {id}=useParams();
  const {onlinePayment,cashPayment,setCounter ,userid}=useContext(cartContext);
  const [paymentMethod,setPaymentMethod]=useState(null);
  let [loadingProduct,setLoadingProduct]=useState(true)


  
  async function checkOut(values){
    if(paymentMethod === 'online'){
      let data=await onlinePayment(id,values)
      setLoadingProduct(false)
    if(data.status=== 'success'){
      window.location.href=data.session.url
      setLoadingProduct(true)
      setCounter(0)
    }
    console.log(data);
    
    }
    else if(paymentMethod === 'cash'){
      let data=await cashPayment(id,values)
      console.log(data)
      setLoadingProduct(false)
      if(data?.status === 'success'){
        // localStorage.setItem('userId',data?.data.user)
        navigate(`/CashOrder/${userid}`)
        setLoadingProduct(true)
        setCounter(0)
      }
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
    <div>

<div className='bg-body-secondary'>
    <div className='my-5 py-5 container  '>
      <div className='delivery my-3 bg-white p-5'>
      <h3 className='mb-4 text-main'>Delivery Details</h3>

      <form  onSubmit={addressDetails.handleSubmit}>
        <select className='form-control mb-3' name="country" id="country">
          <option value="Egypt">Egypt</option>
        </select>
        <textarea
        onChange={addressDetails.handleChange}
        onBlur={addressDetails.handleBlur}
        value={addressDetails.values.details}
        className='form-control mb-3' type="text" 
        name="details" id="details" placeholder='Address' ></textarea>

        {addressDetails.errors.details && addressDetails.touched.details?<p className="error-msg">{addressDetails.errors.details}</p>:null}
        
        <input
        onChange={addressDetails.handleChange}
        onBlur={addressDetails.handleBlur}
        value={addressDetails.values.phone}
        className='form-control mb-3' type="text" 
        name="phone" id="phone" placeholder='Phone' />
        {addressDetails.errors.phone && addressDetails.touched.phone?
        <p className="error-msg">{addressDetails.errors.phone}</p>:''}

        <input
          onChange={addressDetails.handleChange}
          onBlur={addressDetails.handleBlur}
          value={addressDetails.values.city}
          className='form-control mb-3' type="text" 
          name="city" id="city" placeholder='City' />
          {addressDetails.errors.city && addressDetails.touched.city?
          <p className="error-msg">{addressDetails.errors.city}</p>
          :''}

          {addressDetails.dirty && addressDetails.isValid  ?<div className="payment my-3 bg-white p-5">
          <h3 className='mb-4 text-main'>Payment</h3>
          <p>All transactions are secure and encrypted.</p>
          <button type="button" className="btn d-block " onClick={()=>{setPaymentMethod('online')}}> Pay via(Debit/Credit cards)</button>
          <button type="button" className="btn d-block " onClick={()=>setPaymentMethod('cash')} > Cash on Delivery (COD)</button>
          <br />
          <br />
          {paymentMethod && addressDetails.dirty && addressDetails.isValid ? (<button disabled={!loadingProduct} type="submit" className="btn submit d-block m-auto" >Submit</button>) : ''}
          </div>:''}


      
      </form>
      </div>
      </div>
    </div>
    </div>
  )

}

