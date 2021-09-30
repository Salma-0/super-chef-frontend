import { ChangeEvent, FormEvent, ReactElement, useState, useEffect } from 'react'
import Layout from '@components/Layout'
import parseCookies from '@helpers/parseCookie'
import Error from 'next/error'
import Container from '@components/Container'
import Modal from '@components/Modal'
import ImageUpload from '@components/ImageUpload'
import axios from 'axios'
import { API_URL } from '@config/index'
import {ToastContainer, toast} from 'react-toastify'
import {useRouter} from 'next/router'
import IImage from 'types/Image'
import Image from 'next/image'

interface Props {
    token?: string,
    errorCode?: number
}

function Add({token, errorCode}: Props): ReactElement {
    
    if(errorCode){
        return <Error statusCode={errorCode}/>
    }

   

    const router = useRouter()

    const [formData, setFormData] = useState({
        name: '',
        image: ''
    });
    const [showModal, setShowModal] = useState<boolean>(false)
    const [preview, setPreview] = useState<IImage | null>(null)
   
    const onChange = (ev: ChangeEvent<HTMLInputElement>) => setFormData({...formData, [ev.target.name]: ev.target.value})


    useEffect(()=> {
        let imageStr = localStorage.getItem('tmpImage')
        if(imageStr){
            let image = JSON.parse(imageStr)
            setPreview({...image})
            setFormData({...formData, image: image._id})
        }
    }, [])

    const onSubmit = (ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault()

        axios.post(`${API_URL}/categories`, formData, {
            headers: {'x-auth-token': token}
        }).then(res => {
            toast.success(`Category ${res.data.name} has been created`)
            
            if(localStorage.getItem('tmpImage')){
                localStorage.removeItem('tmpImage')
            }
        }).catch(err => {
            if(err.response.status === 401) router.push('/login')
            toast.error(err.response.data.errors[0].msg)
        })
    }

    const imageUploadCallback = (file: File) => {
        let body = new FormData()
        body.append('image', file)
        axios.post(`${API_URL}/images`, body, {
            headers: {
                'x-auth-token': token
            }
        }).then(res => {
           setPreview(res.data)
           setFormData({...formData, image: res.data._id})
           localStorage.setItem('tmpImage', JSON.stringify(res.data))
           setShowModal(false)
        }).catch(err => {
            if(err.response.status === 401) router.push('/login')
            toast.error(err.response.data.errors[0].msg)
        })
    }

    return (
        <Layout title='Add Category'>
            <Container>
                <ToastContainer />
                <h3>Categories / Add</h3>
                <br />
                <button className='form-button' type='button' onClick={e => setShowModal(true)}>Upload Image</button>
                <br /><br />
                <Modal title='Upload Category Image' onClose={setShowModal} show={showModal}>
                    <ImageUpload callback={imageUploadCallback}/>
                </Modal>
                <form onSubmit={onSubmit}>
                    {preview && (
                        <div className='cat-preview-wrapper'>
                            <Image layout='fill' src={preview.images[0].url} alt=''/>
                        </div>
                    )}
                    <div className='form-group'> 
                        <label htmlFor="name">Category name</label>
                        <input type="text" name='name' id='name' onChange={onChange} value={formData.name} />
                    </div>
                    <button className='form-button' type='submit'>Save</button>
                </form>
            </Container>
        </Layout>
    )
}

export default Add


export function getServerSideProps({req}) {
    try {
       const {auth} = parseCookies(req)
       if(!auth){
           return {
               redirect: {
                   destination: '/login',
                   permanent: false
               }
           }
       }
       const {token} = JSON.parse(auth) 
       
       if(!token){
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
       }
       return {
           props: {
               token
           }
       }
    } catch (err) {
        return {
            props: {
                errorCode: 500
            }
        }
    }
}
