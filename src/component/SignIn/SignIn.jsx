import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

export default function SignIn() {
  let navigate =useNavigate()
  const [loading , setLoading]=useState(true)

  const [errorMsg , setErrorMsg]=useState('')
  function GetDataToApi(values){
    setLoading(false)
  let {data} = axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values).then(({data})=>{
    console.log(data)
    if(data.message === 'success'){
      localStorage.setItem('token', data.token )
      navigate('/Home')

    }
  }).catch((errors)=>{
    // console.log(errors)
    setErrorMsg(errors.response.data.message)
    setLoading(true)
  })
  }
  

  function validationSchema(){
    let schema = new Yup.object({
      email:Yup.string().email().required(),
      password:Yup.string().matches().required(),
    })
    return schema

  }
  let login=useFormik({
    
    initialValues:{

      email:'',
      password:''

    },
    validationSchema,
    onSubmit:(values)=>{
      // console.log(values)
      GetDataToApi(values)
      //dh elmkan aly bnklm feh el backend
    }
  })
  return (
    <div>

        <div className="w-50 m-auto py-4 signin">
          <form className='py-4'  onSubmit={login.handleSubmit} >
            <h2>SignIn</h2>
            <label htmlFor="email">Email:</label>
          <input  onBlur={login.handleBlur} value={login.values.email} onChange={login.handleChange}  type="email" name='email'id='email'  className='form-control'/>
          {login.errors.email && login.touched.email ? <div className='alert text-danger '>{login.errors.email}</div> :'' }
         
          <label htmlFor="password">Password:</label>
          <input  onBlur={login.handleBlur} value={login.values.password} onChange={login.handleChange}  type="password" name='password'id='password'  className='form-control'/>
          {login.errors.password && login.touched.password ? <div className='alert text-danger'>{login.errors.password}</div> :'' }
            <button className='btn bg-main text-white mt-3' type="submit">Sign In</button>
            {errorMsg ? <div className='alert text-danger '>{errorMsg}</div> : ''}
            <br/>
            <br/>
            <span className='  fw-bolder d-flex '>Forgot  Your Password ?
            </span>
            <a className='text-decoration-none text-main py-2' href='/forgotPasswords'>Reset Password</a>
          </form>
        </div>

    </div>
  )
}
