import React, { useContext, useState } from 'react'
import { Link  } from 'react-router-dom'
import { cartContext } from '../../context/CartContext'
import { toast } from 'react-toastify';
import { ColorRing } from 'react-loader-spinner';


export default function Product( {item} ) {
 let { setCounter ,addToCart }=useContext(cartContext);
 let [loadingProduct,setLoadingProduct]=useState(true)



 async function addProductToCart(productId){
  setLoadingProduct(false)
  let data=await addToCart(productId)
  .then(data=>data)
  .catch(error=>error)
  if(data?.status==='success'){
    toast.success('Added to your cart successfully')
    localStorage.setItem('userId',data?.data.cartOwner)
    setLoadingProduct(true)
    setCounter(data.numOfCartItems)
  }
}

  return (
    <>
        <div className="col-md-3">
                <div className="product cursor-pointer rounded-3 p-3">
                  <Link  to={'/ProductDetails/' + item._id}>
                  <img src={item.imageCover} className='w-100'  alt="just img" />
                  <span className='text-main  mb-2'>{item.category.name}</span>
                  <br/>
                  <small className='text-info text-right' >{item.quantity} items</small>
                  <div className='d-flex justify-content-between my-3'>

                    <div>
                      {item.price}EGP
                    </div>
                    <div >
                      <i className='fa fa-star rating-color'></i>
                      {item.ratingsAverage}
                    </div>
                  </div>
                  
                  </Link>
                  <button disabled={!loadingProduct} onClick={()=>{addProductToCart(item._id)}
                } className='btn text-capitalize button'>
                  {!loadingProduct?<ColorRing
                  visible={true}
                  height="25"
                  width="25"
                  ariaLabel="color-ring-loading"
                  wrapperStyle={{}}
                  wrapperClass="color-ring-wrapper"
                  colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
                  />:'Add To Cart'}
                </button>
                </div>
        </div>
    </>
  )
}
