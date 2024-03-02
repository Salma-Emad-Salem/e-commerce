import axios from 'axios'
import React, {  useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { cartContext } from '../../context/CartContext'
import { wishListContext } from '../../context/WishList'



export default function ProductDetails() {
    let {counter , setCounter ,addToCart}=useContext(cartContext)
    let{addProductWishList , counterWish ,setCounterWish }=useContext(wishListContext)
    const [product, setProduct] =useState([])
    const [loading ,setLoading] = useState(true)
    let x = useParams()


    async function getProdDet(){
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${x.MyId}`)
    setProduct(data?.data)
    setLoading(false)
    console.log(data.data);
}
    useEffect( () =>{
        getProdDet()
    }, [])

    async function CartItem(productId){
        let data = await addToCart(productId)
                
        if(data.status =='success'){
            setCounter(data.numOfCartItems)
            
    localStorage.setItem('userId',data?.data.cartOwner)
   }
    }

    async function addWishList(productId){
        let data =await addProductWishList(productId)
        let count = data?.data.length
        if(data.status =='success'){
          setCounterWish(count)
         }
      }
      
    if(loading){ return <div className='text-center py-3'>loading ...</div>}
  return (
    <>
        <div className="product-details  d-flex justify-content-center mt-4">
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <img src={product.imageCover} width={330}  alt="" />
                    </div>
                    <div className="col-md-7 offset-1">
                        <h4 className=' mt-4'>{product.title}</h4>
                        <p>{product.description}</p>
                        <div className='d-flex justify-content-between my-3'>
                            <div>
                            <p><b>{product.price} EGP</b></p>
                            </div>
                            <div className='d-flex'>
                            <i className='fa fa-star rating-color'></i>
                            <i className='fa fa-star rating-color'></i>
                            <i className='fa fa-star rating-color'></i>
                            <i className='fa fa-star rating-color'></i>
                            { product.ratingsAverage }
                            <div className="whishLlistIcon mx-2 ">
                        <button onClick={()=>{ addWishList(product._id)}}  className='btn bg-main  text-white'><i className='fa-solid fa-heart px-2'></i></button>
                      </div>
                            </div>
    
                        </div>
                        <button onClick={()=> CartItem(product._id)}   className='btn bg-main w-100 text-white'>Add To Cart</button>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
