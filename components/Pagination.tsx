import { ReactElement } from 'react'
import styles from '@styles/Pagination.module.css'
import Link from 'next/link'
import {useRouter} from 'next/router'
import getURL from '@helpers/getURL'

interface Props {
    page: number,
    pageSize: number,
    total: number
}

function Pagination({page, pageSize, total}: Props): ReactElement {
    const router = useRouter()
    console.log(router.pathname)
    const numberOfPages = Math.ceil(total / pageSize)

    const onPrev = () => {
        if(page >= 1){
            router.push(`${router.pathname}${getURL(router.query, page-1)}`)
        }
    }

    const onNext = () => {
        if(page < numberOfPages){
            router.push(`${router.pathname}${getURL(router.query, page+1)}`)
        }
    }

    return (
        <div className={styles.pagination}>
            <button onClick={onPrev} type='button'>prev</button>

            {
                Array(numberOfPages).fill(0).map((itm, index)=> (
                    <Link key={`page-${index}`} href={router.pathname+getURL(router.query, index+1)}><a className={(index+1)=== page ? styles.activeLink : ''}>{index+1}</a></Link> 
                ))
            }
            
           <button onClick={onNext} type='button'>next</button>

        </div>
    )
}

export default Pagination
