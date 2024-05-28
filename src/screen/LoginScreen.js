import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../redux/actions/auth.action'
import {useNavigate} from 'react-router-dom'
const LoginScreen = () => {
    
    const dispatch = useDispatch()
    const accessToken = useSelector(state=>state.auth.accessToken)
    const handleLogin = () => {
        dispatch(login())
    }
    // const navigate = useNavigate()
    // useEffect(()=>{
    //     if(accessToken) {
    //         navigate('/')
    //     }
    // },[accessToken,navigate])

  return (
    <div className='h-[100vh] items-center grid justify-center'>
        <div className='bg-black p-8 mx-[1rem] rounded-xl flex flex-col items-center w-[400px]'>
            <img className='w-[130px] h-[130px] object-contain' src={require('../assets/video.png')} alt=''/>
            <button onClick={handleLogin} className='border-2 rounded bg-gray-600 border-gray-600 py-3 px-3 mb-4 text-white'>Login with google</button>
            <p className='text-white'>This Project is made by Phi</p>
        </div>
    </div>
  )
}

export default LoginScreen