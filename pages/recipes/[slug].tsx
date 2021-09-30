import React, { ReactElement } from 'react'
import Layout from '@components/Layout'
import styles from '@styles/Recipe.module.css'
import Image from 'next/image'
import User from '@components/recipe/User'
import 'react-tabs/style/react-tabs.css'
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs'
import RecipeType from '../../types/Recipe'

interface Props {
  recipe: RecipeType
}

const tabStyle = {
  width: '50%'
}

function RecipePage({recipe}: Props): ReactElement {
  
    return (
        <Layout title={recipe.name}>
            <div className={styles.container}>
                <div className={styles.intro}>
                   <div className={styles.img}><Image layout='fill' src={recipe.image.images[0].url} alt="" /></div>
                   <div className={styles.icons}>
                       <div className={styles.iconItem}>
                         <Image src='/stopwatch.png' alt='' width={70} height={70}/>
                         <div>{recipe.time}</div>
                       </div>
                       <div className={styles.iconItem}>
                         <Image src='/group.png' alt='' width={70} height={70}/>
                         <div>{recipe.quantity}</div>
                       </div>
                       <div className={styles.iconItem}>
                         <Image src='/dinner.png' alt='' width={70} height={70}/>
                         <div>{recipe.category.name}</div>
                       </div>
                   </div>
                </div>
                <User user={recipe.author}/>
          <div className={styles.tabs}>
            <Tabs>
              <TabList>
                <Tab style={tabStyle}><div className={styles.tab}><b>Ingredients</b></div></Tab>
                <Tab style={tabStyle}><div className={styles.tab}><b>Instructions</b></div></Tab>
              </TabList>
              <TabPanel>
                <div>
                  <ul>
                    {
                      recipe.ingredients.map(ingr => (
                        <li key={ingr._id}>{ingr.item}</li>
                      ))
                    }
                  </ul>
                </div>
              </TabPanel>
              <TabPanel>
                <div>
                  <ol>
                    {
                      recipe.instructions.map(inst=> (
                        <li key={inst._id}>{inst.item}</li>
                      ))
                    }
                  </ol>
                </div>
              </TabPanel>
            </Tabs>
          </div>

            </div>
        </Layout>
    )
}

export default  RecipePage

export async function getServerSideProps({params}){
  try {
    console.log(params.slug)
    const res = await fetch(process.env.API_URL + '/recipes/'+params.slug)
    const json = await res.json()

    return {
      props: {
        recipe: json
      }
    }
  } catch (err) {
    console.error(err)
    return {
      props: {
        notFound: true
      }
    }
  }
}
