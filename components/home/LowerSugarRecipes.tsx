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
                <Image height={317} width={373} src='/peaches.jpeg' alt='' />
                <Image height={317} width={373} src='/pancakes.jpeg' alt='' />
                <Image height={317} width={373} src='/berries.jpeg' alt='' />
                <Image height={317} width={373} src='/egg.jpeg' alt='' />
                <Image height={317} width={373} src='/cakes.jpeg' alt=''/>
                <Image height={317} width={373} src='/salmon.jpeg' alt='' />
            </div>
        </div>
    )
}

export default LowerSugarRecipes
