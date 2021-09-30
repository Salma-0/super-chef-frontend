import React, { ReactElement } from 'react'
import styles from '@styles/Home.module.css'
import Link from 'next/link'

interface Props {

    
}

function NewIdeas({}: Props): ReactElement {
    return (
        <div className={styles.newIdeas}>
            <h2>New Ideas To New Life</h2>
            <p>
                While it is important to have naturally occurring sugars in your diet, many foods contain harmful added sugars that contain no nutritional value.  According to a study conducted by the University of Florida, the brain releases heroin-like chemicals called endogenous opioids when an individual indulges on sweet, salty or fatty foods.
            </p>
            <div className={styles.grid}>
                <div className={styles.col}>
                    <h4>Eat plenty of protein</h4>
                    <p>
                        Eating a healthy dose of protein, such as red meat, organic chicken and fish, in addition to healthy fats including avocado and coconut oil can help keep
                    </p>
                </div>
                <div className={styles.col}>
                    <h4>Eat wholesome snacks</h4>
                    <p>One of the reasons why so many people end up eating unhealthy snacks is simply because they don’t consider taking the time to source healthier alternatives. </p>
                </div>
                <div className={styles.col}>
                    <h4>Consume magnesium</h4>
                    <p>Sepel is a strong proponent of magnesium, personally taking approximately 500mg a night to help moderate her blood glucose levels. Magnesium can also be naturally found </p>
                </div>
                <div className={styles.col}>
                    <h4>Practise mindfulness</h4>
                    <p>Sugar cravings are often connected with overall stress levels, which is why practising mindfulness could prove extremely beneficial.
                        Take some time out of
                    </p>
                </div>
            </div>
            {/* <Link href='#'>
                <a className={styles.readMore}>read more</a>
            </Link> */}
        </div>
    )
}

export default NewIdeas
