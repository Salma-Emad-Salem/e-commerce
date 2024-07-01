import axios from "axios";
import { createContext, useState } from "react";
import { baseUrl } from "../utilties/baseUrl";

export let cartContext= createContext(0)


async function addToCart(productId){
    //documention lazm product id ykun fe el body
    return axios.post(baseUrl + "cart" , {productId},{
        headers:{
            token:localStorage.getItem('token')
        }
    })
    //3mlna distract ll data 3lshan gwaha hga asmha data bardo  
    
    .then(({data})=> data).catch(err=>err)
}
async function getCart(){
    //documention lazm product id ykun fe el body
    return axios.get(baseUrl + "cart" , {
        headers:{
            token:localStorage.getItem('token')
        }
    })
    //3mlna distract ll data 3lshan gwaha hga asmha data bardo  
    .then(({data})=> data).catch(err=>err)
}
async function removeToCart(productId){
    //documention lazm product id ykun fe el body
    return axios.delete(baseUrl + "cart/" + productId ,{
        headers:{
            token:localStorage.getItem('token')
        }
    })
    //3mlna distract ll data 3lshan gwaha hga asmha data bardo  
    .then(({data})=> data).catch(err=>err)
}
async function updatQun(productId , count){
    //documention lazm product id ykun fe el body
    return axios.put(baseUrl + "cart/" + productId, {count},{
        headers:{
            token:localStorage.getItem('token')
        }
    })
    //3mlna distract ll data 3lshan gwaha hga asmha dafr2 beny w benkta bardo  
    .then(({data})=> data).catch(err=>err)
}

async function onlinePayment(cartId , shippingAddress){
    return axios.post(baseUrl + "orders/checkout-session/" + cartId ,{shippingAddress},{
        headers:{
            token:localStorage.getItem('token')
        }
    }) 
    .then(({data})=> data).catch(err=>err)

}
async function cashPayment(cartId , shippingAddress){
    return axios.post(baseUrl + "orders/" + cartId ,{shippingAddress},{
        headers:{
            token:localStorage.getItem('token')
        }
    }) 
    .then(({data})=> data).catch(err=>err)

}
const userid =localStorage.getItem('userId')
async function getAllOrdersUser(){

    return axios.get(baseUrl + `orders/user/${userid}`,{
        headers:{
            token:localStorage.getItem('token'),
        }
    }) 
    .then(({data})=> data).catch(err=>err)

}


export default function CartContainr({children}){
    const [counter ,setCounter]=useState(0)
    return<cartContext.Provider value={{counter
    , setCounter
    ,addToCart
    ,getCart
    ,removeToCart
    ,updatQun
    ,onlinePayment
    ,cashPayment
    ,getAllOrdersUser
    ,userid

    }}>
        {children}
        </cartContext.Provider>
} 
