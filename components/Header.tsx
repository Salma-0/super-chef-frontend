import React, { ReactElement, useState, useContext } from 'react'
import styles from '@styles/Header.module.css'
import Link from 'next/link'
import {FaBars} from 'react-icons/fa'
import AuthContext from 'context/AuthContext'
import Image from 'next/image'

interface Props {
    
}

function Header({}: Props): ReactElement {


    const {user, logout}:any = useContext(AuthContext)
    const [showSmallNav, setShowSmallNav] = useState(false)

    const toggleNav = () => setShowSmallNav(!showSmallNav)

    return (
        <nav>
            <div className={styles.header}>
                <Link href='/'>
                    <a>
                        <div className={styles.logo}>
                            <Image layout='fill' src='/recipes-logo.png' alt='' />
                        </div>
                    </a>
                </Link>

                <div className={styles.toggle}>
                    <button onClick={toggleNav}><FaBars /></button>
                </div>



                <ul className={styles.bigNav}>
                    <li><Link href='/'><a>Home</a></Link></li>
                   {!user ? (
                    <li><Link href='/login'><a>Login</a></Link></li>
                   ) : (
                       <li><a onClick={logout}>Logout</a></li>
                   )
                   }
                    <li><Link href='/recipes'><a>Recipes</a></Link></li>
                    {user && <li><Link href='/dashboard'><a>Dashboard</a></Link></li>}
                    <li><Link href='/contact'><a>Contact</a></Link></li>

                </ul>
            </div>
            <div className='fadein'>
                {showSmallNav &&<ul className={styles.smallNav}>
                    <li><Link href='/'><a>Home</a></Link></li>
                    {!user ? (
                    <li><Link href='/login'><a>Login</a></Link></li>
                    ): (
                        <li><a onClick={logout}>Logout</a></li>
                    )}
                    <li><Link href='/recipes'><a>Recipes</a></Link></li>
                    {user && <li><Link href='/dashboard'><a>Dashboard</a></Link></li>}
                    <li><Link href='/contact'><a>Contact</a></Link></li>
                </ul>
                }
            </div>
            
        </nav>
    )
}

export default Header
