import  { ChangeEvent, FormEvent, ReactElement, useState, useRef } from 'react'
import Layout from '@components/Layout'
import {useRouter} from 'next/router'
import ArrayInput from '@components/recipes/ArrayInput'
import Container from '@components/Container'
import styles from '@styles/Add.module.css'
import {toast, ToastContainer} from 'react-toastify'
import axios from 'axios'
import {API_URL} from 'config/index'
import IRecipe from 'types/Recipe'
import ICategory from 'types/Category'
import Error from 'next/error'
import parseCookie from '@helpers/parseCookie'
import Image from 'next/image'
import Modal from '@components/Modal'
import ImageUpload from '@components/ImageUpload'

interface IProps {
    errorCode?: number,
    recipe: IRecipe,
    categories: Array<ICategory>,
    token?: string
}

function Edit({recipe, errorCode, categories, token}: IProps): ReactElement {

    if(errorCode){
        return <Error statusCode={errorCode}/>
    }

    const formRef = useRef<HTMLFormElement>(null)
    const router = useRouter()

    const [formData, setFormData] = useState({
        ...recipe,
         tags: typeof recipe.tags !== 'string' ? recipe.tags.join(',') : recipe.tags,
         image: recipe.image._id ,
         category: recipe.category._id
    })

    const [showModal , setShowModal] = useState<boolean>(false)

    const {name, tags, instructions, ingredients, description, time, quantity, image, category} = formData

    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const updateRecipe = (body: any) : Promise<void> => {
        return axios.put(`${API_URL}/recipes/${recipe._id}`, {...body, tags: tags.split(',')}, {
            headers: {
                'x-auth-token': token
            }
        }).then(res => {
            toast.success('The recipe data has been updated successfully')
        }).catch(err => {toast.error(err.response?.data?.errors[0]?.msg || 'An error occured')})
    }

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        updateRecipe(formData)
       
    }


    const imageUploadCallback = (file: File) : void => {
        let body = new FormData()
        body.append('image', file)
        axios.post(`${API_URL}/images`, body, {
            headers: {'x-auth-token': token}
        }).then(async res => {
            setFormData({...formData, image: res.data._id})
            await updateRecipe({...formData, image: res.data._id})
            setShowModal(false)
            router.reload()
            
        }).catch(err => toast.error(err.response.errors[0].msg))
    }

    return (
        <Layout title='Edit Recipe'>
            <section className={styles.main}>
                <ToastContainer/>
                <Container>
                    <h2>Edit / {recipe.name}</h2>
                    <hr />
                    <form ref={formRef} onSubmit={onSubmit}>
                        <div className={styles.preview}>
                            <Image src={recipe.image.images[0].url} alt='' layout='fill'/>
                        </div>
                        <button className='form-button' onClick={e => setShowModal(true)} type='button' >change image</button>
                        <Modal onClose={setShowModal} title='Upload Image' show={showModal}>
                            <ImageUpload callback={imageUploadCallback} />
                        </Modal>
                        <div className='form-group'>
                            <label htmlFor="name">Title:</label>
                            <input type="text" value={name} name='name' id='name' onChange={onChange} required/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor="description">Description:</label>
                            <textarea name="description" id="description" rows={5} value={description} onChange={onChange} required></textarea>
                        </div>
                        <div className='form-group'>
                            <select name="category" defaultValue={category} id="category" onChange={onChange} required>
                                <option value="">Select Category</option>
                                {
                                    categories && categories.map(cat => (
                                        <option key={cat._id} value={cat._id}>{cat.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className='form-group'>
                            <label htmlFor="time">Time:</label>
                            <input type="text" value={time} name='time' id='time' onChange={onChange} required/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor="quantity">Quantity:</label>
                            <input type="text" value={quantity} name='quantity' id='quantity' onChange={onChange} required/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor="tags">Tags:</label>
                            <input type="text" value={tags} name='tags' id='tags' onChange={onChange}/>
                            <small className='text-muted'>type tags saperated with ,</small>
                        </div>
                        <div className='form-group'>
                            <ArrayInput values={ingredients} name='ingredients' otherProps={formData} callback={setFormData}/>
                        </div>
                        <div className='form-group'>
                            <ArrayInput values={instructions} name='instructions' otherProps={formData} callback={setFormData}/>
                        </div>
                        <button className='form-button' type='submit'>Save</button>
                    </form>
                </Container>
            </section>
        </Layout>
    )
}

export default Edit

export async function getServerSideProps(context){
    const {id} = context.params;
    const {auth} = parseCookie(context.req)
    try {
        if(!auth) {
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

        const res = await axios.get(`${API_URL}/recipes/${id}`)
        const cats = await axios.get(`${API_URL}/categories`)

        return {
            props: {recipe: res.data, categories: cats.data.categories, token}
        }
    } catch (err) {
        return {
            props: {
                errorCode: err.response?.status || 500
            }
        }
    }
}
