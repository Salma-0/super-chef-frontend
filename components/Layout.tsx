import styles from '@styles/Layout.module.css'
import Head from 'next/head'
import {ReactChild, ReactChildren} from 'react'
import Header from './Header'
import Footer from './Footer'
import 'react-toastify/dist/ReactToastify.css';



interface Props {
    children: ReactChild[] | ReactChild | Element,
    keywords: string, 
    description: string,
    title: string
}

export default function  Layout({children,  title='Super Chef', keywords='recipes, cusine, food, dessert, cooking, chef', description='deliciouse recipes'}: Props){
    return (
       <div className={styles.container}>
           <Head>
               <title>{title}</title>
               <meta name="description" content={description} />
               <meta name='keywords' content={keywords}/>
               <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
           </Head>
           <Header/>
           <main className={styles.main}>
              {children}
           </main>
           <Footer/>
       </div>
    )
}


Layout.defaultValues = {
    title: 'SuperChef',
    keywords:'recipes, cusine, food, dessert, cooking, chef',
    description:'deliciouse recipes'
}
