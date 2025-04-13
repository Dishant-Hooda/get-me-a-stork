

import PaymentPage from '@/componenets/PaymentPage'
import React from 'react'
import { dbConnect } from '@/lib/dbConnect'
import User from '@/models/User'
import { notFound } from 'next/navigation'

const Username = async ({ params }) => {
    // if the user name is not found, show a 404 page
    let username = await params.username
    const checkUser = async () => {
        await dbConnect()
        let u = await User.findOne({ username: params.username })
        if (!u) {
            return notFound()
        }
    }
    await checkUser()

    return (
        <>
            <PaymentPage username={username} />
        </>
    )
}

export default Username

export async function generateMetadata({ params }) {
    let username = await params.username
    return {
      title: `${username} - Get Me A Stork`,
      description: `Make a donation to ${username} on Get Me A Stork`,
      keywords: `${username}, donation, crowdfunding, Get Me A Stork`,
    }
  }

