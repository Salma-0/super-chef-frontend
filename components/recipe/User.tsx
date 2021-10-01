import React, { ReactElement } from 'react'
import styles from '@styles/Recipe.module.css'
import Image from 'next/image'
import Link from 'next/link'
import {FaFacebookF, FaInstagram, FaTwitter} from 'react-icons/fa'
import UserType from '../../types/User'

interface Props {
    user: UserType    
}

function User({user}: Props): ReactElement {
    const avatarSrc = typeof user.avatar === 'string' || !user.avatar ? '/default-avatar.png' : user.avatar.images[0].url
    return (
        <div className={styles.user}>
            <div className={styles.row}>
                <Image src={avatarSrc} alt="" width={85} height={85}/>
                <div className={styles.info}>
                    <span><Link href={'/profiles/'+user.name}><a>{user.name}</a></Link></span>
                    {user.social && 
                    <div className={styles.social}>
                        {user.social.facebook &&
                        <a href={user.social.facebook}>
                            <span className={styles.facebook}><FaFacebookF /></span>
                        </a>
                        }
                        {user.social.twitter && 
                        <a href={user.social.twitter}>
                            <span className={styles.twitter}><FaTwitter /></span>
                        </a>
                        }
                        {user.social.instagram &&
                        <a href={user.social.instagram}>
                            <span className={styles.instagram}><FaInstagram /></span>
                        </a>
                        }
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default User
