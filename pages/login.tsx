
import Layout from '@components/Layout'
import styles from '@styles/Login.module.css'
import Link from 'next/link'
import Image from 'next/image'
import {useState, useContext, useEffect, ChangeEvent, FormEvent} from 'react'
import AuthContext from 'context/AuthContext'
import {toast, ToastContainer} from 'react-toastify'


interface Props {

}

export default function LoginPage({}: Props){
  
    const {login, error} = useContext(AuthContext)
    const [formData, setFormData] = useState({email: '', password: ''}) 

    const {email, password} = formData

    const onChange = (e: ChangeEvent<HTMLInputElement>) => setFormData({...formData, [e.target.name]: e.target.value})

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        login(formData)
    }

   
    useEffect(()=> {
        if(error){
            toast.error(error)
        }
    }, [error])

    return (
        <Layout title='Login'>
            <section className={styles.loginSection}>
                <div className={styles.card}>
                    <div className={styles.leftContainer}>
                        <Image src='/fire.jpeg' alt='' layout='fill'/>
                    </div>
                    <div className={styles.formContainer}>
                        <h3>Login</h3>
                        <form onSubmit={onSubmit}>
                            <ToastContainer />
                            <div><input type="email" name='email' value={email} onChange={onChange} placeholder='Enter Your Email' /></div>
                            <div><input type="password" name='password' value={password} onChange={onChange} placeholder='Enter Your Password' /></div>
                            <div>
                                <label htmlFor="remember">
                                    <input type="checkbox" name="" id="remember" />  Remember me
                                </label>
                            </div>
                            <button type='submit' className={styles.login}>Login</button>


                            <Link href="/signup">
                                <a>Don&apos;t have an account?</a>
                            </Link>

                            <Link href=''>
                                <a>
                                    Forgot password?
                                </a>
                            </Link>
                        </form>
                    </div>
                </div>
            </section>
        </Layout>
    )

}

