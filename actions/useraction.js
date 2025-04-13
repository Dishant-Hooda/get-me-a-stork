"use server"

import Razorpay from "razorpay"
import { dbConnect } from "@/lib/dbConnect"
import User from "@/models/User"
import Payment from "@/models/Payment"


export const initiate = async (amount, to_username, paymentfrom) => {
    await dbConnect()
     let user = await User.findOne({ username: to_username });
    const secret = user.razorpaysecret;
    var instance = new Razorpay({ key_id: user.razorpayid, key_secret: secret })

    instance.orders.create({
        amount: 5000,
        currency: "INR",
        receipt: "receipt#1",
        notes: {
            key1: "value3",
            key2: "value2"
        }
    })

    let options = {
        amount: Number.parseInt(amount),
        currency: "INR",
    }

    let x = await instance.orders.create(options)

    // create a payment option that shows a pending payment in the database
    await Payment.create({
        oid: x.id,
        amount: amount/100,
        status: "pending",
        to_user: to_username,
        name: paymentfrom.name,
        message: paymentfrom.message,
    })

    return x
}

export const fetchuser = async (username) => {
    await dbConnect();
    let u = await User.findOne({ username: username });
    let user = u.toObject({ flattenObjectIds: true });
    return user
}  

export const fetchpayment = async (username) => {
    await dbConnect();
    //find all payments made to the user in decreasing order and flatten object ids
    let p = await Payment.find({ to_user: username, done:true }).sort({ amount: -1 }).limit(10).lean();

    p = p.map(payment => ({
      ...payment,
      _id: payment._id.toString(),
      createdAt: payment.createdAt?.toISOString(),
      updatedAt: payment.updatedAt?.toISOString(),
    }));

    return p
}

export const updateProfile = async (data, oldusername) => {
    await dbConnect();
    let ndata = Object.fromEntries(data)
    //if the username is updated, check if the username is available
    if (ndata.username !== oldusername) {
        let u = await User.findOne({ username: ndata.username })
        if (u) {
            return { error: "Username already taken" }
        }
        await User.updateOne({email: ndata.email}, ndata)
        // Now update all the usernames in the Payments table 
        await Payment.updateMany({to_user: oldusername}, {to_user: ndata.username})
    }
    else{
        await User.updateOne({email: ndata.email}, ndata)
    }

    


}