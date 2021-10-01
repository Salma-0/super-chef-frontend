import React, { ReactElement } from 'react'
import styles from '@styles/Home.module.css'
//import Link from 'next/link'
import Image from 'next/image'

interface Props {
    
}

function HealthPrecious({}: Props): ReactElement {
    return (
        <div className={styles.healthPrecious}>
           {/* { <img src="/health.jpeg" alt="" />} */}
           <div className={styles.image}>
               <Image src='/health.jpeg' alt='' layout='fill'/>
           </div>
            <div>
                <h2>Health is the most precious</h2>
                <p>
                While it is important to have naturally occurring sugars in your diet, many foods contain harmful added sugars that contain no nutritional value. 
                </p>
                <p>
                According to a study conducted by the University of Florida, the brain releases heroin-like chemicals called endogenous opioids when an individual indulges on sweet, salty or fatty foods.
                </p>
                <p>
                With that in mind, mastering control over your sugar cravings is evidently far easier said than done.
                </p>
                {/* <Link href='#'>
                    <a className={styles.readMore}>read more</a>
                </Link> */}
            </div>
        </div>
    )
}

export default HealthPrecious
