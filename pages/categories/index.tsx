import  { ReactElement } from 'react'
import Layout from '@components/Layout'
import Image from 'next/image'
import styles from '@styles/Categories.module.css'
import Link from 'next/link'
import ICategory from 'types/Category'
import axios from 'axios'
import {API_URL} from 'config/index'
import Error from 'next/error'
import {FaPlus} from 'react-icons/fa'

interface Props {
    categories: Array<ICategory>,
    errorCode?: number
}

function index({categories, errorCode}: Props): ReactElement {
    if(errorCode){
        return <Error statusCode={errorCode}/>
    }
    return (
        <Layout title='Categories'>
            <div className={styles.categories}>
                {
                    categories.map(cat => (
                        <div key={cat._id} className={styles.category}>
                            <div className={styles.imageWrapper}>
                                <Image className='rounded' src={cat.image.images[0].url} alt='' layout='fill' />
                            </div>
                            <Link href={`/categories/edit/${cat._id}`}><a>{cat.name}</a></Link>
                        </div>
                    ))
                }
            </div>
            <Link href='/categories/add'><a className={styles.add}><FaPlus/> New Category </a></Link>

        </Layout>
    )
}

export default index


export async function getServerSideProps(){
    try {
        const res = await axios.get(`${API_URL}/categories?limit=all`)
        
        return {
            props: {
                categories: res.data.categories
            }
        }
    } catch (err) {
        return {
            props: {
                errorCode: err.response.status
            }
        }
    }
}