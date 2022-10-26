import React, { ReactElement, useEffect, useState } from 'react'
import Layout from '@components/Layout'
import styles from '@styles/Recipe.module.css'
import Image from 'next/image'
import User from '@components/recipe/User'
import 'react-tabs/style/react-tabs.css'
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs'
import RecipeType from '../../types/Recipe'
import { GetServerSidePropsContext } from 'next'
import Error from 'next/error'
import {API_URL} from 'config/index'
import axios from 'axios'
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, WhatsappShareButton, WhatsappIcon } from 'next-share'


interface Props {
  recipe: RecipeType,
  errorCode?: number
}

const tabStyle = {
  width: '50%'
}



function RecipePage({ recipe, errorCode }: Props): ReactElement {

  const [fullUrl, setFullUrl] = useState('')

  useEffect(()=> {
     setFullUrl(`${window.location.protocol}//${window.location.host}${window.location.pathname}`)
  }, [fullUrl])

  if (errorCode) {
    return <Error statusCode={errorCode} />
  }

  return (
    <Layout title={recipe.name} 
    recipeData={{
      title: recipe.name, 
      description: recipe.description.substring(0, 100),
      url: fullUrl,
      image: recipe.image.images[0].url
    }}>
      <div className={styles.container}>
        <div className={styles.intro}>
          <div className={styles.img}><Image layout='fill' src={recipe.image.images[0].url} alt="" /></div>
          <div className={styles.icons}>
            <div className={styles.iconItem}>
              <div className={styles.iconWrapper}><Image src='/stopwatch.png' alt='' layout='fill' /></div>
              <div>{recipe.time}</div>
            </div>
            <div className={styles.iconItem}>
              <div className={styles.iconWrapper}><Image src='/group.png' alt='' layout='fill' /></div>
              <div>{recipe.quantity}</div>
            </div>
            <div className={styles.iconItem}>
              <div className={styles.iconWrapper}><Image src='/dinner.png' alt='' layout='fill' /></div>
              <div>{recipe.category.name}</div>
            </div>
          </div>
        </div>
        <User user={recipe.author} />
        <div>
          <p>{recipe.description}</p>
        </div>
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
                    recipe.instructions.map(inst => (
                      <li key={inst._id}>{inst.item}</li>
                    ))
                  }
                </ol>
              </div>
            </TabPanel>
          </Tabs>
        </div>
        </div>
        <div className={styles.shareButtons}>
          <FacebookShareButton
            url={fullUrl}
            title={recipe.name}
            hashtag={'#deliciouse'}
          >
            <FacebookIcon size={50} round />
          </FacebookShareButton>

          <TwitterShareButton
            url={fullUrl}
            title={recipe.name}
            hashtags={['deliciouse']}
          >
            <TwitterIcon size={50} round />
          </TwitterShareButton>

          <WhatsappShareButton
            url={fullUrl}
            title={recipe.name}
          >
            <WhatsappIcon size={50} round />
          </WhatsappShareButton>
        </div>
    </Layout>
  )
}

export default RecipePage

export async function getServerSideProps({ params }: GetServerSidePropsContext) {
  try {
    const slug = params?.slug
    const recipeRes = await axios.get(`${API_URL}/recipes/${slug}`)

    return {
      props: {
        recipe: recipeRes.data
      }
    }
  } catch (err: any) {
    return {
      props: { errorCode: err.response?.status || 500 }
    }
  }
}
