import React, { useState } from 'react'
import axios from 'axios'
import { baseUrl } from '../../utilties/baseUrl'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'

export default function ForgetPassword() {
    let navigate =useNavigate()
    const [loading , setLoading]=useState(true)
    const [errorMsg , setErrorMsg]=useState('')

        async function forgetPassword(values){
        setLoading(false)
        let data =  await axios.post(baseUrl + 'auth/forgotPasswords', values).then(({data})=>{
        console.log(data)
        if(data.statusMsg === 'success'){
            localStorage.setItem('token', data.token )
            navigate('/ResetPassword')
    
        }
        }).catch((err)=>{
        // console.log(errors)
        console.log(err)
        setErrorMsg(data?.response?.data?.message)
        setLoading(true)
        })
        }
    let forget =useFormik({

    initialValues:{

        email:''


    },
    onSubmit:(values)=>{
        // console.log(values)
        forgetPassword(values)
        //dh elmkan aly bnklm feh el backend
    }
    })
  
  return (
    <div>
        <div className="forget py-4 m-auto">
            <div className="container">
                <div className="row">
                <h4 className='text-center'>
                    Reset Your Password
                </h4>

                    <div className="col-md-6  m-auto">
                        <form onSubmit={forget.handleSubmit} className='mt-5'>
                        <input placeholder='Enter Your email '  onBlur={forget.handleBlur} value={forget.values.email} onChange={forget.handleChange}  type="email" name='email'id='email'  className='form-control py-3'/>
                        {forget.errors.email && forget.touched.email ? <div className='alert alert-danger'>{forget.errors.email}</div> :'' }
                            <p>{errorMsg}</p>
                            {forget.dirty && forget.isValid ? <button className='btn bg-main text-white my-3 py-2 w-25'  type='submit'>Submit</button> :''}
                            
                        </form>
                    </div> 

                </div>
            </div>
        </div>
    </div>
  )
}
