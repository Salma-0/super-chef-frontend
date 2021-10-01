import RecipeType from '../../types/Recipe'
import Link from 'next/link'
import Image from 'next/image'
import styles from '@styles/RecipesSection.module.css'
import AuthContext from 'context/AuthContext'
import {useContext} from 'react'
import {FaEdit} from 'react-icons/fa'

interface Props {
    recipe: RecipeType
}

function RecipeItem({recipe}: Props) {
    const {user}:any = useContext(AuthContext)

    return (
        <div className={styles.item}>
            <Link href={`/recipes/${recipe.slug}`}>
                <a>
                    <div className={styles.layerContainer}>
                        <Image src={recipe.image?.images[0]?.url} alt="" layout='fill' />
                        <div className={styles.title}>
                            <h4>{recipe.name +' '}  
                            {user && user.name === recipe.author.name && <Link href={`/recipes/edit/${recipe.slug}`}><a><FaEdit/></a></Link>}
                            </h4>
                        </div>
                    </div>
                </a>
            </Link>
        </div>
    )
}

export default RecipeItem
