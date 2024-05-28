import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

const SkeletonVideo = () => {
  return (
    <div className='w-[100%] mx-[1rem]'>
        <SkeletonTheme className='text-[#343a40] selection:text-[#3c4147]'>
            <Skeleton className='h-[180px]'/>
            <div>
                
            </div>
        </SkeletonTheme>
    </div>
  )
}

export default SkeletonVideo