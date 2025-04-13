import NextAuth from 'next-auth'
import AppleProvider from 'next-auth/providers/apple'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
import EmailProvider from 'next-auth/providers/email'
import GitHubProvider from "next-auth/providers/github";
import mongoose from 'mongoose'
import User from '@/models/User'
import Payment from '@/models/Payment'
import { dbConnect } from "@/lib/dbConnect";



export const authoptions = NextAuth({
    providers: [
        // OAuth authentication providers...
        // AppleProvider({
        //   clientId: process.env.APPLE_ID,
        //   clientSecret: process.env.APPLE_SECRET
        // }),
        // FacebookProvider({
        //   clientId: process.env.FACEBOOK_ID,
        //   clientSecret: process.env.FACEBOOK_SECRET
        // }),
        // GoogleProvider({
        //   clientId: process.env.GOOGLE_ID,
        //   clientSecret: process.env.GOOGLE_SECRET
        // }),
        // // Passwordless / email sign in
        // EmailProvider({
        //   server: process.env.MAIL_SERVER,
        //   from: 'NextAuth.js <no-reply@example.com>'
        // }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        })
    ],
    callbacks: {
        async signIn({ user }) {
          try {
            await dbConnect();
            const existingUser = await User.findOne({ email: user.email });
    
            if (!existingUser) {
              const newUser = await User.create({
                email: user.email,
                username: user.email.split("@")[0],
              });
            }
    
            return true;
          } catch (err) {
            return false;
          }
        },
    
        async session({ session }) {
          try {
            await dbConnect();
            const dbUser = await User.findOne({ email: session.user.email });
    
            if (dbUser) {
              session.user.name = dbUser.username; // override name with custom username
            }
    
            return session;
          } catch (err) {
            return session;
          }
        },
    }})    
    
    export { authoptions as GET, authoptions as POST }