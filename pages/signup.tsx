import {ChangeEvent, useContext, useState, FormEvent} from 'react'
import Layout from '@components/Layout'
import styles from '@styles/Login.module.css'
import Link from 'next/link'
import Image from 'next/image'
import AuthContext from 'context/AuthContext'
import { toast, ToastContainer } from 'react-toastify'

interface Props {

}

export default function SignupPage({}: Props){
    const {register} = useContext(AuthContext)

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirm: ''
    })

    const {name, email, password, passwordConfirm} = formData

    const onChange = (ev: ChangeEvent<HTMLInputElement>) => setFormData({...formData, [ev.target.name]: ev.target.value})

    const onSubmit = (ev: FormEvent<HTMLFormElement>)=> {
        ev.preventDefault()

        if(passwordConfirm !== password){
            toast.error('Passwords do not match!')
            return;
        }

        register(formData)
    }
    
    return (
        <Layout title='Login'>
            <section className={styles.loginSection}>
                <ToastContainer />
                <div className={`${styles.card} ${styles.signup}`}>
                    <div className={styles.leftContainer}>
                        <Image src='/kandies.jpg' alt='' layout='fill'/>
                    </div>
                    <div className={styles.formContainer}>
                        <h3>Welcome</h3>
                        <form onSubmit={onSubmit}>
                            <div><input type="text" placeholder='Enter Username' name='name' value={name} onChange={onChange} required /></div>
                            <div><input type="email" placeholder='Enter your E-mail' name='email' value={email} onChange={onChange} required/></div>
                            <div><input type="password" placeholder='Enter password' name='password' value={password} onChange={onChange} required/></div>
                            <div><input type="password" placeholder='Enter password again' name='passwordConfirm' value={passwordConfirm} onChange={onChange} required/></div>
                            <button type='submit' className={styles.login}>Signup</button>
                            <Link href="/login">
                                <a>Do you have an account?</a>
                            </Link>

                        </form>
                    </div>
                </div>
            </section>
        </Layout>
    )

}

