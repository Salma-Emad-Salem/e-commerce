import React, { useContext } from 'react'
import { Link  } from 'react-router-dom'
import { cartContext } from '../../context/CartContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




export default function Product( {item} ) {
 let { setCounter ,addToCart,userId }=useContext(cartContext)

    let notify = () => toast.success('Item added to cart!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });


   async function CartItem(productId){
    return await addToCart(productId)
   .then(data=>{
    if(Array.isArray(data)){
      setCounter(data?.numOfCartItems)
      notify()
    }
console.log(data)
setCounter(data?.numOfCartItems)
notify()
localStorage.setItem('userId',data.data?.cartOwner)
  }).catch(err=>err)

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
                  <button 
                    onClick={
                      ()=>( CartItem(item._id),  userId ) } 
                    className='btn bg-main w-100 text-white'>Add To Cart</button>
                    <ToastContainer />
                </div>
        </div>
    </>
  )
}
