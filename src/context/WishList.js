import axios from "axios";
import { createContext, useState } from "react";
import { baseUrl } from "../utilties/baseUrl";


export let wishListContext= createContext(0)



async  function addProductWishList(productId){
    return axios.post(baseUrl + "wishlist"  , {productId},{
        headers:{
            token:localStorage.getItem('token')
        }
    }) 
    .then(({data})=> data).catch(err=>err)
}
async function getWishList(){
    //documention lazm product id ykun fe el body
    return axios.get(baseUrl + "wishlist" , {
        headers:{
            token:localStorage.getItem('token')
        }
    })
    //3mlna distract ll data 3lshan gwaha hga asmha data bardo  
    .then(({data})=> data).catch(err=>err)
}
async function removefromwish(productId){
    //documention lazm product id ykun fe el body
    return axios.delete(baseUrl + "wishlist/" + productId ,{
        headers:{
            token:localStorage.getItem('token')
        }
    })
    //3mlna distract ll data 3lshan gwaha hga asmha data bardo  
    .then(({data})=> data).catch(err=>err)
}
export default function WishLIstContainr({children}){
    const [counterWish ,setCounterWish]=useState(0)
    const [userId , setUserId]=useState()
    return<wishListContext.Provider value={{setCounterWish 
    ,counterWish
    ,setUserId
    ,userId
    ,addProductWishList
    ,getWishList
    ,removefromwish
        }}>
        {children}
    </wishListContext.Provider>

}