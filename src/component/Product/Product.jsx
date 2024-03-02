import React, { useContext } from 'react'
import { Link  } from 'react-router-dom'
import { cartContext } from '../../context/CartContext'
import { wishListContext } from '../../context/WishList'


export default function Product( {item} ) {
  let {counter , setCounter ,addToCart, setUserId,userId }=useContext(cartContext)
  let{addProductWishList , counterWish ,setCounterWish }=useContext(wishListContext)

async function CartItem(productId){
   let data = await addToCart(productId)
   console.log(data)
   if(data.status =='success'){
    setCounter(data.numOfCartItems)
    localStorage.setItem('userId',data.data?.cartOwner)
    setCounterWish(data)
    
   }
  }

  async function addWishList(productId){
    let data =await addProductWishList(productId)
    let count = data?.data.length
    setCounterWish({counterWish})
  }
  
  return (
    <>
        <div className="col-md-2">
                <div className="product cursor-pointer rounded-3 p-3">
                  <Link  to={'/ProductDetails/' + item._id}>
                  <img src={item.imageCover} className='w-100'  alt="" />
                  <span className='text-main  mb-2'>{item.category.name}</span>
                  <br/>
                  <small className='text-info text-right' >{item.quantity} items</small>
                  <div className='d-flex justify-content-between my-3'>

                    <div>
                      {item.price}EGP
                    </div>
                    <div className=''>
                      <i className='fa fa-star rating-color'></i>
                      {item.ratingsAverage}
                      
                      <div className="whishLlistIcon">
                        <button onClick={()=>{ addWishList(item._id)}}  className='btn bg-main  text-white'><i className='fa-solid fa-heart px-2'></i></button>
                      </div>
                    </div>
                

                  </div>
                  
                  </Link>
                  <button onClick={()=>{ CartItem(item._id ),userId}}  className='btn bg-main w-100 text-white'>Add To Cart</button>
                
                </div>
        </div>
    </>
  )
}
