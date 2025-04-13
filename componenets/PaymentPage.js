"use client"
import React, { use, useEffect, useState } from 'react'
import Script from 'next/script'
import { useSession } from 'next-auth/react'
import { set } from 'mongoose'
import { fetchuser, fetchpayment, initiate } from '@/actions/useraction'
import { useSearchParams } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';
import { useRouter } from 'next/navigation'
import { notFound } from "next/navigation"


const PaymentPage = ({ username }) => {

    const [paymentform, setPaymentform] = useState({name: "", amount: "", message: ""})
    const [currentUser, setcurrentUser] = useState({})
    const [payments, setPayments] = useState([])
    const { data: session } = useSession()
    const searchParams = useSearchParams()
    const router = useRouter()


    useEffect(() => {
        getData()
    }, [])
    useEffect(() => {
        if(searchParams.get("paymentdone") == "true"){
        toast('Thanks for your donation!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            });
        }
        router.push(`/${username}`)
     
    }, [])




    const handleChange = (e) => {
        setPaymentform({
            ...paymentform,
            [e.target.name]: e.target.value
        })
    }

    const getData = async () => {
        let u = await fetchuser(username)
        setcurrentUser(u)
        let dbpayments = await fetchpayment(username)
        setPayments(dbpayments)
    }

    const pay = async (amount) => {
        //get the order id from the server
        let a = await initiate(amount, username, paymentform)
        let orderId = a.id
        var options = {
            "key": currentUser.razorpayid, // Enter the Key ID generated from the Dashboard
            "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Get me a Stork", //your business name
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                "name": "Gaurav Kumar", //your customer's name
                "email": "gaurav.kumar@example.com",
                "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            },
        };
        var rzp1 = new Razorpay(options);

        rzp1.open();
    }

    
    return (
        <>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>


            <div className="cover w-full bg-red-50 relative" style={{ position: 'relative' }}>
                <img className="object-cover w-full h-[350px]" src={currentUser.coverpic} alt="" />
                <div className="absolute -bottom-14 right-[47%] ">
                    <img width={100} height={100} className="border-1 rounded-lg border-white" src={currentUser.profilepic} alt="" />
                </div>
            </div>
            <div className="info flex flex-col justify-center items-center my-24 gap-2 ">

                <div className='text-2xl font-bold'>
                    @{username}
                </div>

                <div className='text-gray-500'>
                    Let's help {username} to get stork!
                </div>

                <div className='text-gray-500'>
                    {payments.length} payments received, ₹{payments.reduce((acc, p) => acc + p.amount, 0)} Raised
                </div>

                <div className="payment md:flex-row flex flex-col gap-3 md:w-[80%] w-[100%] items-center mt-10">
                    <div className="supporters md:w-1/2 bg-gray-900 rounded-lg p-5">
                        <h2 className="text-2xl my-5 font-bold">Top 10 Supporters</h2>
                        {/* Show list of supporters as a leader board */}
                        <ul className='mx-5 text-lg'>
                            {payments.length === 0 && <li>No payments yet</li>}
                            {payments.map((p, i) => {
                                return <li className='my-4 flex gap-2  items-center'>
                                    <img width="30" src="/user.gif" alt="" />
                                    <span>{p.name} payment <span className='font-extrabold'>₹{p.amount}</span> {p.message}</span>

                                </li>
                            })}
                        </ul>
                    </div>

                    <div className="makePayment md:w-1/2 bg-gray-900 rounded-lg p-5">
                        {/* Make a Payment  */}
                        <h2 className="text-2xl my-5 font-bold">Make a Payment</h2>
                        <div className="flex flex-col gap-5">
                            <input onChange={handleChange} value={paymentform.name} name='name' type="text" placeholder='Name' className='py-2 px-3 rounded-lg bg-gray-800 text-white' required />
                            <input onChange={handleChange} value={paymentform.amount} name="amount" type="text" placeholder='Amount' className='py-2 px-3 rounded-lg bg-gray-800 text-white' required />
                            <input onChange={handleChange} value={paymentform.message} name="message" type="text" placeholder='Message' className='py-2 px-3 rounded-lg bg-gray-800 text-white' />

                            <button onClick={() => pay(Number.parseInt(paymentform.amount) * 100)} className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2 disabled:from-pink-200 disabled:bg-slate-600 disabled:to-orange-200" disabled={!paymentform.name || paymentform.name.length < 3 || !paymentform.message || paymentform.message.length < 3 || !paymentform.amount || paymentform.amount.length < 1}>Pay</button>
                        </div>
                        {/* or choose form these amounts  */}
                        <div className="flex gap-3 mt-5">
                            <button className='bg-gray-800 p-2 rounded-lg' onClick={() => pay(1000)}>Pay 10</button>
                            <button className='bg-gray-800 p-2 rounded-lg' onClick={() => pay(2000)}>Pay ₹20</button>
                            <button className='bg-gray-800 p-2 rounded-lg' onClick={() => pay(5000)}>Pay ₹50</button>
                            <button className='bg-gray-800 p-2 rounded-lg' onClick={() => pay(10000)}>Pay ₹100</button>
                        </div>
                        <div className="text-gray-500 text-sm mt-5">
                            By making a payment you agree to our terms and conditions
                        </div>

                    </div>
                </div>

            </div>

        </>
    )
}

export default PaymentPage
