import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function VerifyOTP(){

    const navigate=useNavigate();

    const {state}=useLocation();

    const [otp,setOtp]=useState("");

    const verify=async()=>{

        try{

            const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";
            await axios.post(
                `${API_URL}/users/verify`,
                null,
                {
                    params:{
                        email:state.email,
                        otp:otp
                    }
                }
            );

            alert("Email Verified Successfully");

            navigate("/login");

        }
        catch{

            alert("Invalid OTP");

        }

    };

    return(

        <div className="min-h-screen flex items-center justify-center">

            <div className="bg-white p-8 rounded-xl shadow-lg">

                <h2 className="text-2xl font-bold mb-5">

                    Verify Email

                </h2>

                <input

                    type="text"

                    placeholder="Enter OTP"

                    value={otp}

                    onChange={(e)=>setOtp(e.target.value)}

                    className="border p-3 w-full rounded"

                />

                <button

                    onClick={verify}

                    className="mt-5 bg-blue-600 text-white px-6 py-3 rounded w-full"

                >

                    Verify OTP

                </button>

            </div>

        </div>

    );

}