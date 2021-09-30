import React, { ReactElement } from 'react'
import styles from '@styles/Home.module.css'
import Image from 'next/image'

interface Props {
    
}

function LowerSugarRecipes({}: Props): ReactElement {
    return (
        <div className={styles.lowerSugar}>
            <h2>Lower sugar recipes</h2>
            <p>As we go about our hecti, busy days, it can be very easy to resort to a sugary snack midway through the afternoon to keep your energy levels elevated</p>
            <div className={styles.imagesGrid}>
                <img src='/peaches.jpeg' alt='' />
                <img src='/pancakes.jpeg' alt='' />
                <img src='/berries.jpeg' alt='' />
                <img src='/egg.jpeg' alt='' />
                <img src='/cakes.jpeg' alt=''/>
                <img src='/salmon.jpeg' alt='' />
            </div>
        </div>
    )
}

export default LowerSugarRecipes
