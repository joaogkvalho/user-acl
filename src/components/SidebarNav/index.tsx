import { FiUserPlus, FiUserCheck } from 'react-icons/fi'

import styles from './styles.module.scss'

export function SidebarNav(){
    return(
        <div className={styles.container}>
            <div className={styles.content}>
                <h2>Opções de usuário</h2>

                <ul>
                    <li><FiUserPlus />Criar Roles</li>
                    <li><FiUserPlus />Criar Permissions</li>
                    <li><FiUserCheck />Informações de perfil</li>
                </ul>
            </div>
        </div>
    )
}