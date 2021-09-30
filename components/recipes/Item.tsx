import React, { ReactElement } from 'react'
import Link from 'next/link'
import styles from '@styles/Item.module.css'
import RecipeType from 'types/Recipe'


interface Props {
    recipe: RecipeType
}




function Item({recipe}: Props): ReactElement {
    return (
    <div className={styles.item}>
        <img src={recipe.image.images[0].url} alt="" />
        <div>
            <h4><Link href={`/recipes/${recipe.slug}`}><a>{recipe.name}</a></Link></h4>
            <p>
               {recipe.description.substr(0, 120)+'...'}
            </p>
        </div>
    </div>
    )
}

export default Item
