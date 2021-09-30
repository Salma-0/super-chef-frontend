import React, { ReactElement } from 'react'
import RecipeItem from './RecipeItem'
import RecipeType from 'types/Recipe'
import styles from '@styles/RecipesSection.module.css'

interface Props {
  recipes: Array<RecipeType>    
}

function RecipesSection({ recipes, children }: Props): ReactElement {
    return (
        <section className={styles.recipesSection}>
            <h2><b>My Recipes</b></h2>
            <div className={styles.row}>
                {
                    recipes.map(rcp => (
                        <RecipeItem key={rcp._id} recipe={rcp}/>
                    ))
                }
            </div>
            {
                children
            }
        </section>
    )
}

export default RecipesSection
