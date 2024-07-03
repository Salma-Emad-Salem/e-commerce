import React, { useState } from 'react'
import {useContext, useEffect } from 'react'
import { cartContext } from '../../context/CartContext'
import { Link} from 'react-router-dom'
import {toast } from 'react-toastify';


export default function Cart() {
  // let navigate = useNavigate()
  let {getCart , removeToCart, setCounter, updatQun}=useContext(cartContext)
  const [cartItem , setCartItem]=useState([])
  const [loading , setLoading]=useState(true)
  const [data ,setData]=useState(null)
  

  try {
    useEffect(()=>{
      //self invoked fUNCTION 
      ( async ()=>{
          let data = await getCart()
          // console.log("getCart "+ data)
          if(data?.response?.data.statusMsg ==='fail'){
            setData(null)
             }else{
              setData(data)
              setLoading(false)
              setCounter(data.numOfCartItems)
              setCartItem(data)
             }
      })()
  
  },[])
  } catch (error) {
    console.log(error)
  }
async function deleteItem(id){
 let data = await removeToCart(id)
 if(data.status ==='success'){
  setCounter(data.numOfCartItems)
  toast.error('Product Removed successfuly')
  setCartItem(data)

 }
 console.log("delete item ", data)

}
async function updateItem(id , count){
  let data = await updatQun(id , count)
  if(data.status ==='success'){
    setCounter(data.numOfCartItems)
    setCartItem(data)
   }
 }

if(!cartItem.numOfCartItems)return<div className='cartEmpaty '>
  <h4 className='text-main text-center my-4'>Your Cart is Empty .</h4>
  <Link to={'/'}><button className='btn button m-auto'>Go Shopping</button></Link>
</div>



if(loading){ return <div className='text-center py-3'>loading ...</div>}
  return (
    <>
      <div className="container bg-main-light my-5 p-3">
        <h2>Shop Cart :</h2>
        <p className='text-main'>total Cart Price : <span>{cartItem?.data.totalCartPrice}</span> EGP</p>
        {cartItem.data.products?.map(item => {
            return<div key={item._id} className="row border-bottom py-2">
              <div className="col-md-1">
              <img src={item.product.imageCover} className='w-100' alt="img" />
              </div>
              <div className="col-md-11 d-flex justify-content-between textCart">
                <div>
                  <h5>{item.product.title}</h5>
                  <p className='text-main m-0'> Price : {item.price} EGP</p>
                  <button  onClick={()=>( deleteItem(item.product._id)  )} className='btn mt-1'><i className='fa-solid fa-trash text-main'></i> 
                  Remove</button>
                </div>
                <div>
                  <button onClick={()=> updateItem(item.product._id , item.count + 1)} className='btn brdr'>+</button>
                  <span className='mx-2'>{item.count}</span>
                  <button onClick={()=> updateItem(item.product._id , item.count - 1)} className='btn brdr'>-</button>
                </div>
              </div>
          </div>
          })}
        <Link to={`/Address/${data?.data?._id}`} className='bg-main btn text-white  my-3 w-100 fw-bolder '>Order Now</Link>
      </div>
    </>
  )
}
