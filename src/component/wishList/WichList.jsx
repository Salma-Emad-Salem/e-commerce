import React, { useContext , useState ,useEffect} from 'react'
import { wishListContext } from '../../context/WishList'
import { toast } from 'react-toastify';


export default function WichList( ) {
  let {counterWish ,setCounterWish , getWishList , removefromwish } =useContext(wishListContext)
  const [loading , setLoading]=useState(true)
  const [data , setData]=useState()
  const[wishItem , setWishItem] =useState([])



useEffect(()=>{
  //self invicd fUNCTION 
  ( async ()=>{
      let data = await getWishList()
      console.log('detwish', data.data)
      if(data?.response?.data.statusMsg ==='fail'){
        setData(data?data:null)
          }else{
          setData(data)
          setLoading(false)
          setCounterWish(data?.count)
          setWishItem(data?.data)
          }
  })()

},[])

async function deleteItems(id){
  let data = await removefromwish(id)
  console.log(data?data:[])
  setData(data?data:[])
  if(data.status ==='success'){
    toast.error('Item removed from wishlist!')
    setLoading(false)
    setCounterWish(data?.count)
    setWishItem(data?.data)
    setData(data)
  }
  else{
    setData(data)
  }
 }
 if(!data?.count)return<h4 className='text-main text-center my-4'>Your WishList is Empty .</h4>
  return (
  <div className="container bg-main-light my-5 p-3">
        <h2>Your Fav WishList :</h2>
        <p className='text-main'>total Quantity: <span>{counterWish}</span> Items</p>
        {wishItem.map(item => {
            return<div key={item._id}  className="row border-bottom py-2">
              <div className="col-md-2">
              <img src={item.imageCover} className='w-100'  alt="img" />
              </div>
              <div className="col-md-10 pt-4 px-4">
              <span className='text-main  mb-2 fs-4'>{item?.title}</span>
                  <br/>
                  <small className='text-info text-right fs-5' >{item?.quantity} items</small>
                  <div className='d-flex justify-content-between my-3 fs-5'>

                    <div>
                      {item.price} EGP
                    </div>
                    <div className='d-flex'>
                    <div className="whishLlistIcon">
                      <i className='fa fa-star rating-color'></i>
                      <i className='fa fa-star rating-color'></i>
                      <i className='fa fa-star rating-color'></i>
                      <i className='fa fa-star rating-color'></i>

                      { item?.ratingsAverage }
                      {/* //remove wishlist */}
                      <button onClick={()=> (deleteItems(item.id))}  className='btn text-main fs-2 mx-3'><i className='fa-solid fa-heart px-2'></i></button>
                      </div>
                      </div> 
                      </div> 
                      
              </div>

          </div>
          })}
      </div>
  )
}
