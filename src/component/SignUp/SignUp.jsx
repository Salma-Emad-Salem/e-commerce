import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

export default function SignUp() {
  let navigate =useNavigate()
  const [loading , setLoading]=useState(true)

  const [errorMsg , setErrorMsg]=useState('')
  function SendDataToApi(values){
    setLoading(false)
  let {data} = axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values).then(({data})=>{
    // console.log(data)
    if(data.message === 'success'){
      navigate('/SignIn')
      toast.success('User is Created .')
    }
  }).catch((errors)=>{
    // console.log(errors)
    setErrorMsg(errors.response.data.message)
    setLoading(true)
  })
  }


  function validationSchema(){
    let schema = new Yup.object({
      name:Yup.string().min(2).max(20).required(),
      email:Yup.string().email().required(),
      password:Yup.string().matches().required(),
      rePassword:Yup.string().oneOf([Yup.ref("password")]).required()
    })
    return schema

  }

  let Register=useFormik({
    
    initialValues:{
      name:'',
      email:'',
      password:'',
      RePassword:''
    },
    validationSchema,
    onSubmit:(values)=>{
      // console.log(values)
      SendDataToApi(values)
      //dh elmkan aly bnklm feh el backend
    }
  })
  return (
    <div>
      <div className=" w-50 m-auto py-4 signup">
        <h2>Register Now </h2>
        <form onSubmit={Register.handleSubmit} >
          
          <label htmlFor="name">Name :</label>
          <input onBlur={Register.handleBlur} value={Register.values.name} onChange={Register.handleChange} type="text" name='name'id='name'  className='form-control'/>
          {Register.errors.name && Register.touched.name ? <div className='alert text-danger'>{Register.errors.name}</div> :'' }
          
          <label htmlFor="email">Email:</label>
          <input  onBlur={Register.handleBlur} value={Register.values.email} onChange={Register.handleChange}  type="email" name='email'id='email'  className='form-control'/>
          {Register.errors.email && Register.touched.email ? <div className='alert text-danger'>{Register.errors.email}</div> :'' }
         
          <label htmlFor="password">Password:</label>
          <input  onBlur={Register.handleBlur} value={Register.values.password} onChange={Register.handleChange}  type="password" name='password'id='password'  className='form-control'/>
          {Register.errors.password && Register.touched.password ? <div className='alert text-danger'>{Register.errors.password}</div> :'' }
         
          <label htmlFor="rePassword">RePassword:</label>
          <input  onBlur={Register.handleBlur} value={Register.values.rePassword} onChange={Register.handleChange}  type="password" name='rePassword'id='rePassword'  className='form-control'/>
          {Register.errors.rePassword && Register.touched.rePassword ? <div className='alert text-danger'>{Register.errors.rePassword}</div> :'' }
          {errorMsg ? <div className='alert text-danger'>{errorMsg}</div> : ''}
          <button disabled={!(Register.dirty && Register.isValid)} type='submit' className='btn bg-main text-white mt-3'>SignUp</button>
        </form>
      </div>
    </div>
  )
}
