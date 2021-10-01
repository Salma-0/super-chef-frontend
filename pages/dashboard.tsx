import {useEffect, useState, useContext} from 'react'
import {GetServerSidePropsContext, NextPage} from 'next'
import Layout from '@components/Layout'
import axios from 'axios'
import UserType from 'types/User'
import styles from '@styles/Dashboard.module.css'
import Image from 'next/image'
import {FaFacebookF, FaInstagram, FaTwitter, FaImage, FaPlus} from 'react-icons/fa'
import parseCookie from 'helpers/parseCookie'
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import {useRouter} from 'next/router'
import Modal from '@components/Modal'
import ImageUpload from '@components/ImageUpload'
import AuthContext from 'context/AuthContext'
import RecipesSection from '@components/profile/RecipesSection'
import { API_URL } from '@config/index'
import RecipeType from 'types/Recipe'




interface Props {
   user: UserType,
   token: string,
   recipes: Array<RecipeType>

}

const Dashboard: NextPage<Props> = ({user, token, recipes})=>{

    const router = useRouter()
    const [formData, setFormData] = useState({
      ...user
    })

    const {setUser} = useContext(AuthContext)

    useEffect(() => {
       setUser(user)
    }, [])

    const [showModal, setShowModal] = useState(false)

    const onChange = e => {
        let name = e.target.name;
        
        if(name.includes('.')){
            let outer = name.split('.')[0]
            let inner = name.split('.')[1]
            let outerObj = formData[outer]
            setFormData({...formData, [outer]: {...outerObj, [inner]: e.target.value}})
        }else{
            setFormData({...formData, [name]: e.target.value})
        }
    }

   

    const onSubmit = e => {
        e.preventDefault()
        axios.put(`${process.env.NEXT_PUBLIC_FRONT_URL}/api/update-user`, formData, {
            headers: {'Content-Type': 'application/json'}
        }).then(res => {
            toast.success('Your Profile has been updated')
        }).catch(err => {
            if(err.response.status === 401) router.push('/login')

            toast.error(err.response.data.errors[0].msg)
        })
    }

    const onUpload = (file) => {
        const data = new FormData()
        data.append('image', file)
        axios.put(`${API_URL}/users/upload`, data, {
            headers: {
                'x-auth-token': token
            }
        })
        .then(res => {
           axios.get(`${process.env.NEXT_PUBLIC_FRONT_URL}/api/user`)
           .then(usr => {setShowModal(false), router.reload()})
           .catch(e => {throw e})
        }).catch(err => {
            toast.error(err.response.data.errors[0].msg)
        })
    }

    const onAdd = () => router.push('/recipes/add')

   
        return (
            <Layout title={user.name}>
               <section className={styles.main}>
                   <div className={styles.userInfo}>
                       <div className={styles.avatar}>
                           <Image src={user.avatar?.images[0].url || '/default-avatar.png'} alt='' layout='fill' className='rounded' />
                           <div className={styles.layer}>
                               <button type='button' onClick={e => setShowModal(true)}><FaImage /></button>
                           </div>
                       </div>
                       <div className={styles.name}><h4>{user.name}</h4></div>
                       <div>
                           <form onSubmit={onSubmit}>
                               <ToastContainer />
                               <div className='form-group'>
                                   <label htmlFor="bio">Bio</label>
                                   <input className='form-control' value={formData.bio} type="text" onChange={onChange} name='bio' id='bio' />
                               </div>
                               <div className='form-group'>
                                   <label htmlFor="description">Description</label>
                                   <textarea className='form-control' value={formData.description} onChange={onChange} name="description" id="description" rows="5"></textarea>
                               </div>
                               <div className='form-group'>
                                   <label className='facebook' htmlFor="facebook"><FaFacebookF /></label>
                                   <input className='form-control' type="text" value={formData.social?.facebook} onChange={onChange} name='social.facebook' id='facebook' />
                               </div>
                               <div className='form-group'>
                                   <label className='twitter'  htmlFor="twitter"><FaTwitter/></label>
                                   <input className='form-control' value={formData.social?.twitter} onChange={onChange} type="text" name='social.twitter' id='twitter' />
                               </div>
                               <div className='form-group'>
                                   <label className='instagram'  htmlFor="instagram"><FaInstagram /></label>
                                   <input className='form-control' value={formData.social?.instagram} onChange={onChange} type="text" name='social.instagram' id='instargam' />
                               </div>
                               <button type='submit' className='form-button'>Save</button>
                           </form>
                           <Modal show={showModal} onClose={setShowModal} title='Upload Avatar'>
                               <ImageUpload callback={onUpload}/>
                           </Modal>
                       </div>
                   </div>
                   <RecipesSection recipes={recipes}>
                       <button onClick={onAdd}><FaPlus/> New Recipe</button>
                   </RecipesSection>
                   
               </section>
            </Layout>
        )
    }


export async function getServerSideProps({ req }: GetServerSidePropsContext) {
    try {
        const {auth} = parseCookie(req)
        const json = JSON.parse(auth)
        const { user, token } = json

        if (!user || !token) {
            return {
                redirect: {
                    destination: '/login',
                    permanent: false
                }
            }
        } else {
            const res = await axios.get(API_URL+'/recipes/me', {
                headers: {
                    'x-auth-token': token
                }
            })


            return {
                props: {
                    user: user,
                    token,
                    recipes: res.data.recipes
                }
            }
        }
    } catch (err) {
        console.log('CLIENT', err)
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }

}

export default Dashboard;


