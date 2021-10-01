import { ChangeEvent, ReactElement, useState, FormEvent } from 'react'
import Layout from '@components/Layout'
import Container from '@components/Container'
import Modal from '@components/Modal'
import ImageUpload from '@components/ImageUpload'
import Image from 'next/image'
import ICategory from 'types/Category'
import axios from 'axios'
import parseCookies from '@helpers/parseCookie'
import {GetServerSidePropsContext} from 'next'
import {API_URL} from '@config/index'
import Error from 'next/error'
import { toast, ToastContainer } from 'react-toastify'
import {useRouter} from 'next/router'
import Link from 'next/link'

interface Props {
    category: ICategory,
    token?: string,
    errorCode?: number
}

function Edit({category, token, errorCode}: Props): ReactElement {
    const router = useRouter()

    const [showModal, setShowModal] = useState<boolean>(false)
    const [formData, setFormData] = useState({...category, image: category.image._id}) 

    if(errorCode) {
        return <Error statusCode={errorCode}/>
    }
    
    
    
    const onChange = (ev: ChangeEvent<HTMLInputElement>)=> setFormData({...formData, [ev.target.name]: ev.target.value})

    const updateCategory = (body: {name: string, image: string}): Promise<void> => {
        return axios.put(`${API_URL}/categories/${category._id}`, body, {
            headers: {'x-auth-token': token}
        }).then(res => {
           toast.success('The category has been updated')
        }).catch(err => {
            if(err.response.status === 401) {router.push('/login')}
            else toast.error(err.response.data.errors[0].msg)
        })
    }

    const onSubmit = (ev: FormEvent<HTMLFormElement>)=> {
        ev.preventDefault()
        updateCategory(formData)
        
    }

    const imageUploadCallback = (file: File) : void => {
        let body = new FormData()
        body.append('image', file)
        axios.post(`${API_URL}/images`, body, {
            headers: {'x-auth-token': token}
        }).then((res) => {
            setFormData({...formData, image: res.data._id})
            updateCategory({...formData, image: res.data._id})
            setShowModal(false)
            router.reload()
        }).catch(err => {
            if(err.response.status === 401) {router.push('/login')}
            else toast.error(err.response.data.errors[0].msg)
        })
    }

    return (
        <Layout title='Add Category'>
            <Container>
                <h3><Link href='/categories'>Categories</Link> / Edit</h3>
                <br /><br />
                <ToastContainer />
                <div className='cat-preview-wrapper'>
                    <Image className='rounded' src={category.image.images[0].url} alt='' layout='fill'/>
                </div>
                <br />
                <button type='button' onClick={e => setShowModal(true)} className='form-button'>upload image</button>
                <Modal title='Upload Category' onClose={()=> setShowModal(false)} show={showModal}>
                    <ImageUpload  callback={imageUploadCallback}/>
                </Modal>
                <form onSubmit={onSubmit}>
                    <div className='form-group'>
                        <label htmlFor="name">Category Name</label>
                        <input type="text" name='name' value={formData.name} onChange={onChange} required/>
                    </div>
                    <button className='form-button' type='submit'>Save</button>
                </form>
            </Container>
            
        </Layout>
    )
}

export default Edit

export async function getServerSideProps({req, params}: GetServerSidePropsContext){
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

        const id = params?.id
        
        const res = await axios.get(`${API_URL}/categories/${id}`)
        
        return {
            props: {
                category: res.data,
                token
            }
        }
    } catch (err: any) {
        const code = err.response?.status || 500
        return {
            props: {
                errorCode: code
            }
        }
    }
}
