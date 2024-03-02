import { useContext, useState ,useEffect} from "react";
import { cartContext } from "../../context/CartContext";
import { useNavigate, useParams} from "react-router-dom";


export default function CashOrder() {
   let { getAllOrdersUser }= useContext(cartContext)
   const [orders ,setOrders]= useState([])
   const [itemOrder , setItemOrder] =useState([])
   let { account }=useParams()
   
  let navigate =useNavigate()

   useEffect(()=>{
    ( async ()=>{
        let data = await getAllOrdersUser(account)
        console.log(data)
        if(data?.response?.data.statusMsg =='fail'){
          setOrders(null)
           }else{
            setOrders(data)
            setLoading(false)
            setItemOrder(data)
           }
    })()

},[])
  return (
    <div>

    </div>
  )
}
