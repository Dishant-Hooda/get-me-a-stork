import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className='bg-slate-900 text-white flex items-center justify-center px-4 h-16 w-full'>
        <p className='text-center w-full'>Copyright &copy; {currentYear} GetMeAStork - All right reserved</p>
    </footer>
  )
}

export default Footer
