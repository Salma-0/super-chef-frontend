import { ChangeEvent, FormEvent, ReactElement, useState } from 'react'
import Layout from '@components/Layout'
import styles from '@styles/Contact.module.css'
import axios from 'axios'
import {API_URL} from 'config/index'
import { toast, ToastContainer } from 'react-toastify'


interface Props {
    
}

function contact({}: Props): ReactElement {

    const [formData, setFormData] = useState({name: '', email: '', message: ''})

    const onChange = (ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=> setFormData({...formData, [ev.target.name]: ev.target.value})

    const {name, email, message } = formData
    const onSubmit = (ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault()

        axios.post(`${API_URL}/contact`, formData)
        .then(res => {
            console.log(res.data)
            toast.success('Your message has been sent')
            setFormData({...formData, name: '', email: '', message: ''})
        }).catch(err => toast.error(err.response?.data?.errors[0]?.msg || 'An error occured'))
    }
    
    return (
        <Layout title='Contact us'>
            <section className={styles.contact}>
                <ToastContainer />
                <h3>CONTACT US</h3>
                <form onSubmit={onSubmit}>
                    <input type="text" placeholder='Enter your Name' name='name' value={name} onChange={onChange} required />
                    <input type="email" placeholder='Enter a valid e-mail address' name='email' value={email} onChange={onChange} required />
                    <textarea name="message" id="message" placeholder='Enter your message' value={message} onChange={onChange} rows={6}></textarea>
                    <input type="submit" value='Submit' />
                </form>
            </section>

        </Layout>
    )
}

export default contact
