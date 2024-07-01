import { useContext, useState ,useEffect} from "react";
import { cartContext } from "../../context/CartContext";
import { useNavigate} from "react-router-dom";



export default function CashOrder() {
   let { getAllOrdersUser }= useContext(cartContext)
   const [orders , setOrders]= useState([])

   const [loading , setLoading]=useState(true)
   
  let navigate =useNavigate()

  async function userOrder(){
    setLoading(false)
    return await getAllOrdersUser()
    .then(data=>{
      if(Array.isArray(data)){
        setOrders(data)
        console.log(data)

      }
      setLoading(true)
    })
    .catch(err=>err)
  }

useEffect(()=>{
  userOrder()
},[])
  return (
    <div>
        <div className="recipt py-5 mb-3">
          <div className="container">
            <div className="row">
            <div className="col-md-6  form-control py-4 mt-4">
                 {orders.map(item=>{
                    return<div key={item.id} className="UserCart">
                    <div  className="details px-3">
                    <p className="text-main fw-bolder fs-4">Payment is Cash </p>
                    <p className="my-2 text-main">Your total price is : {item.totalOrderPrice} EGP</p>
                      <p className="my-2 text-main" >Your Address is :{item.shippingAddress.details} </p>
                      <p className="my-2 text-main">Your Number is : {item.shippingAddress.phone} </p>
                      <p className="my-2 text-main">Your City is : {item.shippingAddress.city} </p>
                    </div>
                     <div className="shipping">
                     <div className="pro">
                     <p className="text-center fs-5 fw-bold text-main"> Your orders :</p>
                      <div className="images">
                        
                         {item.cartItems?.map(items=>{
                            return<div className="row border-bottom py-2">
                  
                            <div className="col-md-1">
                            <img src={items.product.imageCover} className='w-100' alt="" />
                           </div>
                           <div className="col-md-11">
                           <h5>{items.product.title}</h5>
                                <p className='text-main m-0'> Price : {items.price} EGP</p>
                           </div>
                           </div>          
                      })}
                      </div>
                    </div>
                      

                      </div>
                      </div>
                    })}

            </div>
            </div>
            <button onClick={()=>navigate('/Home')} className="bg-main text-white  btn w-100   my-3 " type="submit">Confirm</button>
          </div>
        
        </div>
    </div>
        )

}