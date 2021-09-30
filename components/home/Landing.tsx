import React, { ReactElement } from 'react'
import styles from '@styles/Landing.module.css'
import  Image from 'next/image'


interface Props {
    
}

function Landing({}: Props): ReactElement {
    return (
        <div className={styles.landing}>
            <div className={styles.content}>
                <h1 className='text-pink'>Ways to manage sugar</h1>
                <p>
                As we go about our hectic, busy days, it can be very easy to resort to a sugary snack midway through the afternoon to keep your energy levels elevated.
                </p>
                {/* <button>read more</button> */}
            </div>
            <div className={styles.row}>
                <div className={styles.box}>
                    <img src='/apple-sider.png' alt=''/>
                    <h4>Drink apple cider vingar</h4>
                    <p>
                    According to Sepel, adding one or two tablespoons of apple cider vinegar to a large bottle of water
                    </p>
                </div>
                <div className={styles.box}>
                    <img src='/meal.png' alt=''/>
                    <h4>Keep to regular mealtime</h4>
                    <p>
                    This may seem like an obvious suggestion, but eating your meals at regular, spaced out intervals
                    </p>
                </div>
                <div className={styles.box}>
                    <img src='/food.png' alt=''/>
                    <h4>Eat fruit in the morning</h4>
                    <p>
                    We’re told that we should eat five portions of fruits and vegetables a day in an effort to maintain a healthy lifestyle.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Landing
