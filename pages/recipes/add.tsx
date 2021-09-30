import { ReactElement, useState, ChangeEvent, useEffect, FormEvent } from 'react'
import Layout from '@components/Layout'
import Container from '@components/Container'
import styles from '@styles/Add.module.css'
import ArrayInput from '@components/recipes/ArrayInput'
import axios from 'axios'
import parseCookie from '@helpers/parseCookie'
import {API_URL} from 'config/index'
import Error from 'next/error'
import CategoryType from 'types/Category'
import Modal from '@components/Modal'
import ImageUpload from '@components/ImageUpload'
import {toast, ToastContainer} from 'react-toastify'
import ImageType from 'types/Image'
import Image from 'next/image'
import router from 'next/router'

interface Props {
    errorCode?: number,
    categories: Array<CategoryType>,
    token?: string
}



function add({errorCode, categories, token}: Props): ReactElement {    

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: '',
        image: '',
        tags: [],
        quantity: '',
        time: '',
        ingredients: [],
        instructions: []
    });

    const [preview, setPreview] = useState<ImageType | undefined>(undefined)


    useEffect(() => {
        if(!preview) {
            const tmpImage = localStorage.getItem('tmpImage')
            if(tmpImage){
                let json = JSON.parse(tmpImage)
                setPreview({...json})
                setFormData({...formData, image: json._id})
            }
        }
    }, [])


    const [showModal, setShowModal] = useState<boolean>(false)

    const {name, tags, category, description, image, quantity, time, ingredients, instructions} = formData

    const onChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLSelectElement>) : void => setFormData({...formData, [e.target.name]: e.target.value}) 
    
    const uploadCallback = (file: File) : void => {
       let body = new FormData()
       body.append('image', file)
       axios.post(`${API_URL}/images`, body, {
           headers: {'x-auth-token': token}
       }).then(res => {
           console.log(res.data)
           setFormData({...formData, image: res.data._id})
           setPreview(res.data)
           localStorage.setItem('tmpImage', JSON.stringify(res.data))
       }).catch(err => {
           console.log(err)
           toast.error(err.response?.data.errors[0].msg || 'an error occured')
       })
    }

    const onSubmit = (ev: FormEvent<HTMLFormElement>): void => {
        ev.preventDefault()

        axios.post(`${API_URL}/recipes`, formData, {
            headers: {
                'x-auth-token': token
            }
        }).then(res => {
            toast.success(`${res.data.name} recipe has been created`)
            localStorage.removeItem('tmpImage')
        }).catch(err => {
            toast.error(err.response.data.errors[0].msg)
        })

    }

  
    
    if(errorCode) {
        return <Error statusCode={errorCode}/>
    }else{
        return (
            <Layout title='New Recipe'>
                <section className={styles.main}>
                <Container>
                    <h2>New Recipe</h2>
                    <hr />
                    {
                            preview && <div className={styles.preview}><Image src={preview.images[0].url} alt='' layout='fill'/></div>
                    }
                    <ToastContainer />
                    <form onSubmit={onSubmit}>
                        
                        <div>
                            <button onClick={e => setShowModal(true)} className='form-button' type='button'>Upload Image</button>
                        </div>
                        <Modal onClose={setShowModal} show={showModal} title='Upload Recipe Image'>
                            <ImageUpload callback={uploadCallback} />
                        </Modal>
                        <div className='form-group'>
                            <label htmlFor="name">Title:</label>
                            <input id='name' onChange={onChange} value={name} type="text" name='name' required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description:</label>
                            <textarea name="description" id="description" rows={5} onChange={onChange} value={description}></textarea>
                        </div>
                        <div className="form-group">
                            <select name="category" id="category" value={category} onChange={onChange}>
                                <option value="">select category</option>
                                {
                                    categories.map(cat => (
                                        <option key={cat._id} value={cat._id}>{cat.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className='form-group'>
                            <label htmlFor="quantity">Quantity:</label>
                            <input id='quantity' placeholder='.e.g 3 persons' onChange={onChange} value={quantity} type="text" name='quantity' required />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="time">Time:</label>
                            <input id='time' onChange={onChange} value={time} type="text" name='time' placeholder='e.g. 30 minutes' required />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="tags">Tags:</label>
                            
                        </div>
                        <div className='form-goup'>
                            <ArrayInput values={ingredients} name='ingredients' otherProps={formData} callback={setFormData}/>
                        </div>
                        <div className='form-goup'>
                            <ArrayInput values={instructions} name='instructions' otherProps={formData} callback={setFormData}/>
                        </div>
                        
                        <button className="form-button" type='submit'>save</button>
                    </form>
                </Container>
                </section>
            </Layout>
        )
    }

    
}


export async function getServerSideProps({req}){
    try {
        const {auth} = parseCookie(req)
        if(!auth){
            return {
                redirect: {
                    destination: '/login',
                    permanent: false
                }
            }
        }
        const {token} = JSON.parse(auth)
        if(!token) {
            return {
                redirect: {
                    destination: '/login',
                    permanent: false
                }
            }
        }
        const res = await axios(`${API_URL}/categories`)
        
        return {
            props: {
                categories: res.data.categories,
                token
            }
        }
    } catch (err) {
        console.log(err)
        return {
            props: {errorCode: 500}
        }
    }
}

export default add
