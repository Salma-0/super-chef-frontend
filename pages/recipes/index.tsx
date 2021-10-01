import React, { ChangeEvent, ReactElement } from 'react'
import Layout from '@components/Layout'
import {FiSearch} from 'react-icons/fi'
import styles from '@styles/Recipes.module.css'
import RecipeItem from '@components/recipes/Item'
import Categories from '@components/recipes/Categories'
import CategoryType from '../../types/Category'
import RecipeType from '../../types/Recipe'
import getURL  from '../../helpers/getURL'
import Pagination from '@components/Pagination'
import {useRouter} from 'next/router'
import Error from 'next/error'
import axios from 'axios'
import { API_URL } from '@config/index'
import { GetServerSidePropsContext } from 'next'

interface Props {
    categories: Array<CategoryType>,
    recipes: Array<RecipeType>,
    page: number,
    total: number,
    errorCode?: number

}



export default function Recipes({categories, recipes, page, total, errorCode}: Props): ReactElement {

    const router = useRouter()

    if(errorCode){
        return <Error statusCode={errorCode} />
    }

    const onSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        const keyword = event.target.value;
        if(keyword === ''){
           router.push('/recipes')
        }else{
            router.push(`/recipes?keyword=${keyword}`)

        }

    }

    return (
        <Layout title='Recipes'>
           <div className={styles.main}>
               <div className={styles.searchbox}>
                   <input type="search" placeholder='search' onChange={onSearchChange} />
                   <span><FiSearch /></span>
               </div>
               <Categories categories={categories}/>
               <section className={styles.recipesList}>
                   {
                       recipes.length === 0 && (<span className='text-muted align-center'>No Results</span>)
                   }
                   {
                       recipes && recipes.map(rcp => (
                           <RecipeItem recipe={rcp} key={rcp._id}/>
                       ))
                   }
               </section> 
               <div className={styles.paginationWrapper}>
                   <Pagination page={page} total={total} pageSize={20}/> 
                </div>     
           </div>
        </Layout>
    )
}




export async function getServerSideProps({ query }: GetServerSidePropsContext) {
    try {
        const categoriesRes = await axios.get(`${API_URL}/categories?page=1&limit=10`)
        const url = `${API_URL}/recipes${getURL(query)}`
        const recipesRes = await axios.get(url)

        return {
            props: {
                categories: categoriesRes.data.categories,
                recipes: recipesRes.data.recipes,
                page: recipesRes.data.page,
                total: recipesRes.data.total
            }
        }
    } catch (err: any) {
        return {
            props: { errorCode: err.response?.status || 500 }
        }
    }
}
