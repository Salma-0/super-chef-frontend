import { createContext, useEffect, useState } from "react";
import {useRouter} from 'next/router'
import axios from 'axios'
import IUser from 'types/User'


// 1. create context
const AuthContext = createContext()


// 2. create provider

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState<IUser | null>(null)
    const [error, setError] = useState<string | null>(null)

    const router = useRouter()

    //check if user is logged

    const checkUserLoggedIn = () => {
        axios.get('/api/user')
        .then(res => {
            setUser(res.data)
        }).catch(err => {
           const e = err.response?.data?.errors[0]
           setError(e ? e.msg : 'An error occured')
           setError(null)
        })

    }

    useEffect(()=> {
        checkUserLoggedIn()
    }, [])



   //login

   const login = (usr) => {
       axios.post('/api/login', usr)
       .then(res => {
           router.push('/dashboard')
           
        })
       .catch(err => {
           console.log(err)
           const e = err.response.data.errors[0]
           setError(e.msg)
           setError(null)
       })
   }

   const logout = () => {
       axios.get('/api/logout')
       .then(() => {
           setUser(null)
           if(router.pathname === '/dashboard'){
               router.push('/')
           }
       })
       .catch(err => {
           setError(err?.response?.data?.errors[0].msg || 'An error occured')
           setError(null)
       })
   }

   const register = (body) => {
       axios.post('/api/register', body)
       .then(() => {
           router.push('/dashboard')
       }).catch(err => {
           setError(err.response?.data?.errors[0]?.msg)
           setError(null)
        })
   }

   return (
       <AuthContext.Provider value={{user, error, login, logout, setUser, register}}>
           {children}
       </AuthContext.Provider>
   )
}

export default AuthContext