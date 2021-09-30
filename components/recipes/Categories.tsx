import React, { ReactElement } from 'react'
import styles from '@styles/Recipes.module.css'
import Link from 'next/link'
import Image from 'next/image'
import {FaArrowAltCircleRight, FaArrowAltCircleLeft} from 'react-icons/fa'
import CategoryType from '../../types/Category'


interface Props {
    categories: Array<CategoryType>
}

function Categories({categories}: Props): ReactElement {
  const moveLeft = () => {
     document.getElementById('categories')?.scrollBy({left: 70})

  }

  const moveRight = () => {
    document.getElementById('categories')?.scrollBy({left: -70})
 }
    return (
      <div className={styles.categoryContainer}>
        <button onClick={moveLeft}><FaArrowAltCircleLeft/></button>
          <div className={styles.categories} id='categories'>
             {
                categories && categories.map(cat => (
                   <div key={cat._id} className={styles.cat}>
                      <Link href={`/recipes?category=${cat._id}`}>
                         <a>
                            <Image src={cat.image.images[0].url} alt='' width={70} height={70} />
                            <small>{cat.name}</small>
                         </a>
                      </Link>
                   </div>
                ))
             }

          </div>
        <button onClick={moveRight}><FaArrowAltCircleRight/></button>
        </div>
    )
}

export default Categories


