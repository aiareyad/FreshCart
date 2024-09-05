import React from 'react'
import style from './NotFound.module.scss'
import error from '../../Assets/imgs/404.jpg'
import { Helmet } from 'react-helmet'

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>404 Not Found</title>
      </Helmet>
    <div className='text-center py-5'>
      <img src={error} alt="not found" />
    </div>
    </>
  )
}
