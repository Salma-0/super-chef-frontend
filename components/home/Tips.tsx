import React, { ReactElement } from 'react'
import styles from '@styles/Home.module.css'
import Image from 'next/image'
interface Props {
    
}

function Tips({}: Props): ReactElement {
    return (
        <div className={styles.tips}>
            <div className={styles.grid}>
                {/* {<img src="/cherry.jpeg" alt="" />} */}
                <div className={styles.image}>
                    <Image src='/cherry.jpeg' alt='' layout='fill'/>
                </div>
                <div className={styles.text}>
                    <h4>Have a healthy afternoon snack</h4>
                    <p>
                        The majority of people in the working world are likely familiar with the mid-afternoon slump.
                    </p>
                </div>
                <div className={styles.image}>
                    <Image layout='fill' src="/carbs.jpeg" alt="" />
                </div>
                <div className={styles.text}>
                    <h4>Include lots of fiberr in your diet</h4>
                    <p>Fibre is known to help aid with digestion. However, that’s not its only benefit.</p>
                </div>
            </div>
        </div>
    )
}

export default Tips
