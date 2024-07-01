import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Product from '../Product/Product'

export default function Products() {
  const [prod ,setProd]=useState([])
  const [loading , setLoading]=useState(true)

  async function getProduct(){
    let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/products')
    setProd(data?.data)
    setLoading(false)
  }
  useEffect(()=>{
    getProduct()
  },[])

  if(loading){ return <div className='text-center py-3'>loading ...</div>}
  return (
    <>
      <div className="productsAll py-4">
        <div className="container">
          <div className="row ">
            
            {
              prod.map((item)=>{
                return <Product item={item}  key={item._id} className="w-50"  />
              })
            }

          </div>
        </div>
      </div>
    </>
  )
}
