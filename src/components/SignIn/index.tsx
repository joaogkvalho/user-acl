import styles from './styles.module.scss'

export function SignIn(){
    return(
        <div className={styles.signInBox}>
            <h1>User ACL</h1>

            <form className={styles.signInForm}>
                <input type="email" placeholder="Digite seu email" />
                <input type="password" placeholder="Digite sua senha" />

                <button>
                    Entrar
                </button>
            </form>

            <div className={styles.separator}>
                ou
            </div>

            <button className={styles.signUpButton}>
                Cadastre-se
            </button>
        </div>
    )
}