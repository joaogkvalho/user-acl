import { useContext } from 'react'
import { FaUserAlt } from 'react-icons/fa'
import { AuthContext } from '../../contexts/authContext'

import styles from './styles.module.scss'

export function Header(){
    const { user } = useContext(AuthContext)

    return(
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.logo}>
                    <FaUserAlt />
                    <span>User ACL</span>
                </div>

                <div className={styles.userProfile}>
                    <div className={styles.userInfo}>
                        <p>{user.name}</p>
                        <small>{user.roles}</small>
                    </div>

                    <div className={styles.userAvatar}>JG</div>
                </div>
            </div>
        </div>
    )
}