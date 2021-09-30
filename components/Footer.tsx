import React, { ReactElement } from 'react'
import styles from '@styles/Footer.module.css'
import {FaGithub} from 'react-icons/fa'
interface Props {
    
}

//add my github link in here

function Footer({}: Props): ReactElement {
    return (
        <footer className={styles.footer}>
           <p> @Made by Salma Dev.</p>
           <a href="https://github.com/Salma-0" className='text-white'><FaGithub/></a>
        </footer>
    )
}

export default Footer
