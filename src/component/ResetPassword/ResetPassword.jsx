import React, { useState } from 'react'
import axios from 'axios'
import { baseUrl } from '../../utilties/baseUrl'
import {Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'

export default function ResetPassword() {
    let navigate =useNavigate()
    const [loading , setLoading]=useState(true)
    const [errorMsg , setErrorMsg]=useState('')

    async function verifyResetCode(reSet){
        return await axios.post(baseUrl +`auth/verifyResetCode`,reSet)
        .then(data=>{
            console.log(data)
            setLoading(true)
            if(data.data.status === 'Success'){
                navigate('/NewPass')
            }
        }).catch(err =>{
            console.log(err)
            setLoading(false)
            setErrorMsg(err.errorMsg)
        })

     }
     let Codee =useFormik({
    
        initialValues:{
    
            'resetCode':""
    
        },
        onSubmit:(values)=>{
          console.log(values)
          verifyResetCode(values)

          //dh elmkan aly bnklm feh el backend
        }
      })

  return (
    <div>
        <div className="col-md-6 m-auto reset">
        <form onSubmit={Codee.handleSubmit}>
        <p className='pt-3'>Lorem iris similique sapiente laboriosam
        Lorem iris similique sapiente s similique sapiente laboriosam
        Lorem iris similique sapiente laboriosam. laboriosam.</p>
        <p className='fw-bolder text-main'>Your Password Reset Code (valid for 10 minutes)</p>
        <input className='form-control'  onBlur={Codee.handleBlur} value={Codee.values.resetCode} onChange={Codee.handleChange} type="text" name="resetCode" id="resetCode" placeholder='Enter Your Code' />
        <button  className='btn bg-main text-light my-4' type='Submit'>Send Code </button>
        <Link to={'/forgotPasswords'} className='btn bg-main text-white mx-3'>Edit Your  Email</Link>
        </form>
        </div> 

    </div>
  )
}
