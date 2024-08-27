import React from 'react'
import style from './Loading.module.css'
import { BallTriangle} from 'react-loader-spinner'
export default function Loading() {
  return <>
  <div className='h-screen'>
  <BallTriangle
  height={100}
  width={100}
  radius={5}
  color="#4fa94d"
  ariaLabel="ball-triangle-loading"
  wrapperStyle={{}}
  wrapperClass="flex justify-center items-center w-full h-[80%]"
  visible={true}
  />
  </div>
  </>
}
