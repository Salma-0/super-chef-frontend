import Layout from '@components/Layout'
import styles from '@styles/Profile.module.css'
import {FaEdit, FaFacebookF, FaTwitter, FaInstagram, FaImage} from 'react-icons/fa'
import Image from 'next/image'
import RecipeType from 'types/Recipe'
import RecipesSection from '@components/profile/RecipesSection'
import axios from 'axios'
import UserType from 'types/User'
import {API_URL} from 'config/index'
import { GetServerSideProps} from 'next'
import Error from 'next/error'

interface Props {
    recipes: Array<RecipeType> ,
    user: UserType,
    errorCode?: number
}

const ProfilePage = ({errorCode, user, recipes}: Props) => {

    if(errorCode){
        return <Error statusCode={errorCode}/>
    }

    return (
        <Layout title='profile'>
            <section className={styles.cardSection}>
                <div className={styles.card}>
                    <div className={styles.name}>
                        <div className={styles.imgContainer}>
                            <Image src={user.avatar?.images[0].url || '/default-avatar.png'} alt="" layout='fill' />
                        </div>

                        <h2>I'm {user.name}</h2>
                    </div>
                    <div className={styles.text}>
                        <button className={styles.edit}><FaEdit /></button>
                        <p className={styles.bio}>
                            <b>{user.bio}</b>
                        </p>
                        <p className={styles.description}>
                           {user.description}
                        </p>
                        <div className={styles.socialBox}>
                            <div>
                                <a href={user.social?.facebook || ''}><FaFacebookF /></a>
                            </div>
                            <div>
                                <a href={user.social?.twitter || ''}><FaTwitter/></a>
                            </div>
                            <div>
                                <a href={user.social?.instagram || ''}><FaInstagram /></a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <RecipesSection recipes={recipes}/>
        </Layout>
    )
}

export default ProfilePage

export const getServerSideProps : GetServerSideProps = async (context) => {
    try {
        const res = await axios.get(`${API_URL}/users/${context.params?.slug}`)
        return {
            props: {
                user: res.data.user,
                recipes: res.data.recipes
            }
        }
    } catch (err) {
        console.log(err)
        return {
            props: {
                errorCode: err.response?.status || 500
            }
        }
    }
}
