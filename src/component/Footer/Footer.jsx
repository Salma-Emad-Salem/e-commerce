import React from 'react'
import img1 from '../../assets/images/amazon-pay.svg'
import img2 from '../../assets/images/amex.svg'
import img3 from '../../assets/images/download-on-apple-tv-logo.png'
import img4 from '../../assets/images/get-it-on-google-play-2016-logo.png'
import img5 from '../../assets/images/paypal.svg'
import img6 from '../../assets/images/visa.svg'
import img7 from '../../assets/images/mastercard.svg'



export default function Footer() {
  return (
    <div>
        <div className='footer'>
            <div className="last bg-main-light py-6  " >
                <div className="container-faluid mx-5 ">
                    <div className="row">
                        <div className="quets mt-4">
                            <h3>Get The FreshCart App</h3>
                            <p>We Will Send You a Link , Open It On Your Phone To Download The App</p>
                        </div>
                        <div className='d-flex justify-content-between mb-4 boxbtn'>
                            <div className='mt-2 w-75 mx-2 email '>
                            <input type="email"  placeholder='Email' className='form-control py-3'/>
                            </div>
                            <button  className='btn text-white bg-main w-25 py-3 mx-2'>Share App Link</button>
                        </div>
                        <div className="links d-flex justify-content-between  ">
                            <div className='d-flex mt-3'>
                                <p className='py-3 fw-bolder px-3'>Payment Partners</p>
                                <div className='m-2'>
                                    <img src={img1} width={60} alt="" />
                                </div>
                                <div className='m-2'>
                                    <img src={img2} width={60} alt="" />
                                </div>
                                <div className='m-2'>
                                    <img src={img5} width={60} alt="" />
                                </div>
                                <div className='m-2'>
                                    <img src={img6} width={60} alt="" />
                                </div>
                                <div className='m-2'>
                                    <img src={img7} width={60}  alt="" />
                                </div>


                            </div>
                            <div className="appstore d-flex mt-3">
                                <p className='py-3 px-3 fw-bolder'>Get Deliveries With FreshCart</p>
                            <div className='m-2'>
                                    <img src={img4} width={150}  height={50} alt="" />
                                </div>
                                <div className='m-2'>
                                    <img src={img3} width={150} alt="" />
                                </div>
                            </div>

                        </div>
                       
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
