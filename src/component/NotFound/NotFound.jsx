import React from 'react'
import not from "../../assets/images/error.svg"
export default function NotFound() {
  return (
    <div>
        <div className="Not ">
            <div className="container">
                <div className="img">
                    <img src={not} alt='404'/>
                </div>
            </div>
        </div>
    </div>
  )
}
