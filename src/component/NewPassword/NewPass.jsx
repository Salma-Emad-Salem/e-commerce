import React, { useState } from 'react'
import axios from 'axios'
import { baseUrl } from '../../utilties/baseUrl'
import {useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'

export default function NewPass() {

  let navigate =useNavigate()
  const [loading , setLoading]=useState(true)
  const [errorMsg , setErrorMsg]=useState('')

  async function ChangePassword(value){
      return await axios.put(baseUrl +`auth/resetPassword`,value)
      .then(data=>{
          console.log(data)
          setLoading(true)
          if(!!data.data.token){
            localStorage.setItem('token', data?.data.token )
            navigate('/SignIn')
          }
      }).catch(err =>{
          console.log(err)
          setLoading(false)
          // setErrorMsg(data?.response?.data?.message)
      })

   }
   function validationSchema(){
    let schema = new Yup.object({
      email:Yup.string().email().required(),
      newPassword:Yup.string().matches().required(),
    })
    return schema

  }
   let CurrentPassword =useFormik({
  
      initialValues:{
  
           email :"",
           newPassword :""
  
      },
      validationSchema,
      onSubmit:(values)=>{
        console.log(values)
        ChangePassword(values)

        //dh elmkan aly bnklm feh el backend
      }
    })

  return (
    <>
        <div className=" container w-50 my-4 py-4 newpass">
        <form  onSubmit={CurrentPassword.handleSubmit}>
        <input placeholder='Enter Your email '  onBlur={CurrentPassword.handleBlur} value={CurrentPassword.values.email} onChange={CurrentPassword.handleChange}  type="email" name='email'id='email'  className='form-control py-2 mb-3'/>
          {CurrentPassword.errors.email && CurrentPassword.touched.email ? <div className='alert alert-danger'>{CurrentPassword.errors.email}</div> :'' }
          

          <input placeholder='newPassword'  onBlur={CurrentPassword.handleBlur} value={CurrentPassword.values.password} onChange={CurrentPassword.handleChange}  type="password" name='newPassword'id='newPassword'  className='form-control py-2'/>
          {CurrentPassword.errors.password && CurrentPassword.touched.password ? <div className='alert alert-danger'>{CurrentPassword.errors.password}</div> :'' }
         
          
          {errorMsg ? <div className='alert alert-danger'>{errorMsg}</div> : ''}
          <button disabled={!(CurrentPassword.dirty && CurrentPassword.isValid)} type='Submit' className='btn bg-main text-white mt-3'>Sign</button>
        </form>  
        </div>
         </>
  )
}
