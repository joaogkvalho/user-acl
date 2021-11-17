import { useContext } from 'react'
import { AuthContext } from '../../contexts/authContext'
import { FiUserPlus, FiUserCheck } from 'react-icons/fi'

import styles from './styles.module.scss'

export function SidebarNav(){
    const { signOut } = useContext(AuthContext)

    return(
        <div className={styles.container}>
            <div className={styles.content}>
                <h2>Opções de usuário</h2>
                <ul>
                    <li><FiUserPlus />Criar Roles</li>
                    <li><FiUserPlus />Criar Permissions</li>
                    <li><FiUserPlus />Cadastrar um novo usuário</li>
                </ul>
                
                <h2>Opções de conta</h2>
                <ul>
                    <li><FiUserCheck />Informações de perfil</li>
                </ul>
                <button onClick={signOut}>Sair</button>
            </div>
        </div>
    )
}