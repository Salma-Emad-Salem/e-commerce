import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { baseUrl } from '../../utilties/baseUrl';

export default function Categories() {
    const [ categ , setCateg ] = useState([]);

    async function getCategories(){
  
    let { data } = await axios.get(baseUrl + 'categories')
    setCateg(data.data)
    console.log(data.data)
    }
    useEffect(()=>{
        getCategories()    
    },[])
  
  return (
    <div>
        <div className='category mt-5'>
            <div className="container">
          <div className="row">
            {
            categ.map((item) => (
                <div key={item._id} className="col-md-3">
                    <div  className='pt-2'>
                    <img src={item.image} className='w-100' height={240} alt="" />
                    <h4 className='text-center py-1 fs-5'>{item.name}</h4>
                </div>
                </div>
            ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}
