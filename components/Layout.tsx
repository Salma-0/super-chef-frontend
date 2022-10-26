import styles from '@styles/Layout.module.css'
import Head from 'next/head'
import {ReactChild, ReactChildren} from 'react'
import Header from './Header'
import Footer from './Footer'
import 'react-toastify/dist/ReactToastify.css';

interface RecipeTags {
    title: string,
    description: string,
    image: string,
    url: string
}


interface Props {
    children: ReactChild[] | ReactChild | Element,
    keywords: string,
    description: string,
    title: string,
    recipeData: RecipeTags | null
}



export default function Layout({ children, title = 'Super Chef', keywords = 'recipes, cusine, food, dessert, cooking, chef', description = 'deliciouse recipes', recipeData = null }: Props) {
    return (
        <div className={styles.container}>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta name='keywords' content={keywords} />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />

                {recipeData && (
                    <>
                        <meta name="og:title" content={recipeData.title} />
                        <meta name="og:description" content={recipeData.description} />
                        <meta name="og:url" content={recipeData.url} />
                        <meta name="og:image" content={recipeData.image} />
                    </>
                )}
            </Head>
            <Header />
            <main className={styles.main}>
                {children}

            </main>
            <Footer />
        </div>
    )
}


Layout.defaultProps = {
    title: 'SuperChef',
    keywords: 'recipes, cusine, food, dessert, cooking, chef',
    description: 'deliciouse recipes',
    recipeData: null
}
