import React from 'react'
import Dashboard from '@/componenets/Dashboard'

const dashbaordPage = () => {
  return (
    <div className='min-h-[calc(100vh-5.5rem-4rem)]'>
      <Dashboard />
    </div>
  )
}

export default dashbaordPage

export const metadata = {
  title: 'User Dashboard - GetMeAStork',
  description: 'User Dashboard - GetMeAStork'
}

